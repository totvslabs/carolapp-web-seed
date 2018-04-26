import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpRequestsService {

  subdomain = 'rmsdev';
  rootUrl = `https://rmsdev.carol.ai/api/v2/`;
  connectorId = '0a0829172fc2433c9aa26460c31b78f0';

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  login(username, password) {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('password', password)
      .set('username', username)
      .set('subdomain', this.subdomain)
      .set('connectorId', this.connectorId);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    return this.http.post(this.rootUrl + 'oauth2/token', body.toString(), httpOptions);
  }

  executeNamedQuery(namedQuery, params?, method = 'post', pageSize = '0', sortOrder = 'ASC', scrollable = 'false'): Observable<any> {
    const url = `queries/named/${namedQuery}?indexType=MASTER&pageSize=${pageSize}&sortOrder=${sortOrder}&scrollable=${scrollable}`;
    return method.toLowerCase() === 'post' ? this.post(url, params) : this.get(url, params);
  }

  private post(url, params?): Observable<any> {

    // Verify if the user is logged yet
    if (!this.authService.isLoggedIn()) {
      this.authService.redirectUrl = this.router.url;
      this.router.navigate(['/login']);
    }

    const body = params ? JSON.stringify(params) : '';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      })
    };

    return this.http.post(this.rootUrl + url, body.toString(), httpOptions);
  }

  private get(url, params?): Observable<any> {
    return null;
  }

}

