import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PoToolbarProfile, PoToolbarAction } from '@po-ui/ng-components';
import { CarolAuthService } from 'carol-app-fe-sdk';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
})
export class BaseComponent {
  menus = [
    { label: 'Page 1', link: './' },
    { label: 'Page 2', link: './' },
    { label: 'Page 3', link: './' },
    { label: 'Page 4', link: './' },
    { label: 'Page 5', link: './' },
  ];

  profile: Observable<PoToolbarProfile>;

  profileActions: Array<PoToolbarAction> = [
    {
      icon: 'po-icon-exit',
      label: 'Exit',
      type: 'danger',
      separator: true,
      action: () => this.carolAuthService.logout(),
    },
  ];

  constructor(private carolAuthService: CarolAuthService) {}
}
