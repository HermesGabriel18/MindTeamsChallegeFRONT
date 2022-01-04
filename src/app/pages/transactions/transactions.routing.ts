import { Routes } from '@angular/router';
import { TransactionsResolver } from './resolvers';
import { TransactionsListComponent } from './views';

export const TransactionsRoutes: Routes = [
  {
    path: '',
    component: TransactionsListComponent,
    resolve: {
      transactions: TransactionsResolver,
    },
    data: {
      module: 'Movimientos',
      title: 'Listado de Movimientos',
    },
  },
];
