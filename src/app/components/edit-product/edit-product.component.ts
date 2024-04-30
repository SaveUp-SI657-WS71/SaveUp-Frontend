import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{
  productForm!: FormGroup;
  toolbarDisabled: boolean = true;
  imageSelected: any;

  productView: any;
  companySession = this.authService.getUser();

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const url = window.location.href;
    const partesURL = url.split('/');
    const id = partesURL[partesURL.length - 1];

    this.generateReactiveForm();

    this.productService.getProductById(id).subscribe(
      (data) => {
      this.productView = data;

      this.productForm.patchValue({
        name: this.productView?.name,
        descripcion: this.productView?.description,
        precio: this.productView?.price,
        stock: this.productView?.stock,
        vencimiento: this.productView?.expirationDate
      });
      }
    ); 
  }

  generateReactiveForm(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      vencimiento: ['', [Validators.required]]
    });
  }

  onSubmit(): void { }

  updateProductView(): void {
    if(this.productForm.invalid) {
      console.log('Formulario Invalido');
    } else {
      const product: any = {
        name: this.productForm.value.name,
        description: this.productForm.value.descripcion,
        price: this.productForm.value.precio,
        stock: this.productForm.value.stock,
        expirationDate: this.productForm.value.vencimiento,
        image: this.productView?.image,
        companyId: this.companySession?.id
      };

      this.productService.updateProduct(this.productView?.id, product).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    this.router.navigate(['/view/products']);
  }

  cancelEdit(): void {
    this.router.navigate(['/view/products']);
  }
}
