import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { PaymentService } from 'src/app/services/payment.service';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent {

  constructor(private userService: UserService, private authService: AuthService, private paymentService: PaymentService, private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
  department = new FormControl('', [Validators.required]);
  district = new FormControl('', [Validators.required]);
  cellNumber = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required]);


  onSubmit() {
    const emailValue = this.email.value;
    const nameValue = this.name.value;
    const lastNameValue = this.lastName.value;
    const addressValue = this.address.value;
    const departmentValue = this.department.value;
    const districtValue = this.district.value;
    const cellNumberValue = this.cellNumber.value;
    const passwordValue = this.password.value;
    const confirmPasswordValue = this.confirmPassword.value;
    const points: number = 0;
    const user: any = {
      email:emailValue,
      lastName:lastNameValue,
      name: nameValue,
      address: addressValue,
      department: departmentValue,
      district: districtValue,
      phoneNumber: cellNumberValue,
      password: passwordValue,
      repeatPassword: confirmPasswordValue,
      points:points,
    };
    
    this.userService.createCustomer(user).subscribe(
      (res) => {
        this.authService.setUser(res);
      }
    );

    this.paymentService.createPayment().subscribe(
      (payment: any) => {
        this.orderService.createOrder(payment.id).subscribe(
          (order: any) => {
            this.authService.setOrder(order);
          }
        )
      }
    );
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.email.hasError('email') ? 'No es un correo electrónico válido' : '';
  }

  save() {
    this.onSubmit();

    this.router.navigate(['/products']);
  }
}