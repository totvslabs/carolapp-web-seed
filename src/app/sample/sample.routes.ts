import { Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ConnectorsComponent } from './components/connectors/connectors.component';
import { DatamodelsComponent } from './components/datamodels/datamodels.component';
import { HomeComponent } from './components/home/home.component';

export const sampleModuleRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'datamodels',
    component: DatamodelsComponent,
  },
  {
    path: 'connectors',
    component: ConnectorsComponent,
  },
  {
    path: 'authentication',
    component: AuthenticationComponent,
  },
];
