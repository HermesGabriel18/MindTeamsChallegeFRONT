import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ClientsRoutes } from './clients.routing';
import { ClientFormComponent, ClientDetailComponent } from './components';
import { ClientResolver, ClientsResolver } from './resolvers';
import { ClientService } from './services';
import { ClientsListComponent } from './views';

@NgModule({
  imports: [RouterModule.forChild(ClientsRoutes), SharedModule],
  providers: [ClientService, ClientsResolver, ClientResolver],
  declarations: [
    ClientsListComponent,
    ClientFormComponent,
    ClientDetailComponent,
  ],
})
export class ClientsModule {}
