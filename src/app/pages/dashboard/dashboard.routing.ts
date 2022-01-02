import { Routes } from '@angular/router';
import { DashboardComponent } from './views';

export const DashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      module: 'Dashboard',
      title: 'Dashboard',
    },
  },
];
