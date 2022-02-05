import { Component, OnInit } from '@angular/core';
import { CarolAuthService } from '@totvslabs/carol-app-fe-sdk';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  readonly SELF_LOGIN_TRUE_LABEL = SELF_LOGIN_TRUE_LABEL;
  readonly SELF_LOGIN_FALSE_LABEL = SELF_LOGIN_FALSE_LABEL;
  isSelfLogin = this.carolAuthService.selfLogin;

  isLoggedIn: boolean = true;
  loggingIn: boolean = false;
  loggingOut: boolean = false;

  userLogin: string = '';
  userPassword: string = '';

  infoMessage: string = this.getInfoMessage();

  constructor(
    public carolAuthService: CarolAuthService
  ) { }

  ngOnInit() {
    this.carolAuthService.loggedIn$.subscribe(this.isLoggedInHandler.bind(this))
    this.carolAuthService.setSelfLogin(true);
  }

  onChangeSelfLogin(isSelfLogin: boolean) {
    this.carolAuthService.setSelfLogin(isSelfLogin);
  }

  async login() {
    this.loggingIn = true;
    await this.carolAuthService.login(this.userLogin, this.userPassword);
    this.loggingIn = false;
  }

  async logout() {
    this.loggingOut = true;
    try {
      await this.carolAuthService.logout();
    } finally {
      this.loggingOut = false;
    }
  }

  private isLoggedInHandler(isLoggedIn: boolean): void {
    this.isLoggedIn = isLoggedIn;
    this.infoMessage = this.getInfoMessage();
  }

  private getInfoMessage(): string {
    return this.isLoggedIn ? LOGGED_IN_INFO : LOGGED_OUT_INFO;
  }
}

const SELF_LOGIN_TRUE_LABEL = `Self login is set to TRUE. Nothing will happen after logging out except for a message in the 'loggedIn$' Observable`;
const SELF_LOGIN_FALSE_LABEL = 'Self login is set to FALSE. You will be redirected to the SSO page after logging out';

const LOGGED_IN_INFO = 'You are currently logged in';
const LOGGED_OUT_INFO = 'You are currently NOT logged in. Requests to the Carol Platform may result in 401 exceptions';