import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RolesResolver } from '@shared/resolvers';
import { SharedModule } from '@shared/shared.module';
import { DashboardRoutes } from './dashboard.routing';
import { DashboardComponent } from './views';

@NgModule({
  declarations: [DashboardComponent],
  imports: [RouterModule.forChild(DashboardRoutes), SharedModule],
  providers: [RolesResolver],
})
export class DashboardModule {}
