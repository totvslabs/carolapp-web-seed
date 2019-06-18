import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { carol } from 'carol-sdk/lib/carol';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private auth: AuthService) {
    this.auth.sessionObservable.subscribe();
    carol.setAuthToken(localStorage.getItem('carol-token'));
  }
}
