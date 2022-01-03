import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '@pages/users/services';
import { RolesResolver } from '@shared/resolvers';
import { SharedModule } from '@shared/shared.module';
import { ProfileRoutes } from './profile.routing';
import { ProfileResolver } from './resolvers';
import { ProfileService } from './services';
import { ProfileComponent } from './views';

@NgModule({
  declarations: [ProfileComponent],
  imports: [RouterModule.forChild(ProfileRoutes), SharedModule],
  providers: [UserService, ProfileService, ProfileResolver, RolesResolver],
})
export class ProfileModule {}
