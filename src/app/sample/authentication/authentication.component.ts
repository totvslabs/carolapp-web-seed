import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  readonly Tabs = Tabs;
  selectedTab: Tabs = Tabs.LOGIN;

  constructor(private route: ActivatedRoute) {
    if (this.route.snapshot.queryParams['passwordResetToken']) {
      this.selectedTab = Tabs.RESET_PASS;
    }
  }
  
  ngOnInit(): void {
      
  }
}

export enum Tabs {
  LOGIN = 'LOGIN',
  FORGOT_PASS = 'FORGOT_PASS',
  RESET_PASS = 'RESET_PASS'
}