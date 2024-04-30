import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent {
  searchText: string = '';
  filteredProducts: any[] = [];
  products: any[] = [];

  constructor(private productService: ProductService, private router: Router) { }
  
  ngOnInit() {
    this.loadElements();
  }

  search() {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  
  loadElements() {
    this.productService.getProductsByCompany().subscribe(
      (data: any) => {
        this.products = data.filter((product: any) => product.stock !== 0);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  viewProduct(product: any) {
    this.router.navigate(['/edit/product', product.id]);
  }
}
