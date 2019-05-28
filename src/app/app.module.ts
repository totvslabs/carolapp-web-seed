import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';

import { LoginComponent } from './routes/login/login.component';
import { HomeComponent } from './routes/home/home.component';

import { ThfPageLoginModule } from '@totvs/thf-templates/components/thf-page-login';

import { ThfModule } from '@totvs/thf-ui';
import { ThfToolbarModule } from '@totvs/thf-ui/components/thf-toolbar';
import { ThfMenuModule } from '@totvs/thf-ui/components/thf-menu';
import { ThfPageModule } from '@totvs/thf-ui/components/thf-page';
import { BaseComponent } from './routes/base/base.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ThfModule,
    ThfPageLoginModule,
    ThfToolbarModule,
    ThfPageModule,
    ThfMenuModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
