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
export class EditProductComponent implements OnInit {
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
          vencimiento: this.productView?.expirationDate,
          imagen: this.productView?.image
        });
      }
    ); 
    this.listenForUrlChanges(); // Agregar esta línea para escuchar cambios en el campo de la URL
  }

  generateReactiveForm(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      vencimiento: ['', [Validators.required]],
      imagen: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      console.log('Formulario Invalido');
    } else {
      const product: any = {
        name: this.productForm.value.name,
        description: this.productForm.value.descripcion,
        price: parseFloat(this.productForm.value.precio),
        stock: parseInt(this.productForm.value.stock),
        expirationDate: this.productForm.value.vencimiento,
        image: this.productForm.value.imagen, // Asegurarse de usar el nombre correcto del campo
        companyId: this.companySession?.id
      };

      console.log(product);
      console.log(this.productView?.id);

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

  listenForUrlChanges(): void {
    this.productForm.get('imagen')?.valueChanges.subscribe((url: string) => {
      const productImage = document.getElementById('productImage') as HTMLImageElement;
      if (productImage) {
        if (this.isValidImageUrl(url)) {
          productImage.src = url; // Si la URL es válida, cargar la imagen desde la URL
        } else {
          productImage.src = '/assets/images/addProduct.png'; // Si la URL es inválida, volver a la imagen predeterminada
        }
      }
    });
  }

  isValidImageUrl(url: string): boolean {
    // Verificar si la URL es una URL válida de imagen (puedes usar expresiones regulares u otros métodos)
    // Aquí proporciono un ejemplo simple para verificar si la URL termina con .jpg o .png
    return url.toLowerCase().match(/\.(jpeg|jpg|png|gif)$/) != null;
  }

  cancelEdit(): void {
    this.router.navigate(['/view/products']);
  }
}
