import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoButtonGroupItem, PoNotificationService } from '@po-ui/ng-components';
import { CarolAuthService } from '@totvslabs/carol-app-fe-sdk';
import { Tabs } from '../authentication.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})

export class ResetPasswordComponent implements OnInit {
  readonly token = this.route.snapshot.queryParams['passwordResetToken'];
  readonly invalid = !this.token;

  newPassword: string = '';
  newPasswordConfirmation: string = '';

  actionGroupButtons: PoButtonGroupItem[] = [
    {
      action: this.resetPassword.bind(this),
      icon: 'po-icon-refresh',
      label: 'Reset password',
      disabled: this.invalid
    }
  ]

  @Output('changeTab')
  changeTab: EventEmitter<Tabs> = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private notificationService: PoNotificationService,
    private carolAuthService: CarolAuthService,
    private router: Router
  ) { }

  ngOnInit() {}

  async resetPassword(): Promise<void> {
    if (!this.newPassword || !this.newPasswordConfirmation) {
      return;
    }

    if (this.newPassword.length < 5) {
      this.notificationService.information('Your new password must be at least 5 characters long');
      return;
    }

    if (this.newPassword !== this.newPasswordConfirmation) {
      this.notificationService.information('Your new password must match the confirmation');
      return;
    }

    this.actionGroupButtons[0].disabled = true;

    try {
      await this.carolAuthService.resetPassword(this.newPassword, this.token);
      this.notificationService.success('You have successfully reset your password. You will be redirected in 3 seconds');
    } catch (err: any) {
      if (err && err.error.errorCode === 400) {
        this.notificationService.error(err.error.errorMessage);
      } else if (err && err.error.errorCode === 404) {
        this.notificationService.error('Token to change password not found.');
      } else {
        this.notificationService.error('Carol is having communication issues, please try it again later.');
      }
    } finally {
      setTimeout(() => {
        this.router.navigate(['/authentication'], { queryParams: {} });
        this.changeTab.emit(Tabs.LOGIN)
      }, 3000)
    }
  }
}