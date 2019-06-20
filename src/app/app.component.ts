import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { carol } from '@carol/carol-sdk/lib/carol';
import { httpClient } from '@carol/carol-sdk/lib/http-client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {

    this.auth.sessionObservable.subscribe();
    carol.setAuthToken(localStorage.getItem('carol-token'));
    httpClient.addInterceptor('auth', (status, response) => {
      if (status === 401) {
        this.router.navigate(['login']);
      }
    });
  }
}
