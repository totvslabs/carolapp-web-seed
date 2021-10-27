import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';
import { CarolAuthService } from 'carol-app-fe-sdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private carolAuthService: CarolAuthService,
    private httpClient: HttpClient
  ) {}

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: this.onClick.bind(this) },
  ];

  ngOnInit() {
    this.carolAuthService.loggedIn$.subscribe((loggedIn) => {
      if (loggedIn) {
        this.httpClient.get('/api/v1/users/current').subscribe((res) => {
          console.log(res);
        });
      }
    });
  }

  private onClick() {
    alert('Clicked in menu item');
  }
}
