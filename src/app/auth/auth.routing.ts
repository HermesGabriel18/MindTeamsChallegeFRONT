import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MindTeamsRoutes } from '@core/models';

export const AuthRoutes: Routes = [
  {
    path: '',
    redirectTo: `${MindTeamsRoutes.login}`,
    pathMatch: 'full',
  },
  { path: `${MindTeamsRoutes.login}`, component: LoginComponent },
];
