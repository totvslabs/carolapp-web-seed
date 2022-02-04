import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';
import { BaseComponent } from './components/base/base.component';

const routes: Routes = [{
  path: '',
  component: BaseComponent,
  canActivate: [IsLoggedInGuard],
  children: []
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
