import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  redirectUrl = '';

  constructor(private router: Router) { }

  setSession(authResult, user) {
    localStorage.setItem('access_token', authResult['access_token']);
    localStorage.setItem('user', user);

    const expiresAt = moment().add(authResult['expires_in'], 'second');
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
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

}
