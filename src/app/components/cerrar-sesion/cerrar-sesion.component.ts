import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentService } from 'src/app/services/payment.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.css']
})
export class CerrarSesionComponent {
   orderSession = this.authService.getOrder();
   cartSession: any[] = [];
   productsSession: any[] = [];
   userData!: any;

   constructor(
      private location: Location,
      private router:Router, 
      private authService: AuthService, 
      private cartService: CartService, 
      private productService: ProductService,
      private orderService: OrderService,
      private paymentService: PaymentService
   ) {}

   ngOnInit(): void {
      this.userData = this.authService.getUser();
   }

   toolbarDisabled: boolean = true;
   
   public logout() {
      if (this.userData?.lastName) {
         this.cartService.getAllCarts().subscribe(
            (data: any) => {
               this.cartSession = data.filter((cart: any) => cart.orderId === this.orderSession.id );
   
               this.productsSession = this.cartSession.map((cart: any) => cart.productId);
   
               if(this.productsSession.length != 0) {
                  for(let i = 0; i < this.productsSession.length; i++) {
                     this.productService.getProductById(this.productsSession[i]).subscribe(
                        (data: any) => {
                           const newStock = data.stock + 1;
         
                           this.productService.updateProductStock(this.productsSession[i], newStock).subscribe(
                              (data: any) => {
                                 console.log(data);
                              },
                              (error: any) => {
                                 console.log(error);
                              }
                           );
                        }
                     );
                  }
                  
                  this.cartService.deleteAllCartsByOrderId(this.orderSession?.id).subscribe(
                     (data: any) => {
                        console.log(data);
                     },
                      (error: any) => {
                        console.log(error);
                     }
                  );
                  this.orderService.deleteOrder(this.orderSession?.id).subscribe(
                     (data: any) => {
                        console.log(data);
                     },
                      (error: any) => {
                        console.log(error);
                     }
                  );
                  this.paymentService.deletePayment(this.orderSession?.payId).subscribe(
                     (data: any) => {
                        console.log(data);
                     },
                      (error: any) => {
                        console.log(error);
                     }
                  );
   
               } else {
   
                  this.orderService.deleteOrder(this.orderSession?.id).subscribe(
                     (data: any) => {
                        console.log(data);
                     },
                      (error: any) => {
                        console.log(error);
                     }
                  );
                  this.paymentService.deletePayment(this.orderSession?.payId).subscribe(
                     (data: any) => {
                        console.log(data);
                     },
                      (error: any) => {
                        console.log(error);
                     }
                  );
               }
            }
         );
   
         this.authService.logout();
         this.router.navigate(['/login/session']);
         
      } else if (this.userData?.ruc) {
         
         this.authService.logout();
         this.router.navigate(['/login/session']);

      }
   }
 
   cancelar() {
      this.location.back();
   }
}
