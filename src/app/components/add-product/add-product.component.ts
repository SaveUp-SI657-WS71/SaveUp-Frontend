import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.development';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent {
  base_Url: string = environment.baseURL;

  productForm!: FormGroup;
  toolbarDisabled: boolean = true;
  imageSelected: any;
  imageName: string = '';

  imageTrueSelected: any;
  base64String: any;

  companySession = this.authService.getUser();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.generateReactiveForm();
    this.listenForUrlChanges(); // Agregar esta línea para escuchar cambios en el campo de la URL

  }

  generateReactiveForm(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      vencimiento: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
    });
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


  onSubmit() {
    // Guardar la imagen en la base de datos
    this.saveImageToDatabase();
  }

  saveImageToDatabase() {
  
    const valueName = this.productForm.value.name;
    const valueDescripcion = this.productForm.value.descripcion;
    const valuePrice = this.productForm.value.precio;
    const valueStock = this.productForm.value.stock;
    const valueVencimiento = this.productForm.value.vencimiento;
    const valueImagen = this.productForm.value.imagen;
    const requestPayload: any = {
      name: valueName,
      description: valueDescripcion,
      price: parseFloat(valuePrice),
      stock: parseInt(valueStock),
      expirationDate: valueVencimiento,
      image: valueImagen,
      companyId: this.companySession?.id
    };
  
    this.productService.createProduct(requestPayload).subscribe(
      (response) => {
        console.log('Producto guardado en la base de datos:', response);
      }
    );
  }
}



