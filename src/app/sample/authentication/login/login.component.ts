import { Component, OnInit } from '@angular/core';
import { PoButtonGroupItem } from '@po-ui/ng-components';
import { CarolAuthService } from '@totvslabs/carol-app-fe-sdk';
import { map, merge, Observable, startWith, switchMap, tap } from 'rxjs';
import { AuthSameOrganizationStatus } from '@totvslabs/carol-app-fe-sdk/lib/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  readonly SELF_LOGIN_TRUE_LABEL = SELF_LOGIN_TRUE_LABEL;
  readonly SELF_LOGIN_FALSE_LABEL = SELF_LOGIN_FALSE_LABEL;
  readonly LOGGED_IN_INFO = LOGGED_IN_INFO;
  readonly LOGGED_OUT_INFO = LOGGED_OUT_INFO;

  isSelfLogin = this.carolAuthService.selfLogin;
  userLogin = '';
  userPassword = '';

  readonly actionGroupButtonsLogin: Array<PoButtonGroupItem> = [
    {
      action: this.login.bind(this),
      icon: 'po-icon-lock',
      label: 'Login',
      tooltip: 'Start a new session with the provided credentials',
    },
  ];

  readonly actionGroupButtonsLogout: Array<PoButtonGroupItem> = [
    {
      action: this.logout.bind(this),
      icon: 'po-icon-exit',
      label: 'Logout',
      tooltip: 'End your session',
    },
  ];

  readonly isLoggedIn$ = this.carolAuthService.loggedIn$.pipe(
    tap((isLogged) => this.isLoggedInHandler(isLogged))
  );

  readonly hasCredentialsDisabled$: Observable<boolean | undefined> = merge(
    this.carolAuthService.receivedLoginUnderOrganization$.pipe(
      startWith(true),
      switchMap(
        (): Promise<AuthSameOrganizationStatus> =>
          this.carolAuthService.tryAutoLoginUnderSameOrganization()
      ),
      tap<AuthSameOrganizationStatus>((autoLoginUpdate) => {
        if (autoLoginUpdate.targetToken) {
          this.carolAuthService.setSessionToken(autoLoginUpdate.targetToken);
        }
      }),
      map(
        (autoLoginUpdate: AuthSameOrganizationStatus): boolean =>
          (autoLoginUpdate.hasActiveSession &&
            !autoLoginUpdate.targetToken) as boolean
      )
    ),
    this.carolAuthService.receivedLogoutUnderOrganization$.pipe(
      map((_) => false)
    )
  );

  constructor(public carolAuthService: CarolAuthService) {}

  get organization(): string {
    return this.carolAuthService.organization;
  }

  get environment(): string {
    return this.carolAuthService.environment;
  }

  ngOnInit() {
    this.carolAuthService.setSelfLogin(true);
  }

  onChangeSelfLogin(isSelfLogin: boolean) {
    this.carolAuthService.setSelfLogin(isSelfLogin);
  }

  async login() {
    if (!this.userLogin || !this.userPassword) {
      return;
    }

    this.setButtonState(true);
    await this.carolAuthService.login(this.userLogin, this.userPassword);
    this.setButtonState();
  }

  async logout() {
    this.setButtonState(true);
    try {
      await this.carolAuthService.logout();
    } finally {
      this.setButtonState();
    }
  }

  private setButtonState(startingAction?: boolean) {
    this.actionGroupButtonsLogin.forEach((b) => (b.disabled = startingAction));
    this.actionGroupButtonsLogout.forEach((b) => (b.disabled = startingAction));
  }

  private isLoggedInHandler(isLoggedIn: boolean): void {
    if (isLoggedIn) {
      //NOTE: app authenticated starts, e.g. router.navigateByUrl('/home')
      console.log('LOGGED IN');
    }
  }
}

const SELF_LOGIN_TRUE_LABEL = `Self login is set to TRUE. Nothing will happen after logging out except for a message in the 'loggedIn$' Observable`;
const SELF_LOGIN_FALSE_LABEL =
  'Self login is set to FALSE. You will be redirected to the SSO page after logging out';

const LOGGED_IN_INFO = 'You are currently logged in';
const LOGGED_OUT_INFO =
  'You are currently NOT logged in. Requests to the Carol Platform may result in 401 exceptions';
