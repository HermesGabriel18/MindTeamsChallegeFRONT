import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminLayoutRoutes } from './admin-layout.routing';

@NgModule({
  imports: [RouterModule.forChild(AdminLayoutRoutes), SharedModule],
  declarations: [AdminLayoutComponent],
})
export class AdminLayoutModule {}
