import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, pipe, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
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

  getCustomers(): Observable<any> {
    return this.http
      .get(`${this.base_Url}/customers`)
      .pipe(retry(2), catchError(this.handleError));
  }

  createCustomer(item: any) {
    return this.http
      .post(`${this.base_Url}/customers`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getCompanies(): Observable<any> {
    return this.http
      .get(`${this.base_Url}/companies`)
      .pipe(retry(2), catchError(this.handleError));
  }

  createCompany(item: any) {
    return this.http
      .post(`${this.base_Url}/companies`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getCustomerByEmailAndPassword(email: string, password: string) { 
    const body = {
      email: email,
      password: password
    };
  
    return this.http.post(`${this.base_Url}/customers/login`, body, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getCompanyByEmailAndPassword(email: string, password: string) {
    const body = {
      email: email,
      password: password
    };
  
    return this.http.post(`${this.base_Url}/companies/login`, body, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getCustomerByEmail(email: string) {
    const body = {
      email: email
    };

    return this.http.post(`${this.base_Url}/customers/recover`, body, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getCompanyByEmail(email: string) {
    const body = {
      email: email
    };

    return this.http.post(`${this.base_Url}/companies/recover`, body, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateCustomer(item: any) {
    const user = this.authService.getUser();

    return this.http.put(`${this.base_Url}/customers/${user?.id}`, item, this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }

  updateCompany(item: any) {
    const user = this.authService.getUser();

    return this.http.put(`${this.base_Url}/companies/${user?.id}`, item, this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }

  getPurchaseData(): Observable<any> {
    const user = this.authService.getUser();

    return this.http
      .get(`${this.base_Url}/purchase/${user?.id}/data`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getSaleData(): Observable<any> {
    const user = this.authService.getUser();

    return this.http
      .get(`${this.base_Url}/sale/${user?.id}/data`)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateCustomerPoints(item: any) {
    const user = this.authService.getUser();

    return this.http.put(`${this.base_Url}/customers/${user?.id}/points`, item, this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }
}
