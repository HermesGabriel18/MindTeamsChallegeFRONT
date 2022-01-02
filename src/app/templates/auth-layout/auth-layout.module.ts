import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '@auth/login';
import { SharedModule } from '@shared/shared.module';
import { AuthLayoutComponent } from './auth-layout.component';
import { AuthLayoutRoutes } from './auth-layout.routing';

@NgModule({
  imports: [RouterModule.forChild(AuthLayoutRoutes), SharedModule],
  declarations: [AuthLayoutComponent, LoginComponent],
})
export class AuthLayoutModule {}
