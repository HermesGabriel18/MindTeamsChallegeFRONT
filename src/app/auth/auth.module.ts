import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login';
import { SharedModule } from '@shared/shared.module';
import { AuthComponent } from './auth.component';
import { AuthRoutes } from './auth.routing';

@NgModule({
  imports: [RouterModule.forChild(AuthRoutes), SharedModule],
  declarations: [AuthComponent, LoginComponent],
})
export class AuthModule {}
