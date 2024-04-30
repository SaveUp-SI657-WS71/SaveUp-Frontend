import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  base_Url:string=environment.baseURL;

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
      .get(`${this.base_Url}/customers`)
      .pipe(retry(2), catchError(this.handleError));
  }
  */

  getPayById(id: any): Observable<any> {
    return this.http
      .get(`${this.base_Url}/pays/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  createPayment() {
    const item: any = {
      customerName: this.authService.getUser()?.name,
      customerLastName: this.authService.getUser()?.lastName,
      phoneNumber: this.authService.getUser()?.phoneNumber,
    }

    return this.http
      .post(`${this.base_Url}/pays`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updatePayment(item: any): Observable<any> {
    const pay_id = this.authService.getOrder()?.payId;

    return this.http
      .put(`${this.base_Url}/pays/${pay_id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateProductStock(item: any) {
    const pay_id = this.authService.getOrder()?.payId;

    return this.http
    .put(`${this.base_Url}/pays/${pay_id}/amount`, JSON.stringify(item), this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }

  deletePayment(id: any) {
    return this.http
      .delete(`${this.base_Url}/pays/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }
}
