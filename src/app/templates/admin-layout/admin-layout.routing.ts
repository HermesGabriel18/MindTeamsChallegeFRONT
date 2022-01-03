import { Routes } from '@angular/router';
import { Privileges } from '@auth/models';
import { MindTeamsRoutes } from '@core/models';
import { NgxPermissionsGuard } from 'ngx-permissions';

const error = MindTeamsRoutes.dashboard;

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
        only: [Privileges.DASHBOARD],
        redirectTo: error,
      },
    },
  },
  {
    path: MindTeamsRoutes.profile,
    loadChildren: () =>
      import('../../pages/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: MindTeamsRoutes.users,
    loadChildren: () =>
      import('../../pages/users/users.module').then((m) => m.UsersModule),
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [Privileges.USERS],
        redirectTo: error,
      },
    },
  },
];
