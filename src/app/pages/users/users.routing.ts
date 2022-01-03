import { Routes } from '@angular/router';
import { MindTeamsRoutes } from '@core/models';
import { RolesResolver } from '@shared/resolvers/roles.resolver';
import { UserDetailComponent, UserFormComponent } from './components';
import { UserDetailResolver, UserResolver, UsersResolver } from './resolvers';
import { UsersListComponent } from './views';

export const UsersRoutes: Routes = [
  {
    path: '',
    component: UsersListComponent,
    resolve: {
      users: UsersResolver,
      roles: RolesResolver,
    },
    data: {
      module: 'Usuarios',
      title: 'Listado de Usuarios',
    },
  },
  {
    path: MindTeamsRoutes.add,
    component: UserFormComponent,
    resolve: {
      roles: RolesResolver,
    },
    data: {
      module: 'Usuarios',
      title: 'Añadir Usuario',
      edit: false,
    },
  },
  {
    path: `${MindTeamsRoutes.edit}/:id`,
    component: UserFormComponent,
    resolve: {
      user: UserResolver,
      roles: RolesResolver,
    },
    data: {
      module: 'Usuarios',
      title: 'Editar Usuario',
      edit: true,
    },
  },
  {
    path: `${MindTeamsRoutes.show}/:id`,
    component: UserDetailComponent,
    resolve: {
      user: UserDetailResolver,
    },
    data: {
      module: 'Usuarios',
      title: 'Detalle del Usuario',
    },
  },
];
