import { Routes } from '@angular/router';
import { Privileges } from '@auth/models';
import { MindTeamsRoutes } from '@core/models';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

export const AdminLayoutRoutes: Routes = [
  //   {
  //     path: MindTeamsRoutes.dashboard,
  //     component: DashboardComponent,
  //     canActivate: [NgxPermissionsGuard],
  //     data: {
  //       permissions: {
  //         only: [Privileges.USERS],
  //         redirectTo: 'auth/login',
  //       },
  //     },
  //   },
];
