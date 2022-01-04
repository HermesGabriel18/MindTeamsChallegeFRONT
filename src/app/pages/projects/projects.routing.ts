import { Routes } from '@angular/router';
import { MindTeamsRoutes } from '@core/models';
import { ProjectFormComponent, ProjectDetailComponent } from './components';
import { ProjectsResolver, ProjectResolver } from './resolvers';
import { ProjectsListComponent } from './views';
import { ClientsResolver } from '@pages/clients/resolvers/clients.resolver';

export const ProjectsRoutes: Routes = [
  {
    path: '',
    component: ProjectsListComponent,
    resolve: {
      projects: ProjectsResolver,
    },
    data: {
      module: 'Proyectos',
      title: 'Listado de Proyectos',
    },
  },
  {
    path: MindTeamsRoutes.add,
    component: ProjectFormComponent,
    resolve: {
      clients: ClientsResolver,
    },
    data: {
      module: 'Proyectos',
      title: 'Añadir Proyecto',
      edit: false,
    },
  },
  {
    path: `${MindTeamsRoutes.edit}/:id`,
    component: ProjectFormComponent,
    resolve: {
      project: ProjectResolver,
      clients: ClientsResolver,
    },
    data: {
      module: 'Proyectos',
      title: 'Editar Proyecto',
      edit: true,
    },
  },
  {
    path: `${MindTeamsRoutes.show}/:id`,
    component: ProjectDetailComponent,
    resolve: {
      project: ProjectResolver,
    },
    data: {
      module: 'Proyectos',
      title: 'Detalle del Proyecto',
    },
  },
];
