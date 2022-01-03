import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ProfileRoutes } from './profile.routing';
import { ProfileComponent } from './views';

@NgModule({
  declarations: [ProfileComponent],
  imports: [RouterModule.forChild(ProfileRoutes), SharedModule],
})
export class ProfileModule {}
