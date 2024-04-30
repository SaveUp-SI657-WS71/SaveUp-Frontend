import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { UserService } from 'src/app/services/user.service';
import { PaymentService } from 'src/app/services/payment.service';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-session',
  templateUrl: './login-session.component.html',
  styleUrls: ['./login-session.component.css']
})
export class LoginSessionComponent {

  hide = true;
  validateForm!:FormGroup;

  constructor (
    private userService: UserService, 
    private router: Router, 
    private authService: AuthService, 
    private paymentService: PaymentService,
    private orderService: OrderService, 
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.validateForm=this.fb.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  login() {
    const emailValue = this.validateForm.get('email')?.value;
    const passwordValue = this.validateForm.get('password')?.value;
  
    if (!this.validateForm.get('email')?.value || !this.validateForm.get('password')?.value) {
      // Al menos uno de los campos es inválido, mostrar mensajes de error
      this.validateForm.get('email')?.markAsTouched();
      this.validateForm.get('password')?.markAsTouched();
      return;
    }

    
    this.userService.getCustomerByEmailAndPassword(emailValue, passwordValue).subscribe(
      (customer: any) => {
        if (customer) {
          this.authService.setUser(customer);

          this.paymentService.createPayment().subscribe(
            (payment: any) => {
              this.orderService.createOrder(payment.id).subscribe(
                (order: any) => {
                  this.authService.setOrder(order);
                }
              )
            }
          );

          this.router.navigate(['/products']);

        } else {
          this.userService.getCompanyByEmailAndPassword(emailValue, passwordValue).subscribe(
            (company: any) => {
              if (company) {
                this.authService.setUser(company);

                this.router.navigate(['/view/products']); 

              } else {

                alert('Usuario o contraseña incorrectos');
              }
            },
            error => {
              console.log("Ocurrió un error al obtener las compañías");
              console.log(error);
            }
          );
        }
      }
    );
  }
}