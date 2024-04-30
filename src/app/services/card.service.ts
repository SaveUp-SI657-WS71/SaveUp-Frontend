import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, pipe, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {
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

  getCardsByCustomerId(): Observable<any> {
    const user = this.authService.getUser();

    return this.http
      .get(`${this.base_Url}/cards/customer/${user?.id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  createCard(item: any) {
    return this.http
      .post(`${this.base_Url}/cards`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
