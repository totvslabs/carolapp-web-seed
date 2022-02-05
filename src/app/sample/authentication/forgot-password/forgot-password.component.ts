import { Component, OnInit } from '@angular/core';
import { PoButtonGroupItem, PoNotificationService } from '@po-ui/ng-components';
import { CarolAuthService } from '@totvslabs/carol-app-fe-sdk';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {
  userLogin: string = '';
  actionGroupButtons: Array<PoButtonGroupItem> = [
    {
      action: this.recoverPassword.bind(this),
      icon: 'po-icon-mail',
      label: 'Recover Password',
      tooltip:
        'Send a message with instructions to the provided e-mail address',
    },
  ];

  constructor(
    private notificationService: PoNotificationService,
    private carolAuthService: CarolAuthService
  ) {}

  ngOnInit() {}

  private async recoverPassword(): Promise<void> {
    if (!this.userLogin) {
      return;
    }

    this.actionGroupButtons[0].disabled = true;
    await this.carolAuthService.recoverPassword(this.userLogin);
    this.notificationService.success(
      `Recovery instructions sent to ${this.userLogin}`
    );
    this.actionGroupButtons[0].disabled = false;
  }
}
