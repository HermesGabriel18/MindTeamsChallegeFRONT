import { Routes } from '@angular/router';
import { ProfileResolver } from './resolvers';
import { ProfileComponent } from './views';

export const ProfileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    resolve: {
      user: ProfileResolver,
    },
    data: {
      module: 'Perfil',
      title: 'Editar mi perfil',
    },
  },
];
