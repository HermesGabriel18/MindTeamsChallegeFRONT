import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { UserDetailComponent, UserFormComponent } from './components';
import { UsersRoutes } from './users.routing';
import { UsersListComponent } from './views';

@NgModule({
  declarations: [UsersListComponent, UserFormComponent, UserDetailComponent],
  imports: [RouterModule.forChild(UsersRoutes), SharedModule],
})
export class UsersModule {}
