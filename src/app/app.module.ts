import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThfKendoModule } from '@totvs/thf-kendo';
import { ThfModule, ThfToolbarModule, ThfPageModule, ThfMenuModule, ThfFieldModule } from '@totvs/thf-ui';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponent } from './routes/base/base.component';
import { HomeComponent } from './routes/home/home.component';
import { LoginComponent } from './routes/login/login.component';
import { AuthInterceptor } from './services/auth.interceptor';

import { ThfPageLoginModule } from '@totvs/thf-templates';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BaseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ThfPageLoginModule,
    ThfPageModule,
    ThfFieldModule,
    ThfModule,
    ThfKendoModule,
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
