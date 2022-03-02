import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CarolAuthService } from '@totvslabs/carol-app-fe-sdk';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class IsLoggedInGuard implements CanActivate {
  constructor(private carolAuthService: CarolAuthService) {}

  async canActivate(): Promise<boolean> {
    return await new Promise((resolve) => {
      if (this.carolAuthService.selfLogin) {
        resolve(true);
      } else {
        this.carolAuthService.loggedIn$
          .pipe(take(1))
          .subscribe((loggedIn) => resolve(loggedIn));
      }
    });
  }
}
