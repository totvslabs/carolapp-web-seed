import { Component } from '@angular/core';
import { PoMenuItem, PoToolbarAction } from '@po-ui/ng-components';
import { CarolAuthService } from '@totvslabs/carol-app-fe-sdk';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
})
export class BaseComponent {
  readonly profileActions: PoToolbarAction[] = [
    {
      label: 'Logout',
      action: () => this.carolAuthService.logout()
    }
  ]
  readonly menus: Array<PoMenuItem> = [
    { 
      label: 'Home',
      shortLabel: 'Home',
      icon: 'po-icon-home',
      link: '/'
    },
    {
      label: 'Datamodels',
      shortLabel:' Datamodels',
      icon: 'po-icon-database',
      link: '/datamodels'
    },
    {
      label: 'Connectors',
      shortLabel:' Connectors',
      icon: 'po-icon-handshake',
      link: '/connectors'
    },
    {
      label: 'Login',
      shortLabel:' Login',
      icon: 'po-icon-lock',
      link: '/login'
    },
  ];

  constructor(private carolAuthService: CarolAuthService) {
  }
}