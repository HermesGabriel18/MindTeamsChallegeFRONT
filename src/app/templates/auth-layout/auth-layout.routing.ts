import { Routes } from '@angular/router';
import { LoginComponent } from '@auth/login/login.component';
import { MindTeamsRoutes } from '@core/models';

export const AuthLayoutRoutes: Routes = [
  {
    path: '',
    redirectTo: `${MindTeamsRoutes.login}`,
    pathMatch: 'full',
  },
  { path: `${MindTeamsRoutes.login}`, component: LoginComponent },
];
