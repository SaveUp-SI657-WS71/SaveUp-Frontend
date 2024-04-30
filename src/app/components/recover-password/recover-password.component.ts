import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent {
  constructor(private userService: UserService, private router: Router) { }

  email = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit(): void {
  }
 
  onSubmit() {
    const emailValue = this.email.value;
    console.log(emailValue);
    if (!emailValue) {
      alert("Por favor ingrese un correo electrónico");
      return;
    }

    this.userService.getCustomerByEmail(emailValue).subscribe(
      (customer: any) => {
        if(customer) {
          alert("Su contraseña es: " + customer.password);
          this.email.reset();
          this.router.navigate(['/login/session']);

        } else {
          this.userService.getCompanyByEmail(emailValue).subscribe(
            (company: any) => {
              if(company) {
                alert("Su contraseña es: " + company.password);
                this.email.reset();
                this.router.navigate(['/login/session']);

              } else {
                alert("El correo ingresado no existe");
              }
            }
          )
        }
      }
    )
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.email.hasError('email') ? 'No es un correo electrónico válido' : '';
  }

}
