import { Routes } from '@angular/router';
import { MindTeamsRoutes } from '@core/models';
import { ClientDetailComponent, ClientFormComponent } from './components';
import {
  ClientResolver,
  ClientsResolver,
  ProjectsByClientResolver,
} from './resolvers';
import { ClientsListComponent } from './views';

export const ClientsRoutes: Routes = [
  {
    path: '',
    component: ClientsListComponent,
    resolve: {
      clients: ClientsResolver,
    },
    data: {
      module: 'Clientes',
      title: 'Listado de Clientes',
    },
  },
  {
    path: MindTeamsRoutes.add,
    component: ClientFormComponent,
    data: {
      module: 'Clientes',
      title: 'Añadir Cliente',
      edit: false,
    },
  },
  {
    path: `${MindTeamsRoutes.edit}/:id`,
    component: ClientFormComponent,
    resolve: {
      client: ClientResolver,
    },
    data: {
      module: 'Clientes',
      title: 'Editar Cliente',
      edit: true,
    },
  },
  {
    path: `${MindTeamsRoutes.show}/:id`,
    component: ClientDetailComponent,
    resolve: {
      client: ClientResolver,
      projects: ProjectsByClientResolver,
    },
    data: {
      module: 'Clientes',
      title: 'Detalle del Cliente',
    },
  },
];
