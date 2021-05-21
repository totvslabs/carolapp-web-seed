import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem(this.authService.getTokenName());

    let newReq = req;
    if (idToken) {
      newReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer ' + idToken.replace(/\"/g, '')
        ),
      });
    }
    return next.handle(newReq).pipe(
      catchError((error: any) => {
        if (error.status === 401) {
          this.authService.goToLogin();
        }
        return throwError(error);
      })
    );
  }
}
