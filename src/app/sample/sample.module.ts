import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { PoModule } from '@po-ui/ng-components';
import { DatamodelsComponent } from './components/datamodels/datamodels.component';
import { HomeComponent } from './components/home/home.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ConnectorsComponent } from './components/connectors/connectors.component';
import { FormsModule } from '@angular/forms';
import { AuthenticatedWrapperComponent } from './components/authenticated-wrapper/authenticated-wrapper.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/login/login.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';

@NgModule({
  imports: [
    CommonModule,
    PoModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  exports: [],
  declarations: [
    HomeComponent,
    ConnectorsComponent,
    DatamodelsComponent,
    LoginComponent,
    AuthenticatedWrapperComponent,
    AuthenticationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    LoaderComponent,
  ],
  providers: [],
})
export class SampleModule {}
