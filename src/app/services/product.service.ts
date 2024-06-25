import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, pipe, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  base_Url:string=environment.baseURL;

  base_Url_Product_Service:string=environment.baseURLProductService;

  constructor( private http: HttpClient, private authService: AuthService) { }

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

  getAllProducts(): Observable<any> {
    return this.http
      .get(`${this.base_Url_Product_Service}/products`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getProductById(id: any): Observable<any> {
    return this.http
      .get(`${this.base_Url_Product_Service}/products/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getProductsByCompany(): Observable<any> {
    const user = this.authService.getUser();
    
    return this.http
      .get(`${this.base_Url_Product_Service}/products/company/${user?.id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  createProduct(item: any) {
    return this.http
      .post(`${this.base_Url_Product_Service}/products/post`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateProduct(id: any, item: any) {
    return this.http
      .put(`${this.base_Url_Product_Service}/products/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateProductStock(id: any, item: any) {
    return this.http
      .put(`${this.base_Url_Product_Service}/products/${id}/stock`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
