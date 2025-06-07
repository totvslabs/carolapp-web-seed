import { APP_INITIALIZER, isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';

import conf from 'proxy.conf.json';
import { CarolAuthService, CarolSdkModule } from '@totvslabs/carol-app-fe-sdk';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { BaseComponent } from './components/base/base.component';
import { SampleModule } from './sample/sample.module';

function appInitializer(carolAuth: CarolAuthService) {
  //NOTE: only use this value as TRUE if you will take care of the authentication flow. See LoginComponent
  const disableAutoLogin = true;

  return () =>
    isDevMode()
      ? carolAuth
          .setDomain(conf['/api/*'].target)
          .setOrganization(conf.carolOrganization)
          .setEnvironment(conf.carolEnvironment)
          .setSelfLogin(disableAutoLogin)
          .appStart()
      : carolAuth.setSelfLogin(disableAutoLogin).appStart();
}

@NgModule({
  declarations: [AppComponent, BaseComponent],
  bootstrap: [AppComponent],
  imports: [
    CarolSdkModule,
    SampleModule,
    BrowserModule,
    AppRoutingModule,
    PoModule,
    RouterModule.forRoot([], { useHash: true }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [CarolAuthService],
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
