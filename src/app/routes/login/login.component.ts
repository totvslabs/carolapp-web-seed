import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ThfNotificationService } from '@totvs/thf-ui';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-route-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService,
    private router: Router,
    private thfNotification: ThfNotificationService,
    private objElement: ElementRef
  ) {}

  checkLogin(values) {
    this.authService.login(values.login, values.password).then(
      () => {
        this.router.navigate(['/']);
        setTimeout(() => {
          window.location.reload();
        }, 100);
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
