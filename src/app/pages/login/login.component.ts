import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ThfNotificationService } from '@totvs/thf-ui/services/thf-notification/thf-notification.service';

import { AuthService } from '../../services/auth.service';
import { HttpRequestsService } from '../../services/http-requests.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService,
              private request: HttpRequestsService,
              private router: Router,
              private thfNotification: ThfNotificationService) { }

  checkLogin(values) {
    this.request.login(values.login, values.password).subscribe(
      result => {
        this.authService.setSession(result, values.login);
        this.router.navigate([ this.authService.redirectUrl ]);
      },
      error => {
        if (error.status === 401) {
          this.thfNotification.error('Incorrect password!');
        } else {
          this.thfNotification.warning('Problem on the server');
        }
      }
    );

  }

}
