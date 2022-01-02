import { Routes } from '@angular/router';
import { Privileges } from '@auth/models';
import { MindTeamsRoutes } from '@core/models';
import { NgxPermissionsGuard } from 'ngx-permissions';

export const AdminLayoutRoutes: Routes = [
  {
    path: MindTeamsRoutes.dashboard,
    loadChildren: () =>
      import('../../pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [Privileges.USERS],
        redirectTo: 'auth/login',
      },
    },
  },
];
