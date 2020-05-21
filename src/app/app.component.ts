import { Component, OnInit } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { carol } from '@carol/carol-sdk/lib/carol';
import { UtilsService } from './services/utils.service';
import { utils } from '@carol/carol-sdk/lib/utils';
import { httpClient } from '@carol/carol-sdk/lib/http-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
    private utils: UtilsService
  ) {}

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: this.onClick.bind(this) }
  ];

  ngOnInit() {
    this.auth.sessionObservable.subscribe();

    carol.setOrganization(this.utils.getOrganization());
    carol.setEnvironment(this.utils.getEnvironment());

    let idToken;
    if (utils.getOrganization()) {
      idToken = localStorage.getItem(`carol-${utils.getOrganization()}-${utils.getEnvironment()}-token`);
    } else {
      idToken = localStorage.getItem('carol-token');
    }

    carol.setAuthToken(idToken);

    httpClient.addInterceptor('auth', (status, response) => {
      if (status === 401) {
        this.auth.goToLogin();
      }
    });
  }

  private onClick() {
    alert('Clicked in menu item')
  }





}
