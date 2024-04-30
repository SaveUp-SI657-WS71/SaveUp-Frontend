import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  hide = true;
  userForm!: FormGroup;
  userData!: any;
  id: number = 0;
  variableDto: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userData = this.authService.getUser();

    if (this.userData?.lastName) {
      this.generateReactiveFormCustomer();

      this.userForm.patchValue({
        nombre: this.userData?.name,
        apellido: this.userData?.lastName,
        direccion: this.userData?.address,
        departamento: this.userData?.department,
        distrito: this.userData?.district,
        celular: this.userData?.phoneNumber,
        password: this.userData?.password
      });
    } else if (this.userData?.ruc) {
      this.generateReactiveFormCompany();

      this.userForm.patchValue({
        nombre: this.userData?.name,
        ruc: this.userData?.ruc,
        direccion: this.userData?.address,
        departamento: this.userData?.department,
        distrito: this.userData?.district,
        celular: this.userData?.phoneNumber,
        password: this.userData?.password
      });
    }
  }

  generateReactiveFormCustomer(): void {
    this.userForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      departamento: [''],
      distrito: [''],
      celular: [''],
      password: ['', Validators.required]
    });
  }

  generateReactiveFormCompany(): void {
    this.userForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      ruc: ['', Validators.required],
      direccion: ['', Validators.required],
      departamento: [''],
      distrito: [''],
      celular: [''],
      password: ['', Validators.required]
    });
  }

  updateUser() {
    if (this.userForm.invalid) {
      console.log('Formulario Invalido');
    } else {
      if (this.userData?.lastName) {
        const user: any = {
          id: this.userData?.id,
          name: this.userForm.get('nombre')?.value,
          lastName: this.userForm.get('apellido')?.value,
          address: this.userForm.get('direccion')?.value,
          department: this.userForm.get('departamento')?.value,
          district: this.userForm.get('distrito')?.value,
          phoneNumber: this.userForm.get('celular')?.value,
          password: this.userForm.get('password')?.value,
          repeatPassword: this.userForm.get('password')?.value,
          email: this.userData?.email,
          points: this.userData?.points
        };
        
        this.userService.updateCustomer(user).subscribe(
          (data) => {
            console.log(data);
          },
          (error) => {
            console.log(error);
          }
        );

        this.cancelEdit();

        this.authService.setUser(user);

      } else if (this.userData?.ruc) {
        const user: any = {
          id: this.userData?.id,
          name: this.userForm.get('nombre')?.value,
          ruc: this.userForm.get('ruc')?.value,
          address: this.userForm.get('direccion')?.value,
          department: this.userForm.get('departamento')?.value,
          district: this.userForm.get('distrito')?.value,
          phoneNumber: this.userForm.get('celular')?.value,
          password: this.userForm.get('password')?.value,
          repeatPassword: this.userForm.get('password')?.value,
          email: this.userData?.email
        };
        this.userService.updateCompany(user).subscribe(
          (data) => {
            console.log(data);
          },
          (error) => {
            console.log(error);
          }
        );

        this.cancelEdit();

        this.authService.setUser(user);
        
      }
    }
  }

  onSubmit() {}

  cancelEdit() {
    this.router.navigate(['/edit/profile']);
    //this.location.back();
  }

  viewCards() {
    this.router.navigate(['/view/cards']);
  }

  confirm() {
    this.updateUser();
    this.router.navigate(['/confirm/edit/profile']);
  }

  clickCancel(): void {
    const user = this.authService.getUser();

    if (user?.lastName) {
      this.router.navigate(['/products']);
    } else if (user?.ruc) {
      this.router.navigate(['/view/products']);
    }
  }
}
