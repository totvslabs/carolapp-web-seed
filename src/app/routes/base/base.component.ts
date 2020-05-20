import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { PoToolbarProfile, PoToolbarAction } from '@po-ui/ng-components';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html'
})
export class BaseComponent {

  menus = [
    { label: 'Page 1', link: './' },
    { label: 'Page 2', link: './' },
    { label: 'Page 3', link: './' },
    { label: 'Page 4', link: './' },
    { label: 'Page 5', link: './' }
  ];

  profile: Observable<PoToolbarProfile>;

  profileActions: Array<PoToolbarAction> = [
    {
      icon: 'po-icon-exit',
      label: 'Exit',
      type: 'danger',
      separator: true,
      action: item => this.authService.logout()
    }
  ];

  constructor(
    private authService: AuthService,
  ) {
    this.profile = this.authService.sessionObservable;
  }

}
