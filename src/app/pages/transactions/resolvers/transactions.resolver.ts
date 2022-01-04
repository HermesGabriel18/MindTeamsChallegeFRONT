import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { MindTeamsRoutes } from '@core/models';
import { UtilsService } from '@core/utils';
import { Transaction } from '@pages/transactions/models';
import { TransactionService } from '@pages/transactions/services';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TransactionsResolver implements Resolve<Transaction[]> {
  constructor(
    private _router: Router,
    private _utilsService: UtilsService,
    private _transactionService: TransactionService
  ) {}
  resolve(): Observable<Transaction[]> {
    return this._transactionService
      .getAllTransactions({
        filters: {
          with: ['createdBy', 'user', 'transactionType', 'project'],
        },
      })
      .pipe(
        map((transactions) => transactions),
        catchError(() => {
          this._utilsService.showNotificationError(
            'Error al consultar los movimientos'
          );
          this._router.navigate([`app/${MindTeamsRoutes.error}`]);
          return of(null);
        })
      );
  }
}
