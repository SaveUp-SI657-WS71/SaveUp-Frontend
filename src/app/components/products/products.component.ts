import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  searchText: string = '';
  filteredProducts: any[] = [];
  products: any[] = [];
  cartTemp: any[] = [];
  cartExist: any[] = [];
  order = this.authService.getOrder();

  constructor(private productService: ProductService, private cartService: CartService, private authService: AuthService) { }

  ngOnInit() {
    this.loadElements();
  }

  loadElements() {
    this.productService.getAllProducts().subscribe(
      (data: any) => {
        this.products = data.filter((product: any) => product.stock !== 0);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  search() {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  addToCart(product: any) {
    this.cartService.getAllCarts().subscribe(
      (data: any) => {
        this.cartTemp = data.filter((cart: any) => cart.orderId === this.order?.id)

        this.cartExist = this.cartTemp.map((cart: any) => cart.productId)

        if(!this.cartExist.includes(product.id)) {
          this.cartService.createOrderWithProduct(product.id).subscribe(
            (data) => {
              console.log(data);
            },
            (error) => {
              console.log(error);
            }
          );
      
          const newStock = product.stock - 1;
      
          this.productService.updateProductStock(product.id, newStock).subscribe(
            (data) => {
              console.log(data);
            },
            (error) => {
              console.log(error);
            }
          );
      
          alert('Producto agregado al carrito');
          this.loadElements();

        } else {
          alert('El producto esta en tu carrito');
        }
      }
    )
  }
}
