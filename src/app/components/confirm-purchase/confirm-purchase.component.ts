import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { PaymentService } from 'src/app/services/payment.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-confirm-purchase',
  templateUrl: './confirm-purchase.component.html',
  styleUrls: ['./confirm-purchase.component.css']
})
export class ConfirmPurchaseComponent {

  amountTemp!: any;
  order: any;

  constructor(
    private paymentService: PaymentService, 
    private orderService: OrderService,
    private userService: UserService,
    private authService: AuthService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.order = this.authService.getOrder();

    this.paymentService.getPayById(this.order?.payId).subscribe(
      (data: any) => {
        this.amountTemp = data.amount;
      }
    );
  }

  nombre = new FormControl('', [Validators.required]);
  apellido = new FormControl('', [Validators.required]);
  direccion = new FormControl('', [Validators.required]);
  departamento = new FormControl('', [Validators.required]);
  distrito = new FormControl('', [Validators.required]);
  telefono = new FormControl('', [Validators.required]);
  tarjeta = new FormControl('', [Validators.required]);


  onSubmit() {
    const nombreValue = this.nombre.value;
    const apellidoValue = this.apellido.value;
    const direccionValue = this.direccion.value;
    const departamentoValue = this.departamento.value;
    const distrtitoValue = this.distrito.value;
    const telefonoValue = this.telefono.value;
    const tarjetaValue = this.tarjeta.value;

    const newItem = {
      customerName: nombreValue,
      customerLastName: apellidoValue,
      payAddress: direccionValue,
      payDepartment: departamentoValue,
      payDistrict: distrtitoValue,
      phoneNumber: telefonoValue,
      cardNumber: tarjetaValue,
      amount: this.amountTemp
    };

    this.paymentService.updatePayment(newItem).subscribe();

    this.paymentService.getPayById(this.order?.payId).subscribe(
      (data: any) => {
        if(data.payAddress != null) {
          const newPoints = this.authService.getUser()?.points + 1;
    
        this.userService.updateCustomerPoints(newPoints).subscribe(
          (data: any) => {
            console.log(data);
          },
          (error: any) => {
            console.log(error);
          }
        );
    
        this.paymentService.createPayment().subscribe(
          (payment: any) => {
            this.orderService.createOrder(payment.id).subscribe(
              (order: any) => {
                this.authService.setOrder(order);
                console.log(this.authService.getOrder());
              }
            );
          }
        );
    
        this.router.navigate(['/purchase/successful']);

        } else {
          alert('Las credenciales son incorrectas')
        }
      }
    );
  }
}