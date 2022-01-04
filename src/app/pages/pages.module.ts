import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { PagesComponent } from './pages.component';
import { PagesRoutes } from './pages.routing';

@NgModule({
  imports: [RouterModule.forChild(PagesRoutes), SharedModule],
  declarations: [PagesComponent],
})
export class PagesModule {}
