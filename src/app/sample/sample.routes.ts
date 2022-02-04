import { Routes } from '@angular/router';
import { DatamodelsComponent } from './components/datamodels/datamodels.component';
import { HomeComponent } from './components/home/home.component';

export const sampleModuleRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'datamodels',
    component: DatamodelsComponent
  }
];
