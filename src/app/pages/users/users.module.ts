import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RolesResolver } from '@shared/resolvers';
import { SharedModule } from '@shared/shared.module';
import { UserDetailComponent, UserFormComponent } from './components';
import { UserDetailResolver, UserResolver, UsersResolver } from './resolvers';
import { UserService } from './services';
import { UsersRoutes } from './users.routing';
import { UsersListComponent } from './views';

@NgModule({
  declarations: [UsersListComponent, UserFormComponent, UserDetailComponent],
  imports: [RouterModule.forChild(UsersRoutes), SharedModule],
  providers: [
    UserService,
    UsersResolver,
    UserResolver,
    UserDetailResolver,
    RolesResolver,
  ],
})
export class UsersModule {}
