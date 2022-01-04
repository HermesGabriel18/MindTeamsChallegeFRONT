import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ClientsRoutes } from './clients.routing';
import { ClientFormComponent, ClientDetailComponent } from './components';
import { ClientsListComponent } from './views';

@NgModule({
  imports: [RouterModule.forChild(ClientsRoutes), SharedModule],
  declarations: [
    ClientsListComponent,
    ClientFormComponent,
    ClientDetailComponent,
  ],
})
export class ClientsModule {}
