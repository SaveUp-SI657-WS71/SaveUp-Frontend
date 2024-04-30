import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, pipe, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
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

  createOrder(id: any) {
    const item = {
      "payId": id
    }

    return this.http
      .post(`${this.base_Url}/orders`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteOrder(id: any) {
    return this.http
      .delete(`${this.base_Url}/orders/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }
}
