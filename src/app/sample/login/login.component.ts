import { Component, OnInit } from '@angular/core';
import { CarolAuthService } from '@totvslabs/carol-app-fe-sdk';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoggedIn: boolean = true;
  isSelfLogin = this.carolAuthService.selfLogin;
  checkboxLabel = this.getCheckboxLabel();

  userLogin: string = '';
  userPassword: string = '';
  infoMessage: string = this.getInfoMessage();

  loggingIn: boolean = false;
  loggingOut: boolean = false;

  constructor(
    public carolAuthService: CarolAuthService
  ) { }

  ngOnInit() {
    this.carolAuthService.loggedIn$.subscribe(this.isLoggedInHandler.bind(this))
    this.carolAuthService.setSelfLogin(true);
  }

  onChangeSelfLogin(isSelfLogin: boolean) {
    this.carolAuthService.setSelfLogin(isSelfLogin);
    this.checkboxLabel = this.getCheckboxLabel();
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

  private getCheckboxLabel(): string {
    return this.carolAuthService.selfLogin ? LOGGED_IN_LABEL : LOGGED_OUT_LABEL;
  }

  private getInfoMessage(): string {
    return this.isLoggedIn ? LOGGED_IN_INFO : LOGGED_OUT_INFO;
  }
}

const LOGGED_IN_LABEL = `Self login is set to TRUE. Nothing will happen after logging out except for a message in the 'loggedIn$' Observable`;
const LOGGED_OUT_LABEL = 'Self login is set to FALSE. You will be redirected to the SSO page after logging out';

const LOGGED_IN_INFO = 'You are currently logged in';
const LOGGED_OUT_INFO = 'You are currently NOT logged in. Requests to the Carol Platform may result in 401 exceptions';