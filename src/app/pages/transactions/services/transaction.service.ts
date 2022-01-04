import { Injectable } from '@angular/core';
import { TransactionsEndpoints } from '@core/models';
import { ApiService, UtilsService } from '@core/utils';
import { PaginatorLinks, PaginatorMeta } from '@shared/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaction } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private _links: PaginatorLinks;
  private _meta: PaginatorMeta;
  constructor(
    private _apiService: ApiService,
    private _utilsService: UtilsService
  ) {}

  set links(links: PaginatorLinks) {
    this._links = links;
  }

  set meta(meta: PaginatorMeta) {
    this._meta = meta;
  }

  get links(): PaginatorLinks {
    return this._links;
  }

  get meta(): PaginatorMeta {
    return this._meta;
  }

  getAllTransactions({
    pageIndex = null,
    pageSize = null,
    dontPaginate = null,
    filters = null,
  } = {}): Observable<Transaction[]> {
    return this._apiService
      .get(
        TransactionsEndpoints.transactions,
        this._utilsService.buildHttpOptions({
          pageIndex,
          pageSize,
          dontPaginate,
          filters,
        })
      )
      .pipe(
        map((response) => {
          this.links = response.links || null;
          this.meta = response.meta || null;
          return response.data;
        })
      );
  }

  getTransactionById(id: number, filters = null): Observable<Transaction> {
    return this._apiService
      .get(
        TransactionsEndpoints.transactionsWithId.replace(':id', String(id)),
        this._utilsService.buildHttpOptions({
          filters,
        })
      )
      .pipe(map((response) => response.data));
  }
}
