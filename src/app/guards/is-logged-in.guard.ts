import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CarolAuthService } from '@totvslabs/carol-app-fe-sdk';

@Injectable({providedIn: 'root'})
export class IsLoggedInGuard implements CanActivate {
  constructor(private carolAuthService: CarolAuthService) { }

  async canActivate(): Promise<boolean> {
    return await new Promise((resolve) => {
      this.carolAuthService.loggedIn$.subscribe(loggedIn => {
        resolve(loggedIn);
      });
    })
  }
}