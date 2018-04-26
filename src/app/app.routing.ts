import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent } from './pages/main/main-page.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';

const appRoutes: Routes = [
{ path: '', component: MainPageComponent, canActivate: [AuthGuard] },
{ path: 'login', component: LoginComponent, canActivate: [AuthGuardLogin] },
{ path: '**', redirectTo: '' },
];

export const routing = RouterModule.forRoot(appRoutes);
