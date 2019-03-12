import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { Router } from '@angular/router';

import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpParameterCodec
} from '@angular/common/http';

import { map } from 'rxjs/operators';
import { UtilsService } from './utils.service';
import { ThfToolbarProfile } from '@totvs/thf-ui/components/thf-toolbar';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  sessionObservable: Observable<ThfToolbarProfile> ;
  sessionObserver: Observer<ThfToolbarProfile> ;

  constructor(
    private router: Router,
    private http: HttpClient,
    private utils: UtilsService
  ) {
    this.sessionObservable = new Observable(observer => {
      this.sessionObserver = observer;

      if (localStorage.getItem('user')) {
        observer.next(this.buildProfile());
      }
    });
  }

  login(username, password) {
    const body = new HttpParams({encoder: new CustomEncoder()})
      .set('grant_type', 'password')
      .set('password', password)
      .set('username', username)
      .set('subdomain', this.utils.getSubdomain())
      .set('connectorId', this.utils.getConnectorIdDefault());

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    return this.http.post('/api/v2/oauth2/token', body.toString(), httpOptions).pipe(
      map (
        (response) => {
          this.setSession(response, username);
          return response;
        }
      )
    );
  }

  setSession(authResult, user) {
    localStorage.setItem('access_token', authResult['access_token']);
    localStorage.setItem('user', user);

    const expiresAt = moment().add(authResult['expires_in'], 'second');
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

    this.sessionObserver.next(this.buildProfile());
  }

  getSession(): Observable < any > {
    return this.sessionObservable;
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user');

    this.router.navigate(['login']);
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  buildProfile(): ThfToolbarProfile {
    return {
      avatar: 'assets/images/avatar-24x24.png',
      title: localStorage.getItem('user')
    };
  }
}

class CustomEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}
