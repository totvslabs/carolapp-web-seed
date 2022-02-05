import { Component, OnInit } from '@angular/core';
import { CarolAuthService } from '@totvslabs/carol-app-fe-sdk';

@Component({
  selector: 'app-authenticated-wrapper',
  templateUrl: './authenticated-wrapper.component.html'
})
export class AuthenticatedWrapperComponent implements OnInit {
  isLoggedIn: boolean = true;
  
  constructor(private carolAuthService: CarolAuthService) { }

  ngOnInit() {
    this.carolAuthService.loggedIn$.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }
}