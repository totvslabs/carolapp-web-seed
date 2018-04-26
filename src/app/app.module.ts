import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { ThfModule } from '@totvs/thf-ui';

import { ResultBoxComponent } from './components/result-box/result-box.component';
import { CardComponent } from './components/card/card.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ContainerComponent } from './components/container/container.component';
import { PercentageResultComponent } from './components/percentage-result/percentage-result.component';
import { LoginComponent } from './pages/login/login.component';

import { I18nService } from './services/i18n.service';
import { HttpRequestsService } from './services/http-requests.service';
import { AuthService } from './services/auth.service';

import { MainPageComponent } from './pages/main/main-page.component';
import { MainPageService } from './services/carol-querys/main-page.service';
import { ResultBoxGroupComponent } from './components/result-box-group/result-box-group.component';
import { BulletChartsComponent } from './components/bullet-charts/bullet-charts.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { LoadingComponent } from './components/loading/loading.component';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { ToolbarSearchService } from './services/carol-querys/toolbar-search.service';
import { ChartComponent } from './components/chart/chart.component';
import { ChartPieComponent } from './components/chart-pie/chart-pie.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CardComponent,
    ContainerComponent,
    PercentageResultComponent,
    ResultBoxComponent,
    ToolbarComponent,
    LoginComponent,
    ResultBoxGroupComponent,
    BulletChartsComponent,
    LoadingComponent,
    ChartComponent,
    ChartPieComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ThfModule,
    ChartsModule,
    HttpClientModule,
    routing
  ],
  providers: [
    AuthService,
    AuthGuard,
    AuthGuardLogin,
    HttpRequestsService,
    MainPageService,
    ToolbarSearchService,
    I18nService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
