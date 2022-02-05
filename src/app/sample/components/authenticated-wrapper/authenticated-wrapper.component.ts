import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarolAuthService } from '@totvslabs/carol-app-fe-sdk';

@Component({
  selector: 'app-authenticated-wrapper',
  templateUrl: './authenticated-wrapper.component.html',
  styleUrls: ['./authenticated-wrapper.component.scss'],
})
export class AuthenticatedWrapperComponent implements OnInit {
  isLoggedIn: boolean = true;

  constructor(
    private carolAuthService: CarolAuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carolAuthService.loggedIn$.subscribe(
      (isLoggedIn) => (this.isLoggedIn = isLoggedIn)
    );
  }

  goToLogin() {
    this.router.navigate(['/authentication']);
  }
}
