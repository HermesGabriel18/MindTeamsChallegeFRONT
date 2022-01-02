import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from '@app/templates/auth-layout/auth-layout.component';
import { AuthGuard, ReturnLoggedGuard } from '@core/guards';
import { MindTeamsRoutes } from '@core/models';
import { AdminLayoutComponent } from '@templates/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [ReturnLoggedGuard],
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./templates/auth-layout/auth-layout.module').then(
            (m) => m.AuthLayoutModule
          ),
      },
    ],
  },
  {
    path: 'app',
    redirectTo: `app/${MindTeamsRoutes.dashboard}`,
    pathMatch: 'full',
  },
  {
    path: 'app',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./templates/admin-layout/admin-layout.module').then(
            (m) => m.AdminLayoutModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}
