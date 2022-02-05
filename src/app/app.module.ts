import { APP_INITIALIZER, isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';

import conf from 'proxy.conf.json';
import { CarolAuthService, CarolSdkModule } from '@totvslabs/carol-app-fe-sdk';
import { HttpClientModule } from '@angular/common/http';
import { BaseComponent } from './components/base/base.component';
import { SampleModule } from './sample/sample.module';

function appInitializer(carolAuth: CarolAuthService) {
  return () =>
    isDevMode()
      ? carolAuth
          .setDomain(conf['/api/*'].target)
          .setOrganization(conf.carolOrganization)
          .setEnvironment(conf.carolEnvironment)
          .appStart()
      : carolAuth.appStart();
}

@NgModule({
  declarations: [AppComponent, BaseComponent],
  imports: [
    CarolSdkModule,
    HttpClientModule,
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
