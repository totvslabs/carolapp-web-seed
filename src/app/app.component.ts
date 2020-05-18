import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { carol } from '@carol/carol-sdk/lib/carol';
import { httpClient } from '@carol/carol-sdk/lib/http-client';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private utils: UtilsService,
    private activatedRoute: ActivatedRoute
  ) {
    httpClient.addInterceptor('auth', (status, response) => {
      if (status === 401) {
        this.auth.goToLogin();
      }
    });
  }

  ngOnInit() {
    this.auth.sessionObservable.subscribe();

    carol.setOrganization(this.utils.getOrganization());
    carol.setEnvironment(this.utils.getEnvironment());

    if (this.getQueryVariable('handoff')) {
      localStorage.setItem(this.auth.getTokenName(), this.getQueryVariable('handoff'));
      setTimeout(() => this.setParam('handoff', null), 200);
    }

    const idToken = localStorage.getItem(this.auth.getTokenName());
    if (idToken) {
      carol.setAuthToken(idToken.replace(/\"/g, ''));
    }
  }

  private setParam(attr, value) {
    const queryParams = {
      ...this.activatedRoute.snapshot.queryParams
    };

    if (value) {
      queryParams[attr] = value;
    } else {
      delete queryParams[attr];
    }

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams
    });
  }

  private getQueryVariable(name: string) {
    const query = window.location.search.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) === name) {
        return decodeURIComponent(pair[1]);
      }
    }
  }

}
