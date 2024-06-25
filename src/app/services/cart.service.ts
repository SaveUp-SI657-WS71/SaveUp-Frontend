import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, pipe, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  base_Url:string=environment.baseURL;

  base_Url_Order_Service:string=environment.baseURLOrderService;

  constructor(private http: HttpClient, private authService: AuthService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.log(
        `An error occurred ${error.status}, body was: ${error.error}`
      );
    } else {
      console.log(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError(
      'Something happened with request, please try again later.'
    );
  }

  /*
  getCustomers(): Observable<any> {
    return this.http
      .get(`${this.base_Url_Order_Service}/customers`)
      .pipe(retry(2), catchError(this.handleError));
  }
  */

  createCart(item: any) {
    return this.http
      .post(`${this.base_Url_Order_Service}/carts`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllCarts(): Observable<any> {
    return this.http
      .get(`${this.base_Url_Order_Service}/carts`)
      .pipe(retry(2), catchError(this.handleError));
  }

  createOrderWithProduct(product_id: any) {
    const item = {
      productId: product_id,
      orderId: this.authService.getOrder()?.id
    };
    console.log(item);

    return this.http
      .post(`${this.base_Url_Order_Service}/carts`, item, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getCartByOrder(): Observable<any> {
    const order_id = this.authService.getOrder()?.id;

    return this.http
      .get(`${this.base_Url_Order_Service}/cart/order/${order_id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteCartByOrderAndProduct(product_id: any) {
    const order_id = this.authService.getOrder()?.id;

    return this.http
      .delete(`${this.base_Url_Order_Service}/carts/${order_id}/${product_id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteAllCartsByOrderId(order_id: any) {
    return this.http
      .delete(`${this.base_Url_Order_Service}/carts/order/${order_id}`)
      .pipe(retry(2), catchError(this.handleError));
  }
}
