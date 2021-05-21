import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { PoToolbarProfile } from '@po-ui/ng-components';
import { Observable, Observer } from 'rxjs';

import * as conf from '../../../proxy.conf.json';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  sessionObservable: Observable<PoToolbarProfile>;
  sessionObserver: Observer<PoToolbarProfile>;

  constructor(
    private utilsService: UtilsService,
    private httpClient: HttpClient
  ) {
    this.sessionObservable = new Observable((observer) => {
      this.sessionObserver = observer;

      if (localStorage.getItem('user')) {
        observer.next(this.buildProfile());
      }
    });
  }

  setSession(authResult, user) {
    const tokenName = this.getTokenName();

    localStorage.setItem(tokenName, authResult['access_token']);
    localStorage.setItem('user', user);

    this.sessionObserver.next(this.buildProfile());
  }

  getTokenName() {
    if (this.utilsService.getOrganization()) {
      return `carol-${this.utilsService.getOrganization()}-${this.utilsService.getEnvironment()}-token`;
    } else {
      return 'carol-token';
    }
  }

  getSession(): Observable<any> {
    return this.sessionObservable;
  }

  logout() {
    const token = localStorage.getItem(this.getTokenName());

    const body = {
      access_token: token,
    };

    this.httpClient
      .post('/api/v1/oauth2/logout', body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .subscribe(() => {
        localStorage.clear();
        this.goToLogin(true);
      });
  }

  buildProfile(): PoToolbarProfile {
    return {
      avatar: 'assets/images/avatar-24x24.png',
      title: localStorage.getItem('user'),
    };
  }

  goToLogin(logout = false) {
    let origin;
    let url;

    if (isDevMode()) {
      let redirect = encodeURI(location.origin + location.pathname);
      origin = conf['/api/*'].target;
      url = `${origin}/auth/?redirect=${redirect}&env=${this.utilsService.getEnvironment()}&org=${this.utilsService.getOrganization()}&logout=${logout}`;
    } else {
      let redirect = encodeURI(location.pathname);
      origin = location.origin;
      url = `${origin}/auth/?redirect=${redirect}&env=${this.utilsService.getEnvironment()}&org=${this.utilsService.getOrganization()}&logout=${logout}`;
    }

    window.open(url, '_self');
  }
}
