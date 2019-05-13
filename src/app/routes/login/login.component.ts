import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { ThfNotificationService } from '@totvs/thf-ui/services/thf-notification/thf-notification.service';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-route-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {

    constructor(private authService: AuthService,
        private router: Router,
        private thfNotification: ThfNotificationService,
        private objElement: ElementRef
    ) { }

    ngAfterViewInit(): void {
      const objImg = this.objElement.nativeElement.querySelector('img.thf-page-login-secondary-logo');
      objImg.setAttribute('src', './assets/images/logo-carol.png');
      objImg.setAttribute('alt', 'logo-carol');
    }

    checkLogin(values) {
        this.authService.login(values.login, values.password).subscribe(
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
