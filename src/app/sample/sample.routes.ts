import { Routes } from '@angular/router';
import { ConnectorsComponent } from './components/connectors/connectors.component';
import { DatamodelsComponent } from './components/datamodels/datamodels.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './login/login.component';

export const sampleModuleRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'datamodels',
    component: DatamodelsComponent
  },
  {
    path: 'connectors',
    component: ConnectorsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
