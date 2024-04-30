import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/products.model';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { PaymentService } from 'src/app/services/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{
  products: any[] = [];
  selectedProducts: any[] = [];
  productQuantities:{[key:string]:number} ={};
  totalSum: number = 0;
  nProducts!: number;
  availablePoints!: number;
  pointNecessary: number = 50;
  totalWithDiscount: number = 0;
  showDiscountedTotal: boolean = false;

  constructor(
    private authService: AuthService, 
    private cartService: CartService, 
    private productService: ProductService, 
    private paymentService: PaymentService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadElementsCart();

    this.availablePoints = this.authService.getUser()?.points;
  }

  loadElementsCart() {
    this.totalSum = 0;

    this.cartService.getCartByOrder().subscribe( 
      (data: any) => {
        this.products = data;
        this.nProducts = data.length;

        for(let i = 0; i < this.nProducts; i++){
          this.totalSum += this.products[i].price;
        }
      }
    );
  }

  productExists(products: Products[], product: Products): boolean {
    return products.some(p => p.name === product.name);
  }

  increaseQuantity(productId: number) {
    if (this.productQuantities[productId]) {
      this.productQuantities[productId]++;
    } else {
      this.productQuantities[productId] = 2;
    }
    this.calculateTotalSum();
  }

  decreaseQuantity(productId: number) {
    if (this.productQuantities[productId] && this.productQuantities[productId] > 1) {
      this.productQuantities[productId]--;
    }
    this.calculateTotalSum();
  }

  calculateTotalSum() {
    this.totalSum = 0;
    this.products.forEach((product: any) => {
      this.totalSum += product.price;
    });
  }

  removeProduct(product: any) {
    const newStock = product.stock + 1;

    this.productService.updateProductStock(product.id, newStock).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );

    this.cartService.deleteCartByOrderAndProduct(product.id).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );

    alert('Producto retirado carrito');

    this.loadElementsCart();
  }

  pay() {

    this.paymentService.updateProductStock(this.totalSum).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );

    this.router.navigate(['/confirm/purchase']);
  }
  

  //CANJEAR PUNTOS
  redeemPoints() {
    // Verificar si hay suficientes puntos disponibles para el canje
    if (this.availablePoints >= this.pointNecessary) {
      // Calcular el descuento basado en el porcentaje y el precio original del producto
      const discountPercentage = 25; // Porcentaje de descuento (ejemplo: 25%)
      const discount = this.totalSum * (discountPercentage / 100);

      // Actualizar el precio del producto después de aplicar el descuento
      this.totalWithDiscount = this.totalSum - discount;
      this.totalWithDiscount = +this.totalWithDiscount.toFixed(2);

      // Restar la cantidad de puntos utilizados en el canje
      this.availablePoints -= this.pointNecessary;
    }
    this.showDiscountedTotal = true;
    console.log(this.totalWithDiscount);
  }
}
