import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { BaseComponent } from './routes/base/base.component';


const routes: Routes = [
  { path: '', component: BaseComponent, children: [
    { path: '', component: HomeComponent }
  ]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
