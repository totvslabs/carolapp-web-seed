import { APP_INITIALIZER, isDevMode, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {
  PoFieldModule,
  PoMenuModule,
  PoModule,
  PoPageModule,
  PoToolbarModule,
} from '@po-ui/ng-components';
import { CarolAuthService } from 'carol-app-fe-sdk';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponent } from './routes/base/base.component';
import { HomeComponent } from './routes/home/home.component';

import conf from '../../proxy.conf.json';

function appInitializer(carolAuth: CarolAuthService) {
  return () =>
    isDevMode()
      ? carolAuth
          .setDomain(conf['/api/*'].target)
          .setOrganization(conf.organization)
          .setEnvironment(conf.environment)
          .appStart()
      : carolAuth.appStart();
}

@NgModule({
  declarations: [AppComponent, HomeComponent, BaseComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PoPageModule,
    PoFieldModule,
    PoToolbarModule,
    PoMenuModule,
    FormsModule,
    PoModule,
    RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
    RouterModule.forRoot([]),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [CarolAuthService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
