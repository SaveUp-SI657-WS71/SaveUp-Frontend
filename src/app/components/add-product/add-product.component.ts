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

  openFileSelector(): void {
    document.getElementById('fileSelector')?.click();
  }

  loadImage(event: any): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSelected = reader.result;
      const productImage = document.getElementById('productImage') as HTMLImageElement;
      if (productImage) {
        productImage.src = this.imageSelected;
      }
    };
    reader.readAsDataURL(event.target.files[0]);
    
    this.imageName = event.target.files[0].name;

    this.convertImageToBase64(event.target.files[0]);
  }

  convertImageToBase64(file: File): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.base64String = reader.result as string;
      this.imageSelected = this.base64String;
    };
    reader.readAsDataURL(file);
  }
  
  getImageName(): string {
    return this.imageName;
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
  
    const requestPayload: any = {
      name: valueName,
      description: valueDescripcion,
      price: parseFloat(valuePrice),
      stock: parseInt(valueStock),
      expirationDate: valueVencimiento,
      image: this.base64String,
      companyId: this.companySession?.id
    };
  
    this.productService.createProduct(requestPayload).subscribe(
      (response) => {
        console.log('Producto guardado en la base de datos:', response);
      }
    );
  }
}



