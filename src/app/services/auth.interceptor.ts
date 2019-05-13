import {
  HttpRequest,
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = localStorage.getItem('access_token');

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + idToken)
      });

      return next.handle(cloned).pipe(
        catchError((error: any) => {
          if (error.status === 401) {
            this.router.navigate(['login']);
          }
          return throwError(error);
        })
      );
    } else {
      if (req.url !== '/api/v2/oauth2/token') {
        this.router.navigate(['login']);
      }
      return next.handle(req);
    }
  }
}
