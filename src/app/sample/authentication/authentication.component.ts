import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  readonly Tabs = Tabs;
  selectedTab: Tabs = Tabs.LOGIN;

  constructor() {}
  
  ngOnInit(): void {
      
  }
}

enum Tabs {
  LOGIN = 'LOGIN',
  FORGOT_PASS = 'FORGOT_PASS',
  CHANGE_PASS = 'CHANGE_PASS'
}