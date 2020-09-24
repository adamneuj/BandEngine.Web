import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { RegisterModel } from 'src/app/models/auth/register-model';
import { ResponseModel } from 'src/app/models/auth/response-model';
import {catchError, tap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private AuthenticationUrl = 'http://localhost:5000/api/authenticate/';
  private Register = 'register';

  constructor(private http: HttpClient) { }

  registerUser(newUser: RegisterModel): Observable<ResponseModel[]> {
    return this.http.post<ResponseModel[]>(this.AuthenticationUrl + this.Register, newUser)
    .pipe(
      catchError(error => {
        return throwError(error);
      }));
  }

  // errorHandler(error): Observable<string[]> {
  //   let errors = [];
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     errorMessage = 'Error: ${error.error.message}';
  //   } else {
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   console.log(errorMessage);
  //   return throwError(errors);
  // }


}
