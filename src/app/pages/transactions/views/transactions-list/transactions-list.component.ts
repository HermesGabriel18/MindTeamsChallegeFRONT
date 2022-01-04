import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '@core/utils';
import { Transaction, TransactionFilter } from '@pages/transactions/models';
import { TransactionService } from '@pages/transactions/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css'],
})
export class TransactionsListComponent implements OnInit, OnDestroy {
  module = '';
  title = '';
  isLoading = false;
  dataSource = new MatTableDataSource<any>();
  transactionsList: Transaction[] = [];
  transactionsFilter: TransactionFilter = null;
  showFilter = false;
  private _subscription: Subscription = new Subscription();
  private _displayedColumns: string[] = [
    'createdBy',
    'transactionType',
    'user',
    'project',
  ];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _transactionService: TransactionService,
    private _utilsService: UtilsService
  ) {}

  get pageLength(): number {
    return this._transactionService.meta
      ? this._transactionService.meta.total
      : 0;
  }

  get pageSize(): number {
    return this._transactionService.meta
      ? this._transactionService.meta.per_page
      : 0;
  }

  get displayedColumns(): string[] {
    return this._displayedColumns;
  }

  ngOnInit() {
    this.module = this._activatedRoute.snapshot.data.module;
    this.title = this._activatedRoute.snapshot.data.title;
    this.transactionsList = this._activatedRoute.snapshot.data.transactions;
    this._loadDataSource();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  paginationEvent({ pageIndex, pageSize }) {
    this.getTransactions({
      pageIndex,
      pageSize,
      filters: this.transactionsFilter,
    });
  }

  onFilter(transactionsFilter: TransactionFilter) {
    if (!transactionsFilter) {
      this.transactionsFilter = null;
      this.getTransactions();
      return;
    }
    this.transactionsFilter = transactionsFilter;
    this.getTransactions({ filters: this.transactionsFilter });
  }

  getTransactions({ pageIndex = null, pageSize = null, filters = null } = {}) {
    this.isLoading = true;
    this._subscription = this._transactionService
      .getAllTransactions({
        pageIndex: pageIndex + 1,
        pageSize,
        filters,
      })
      .subscribe(
        (transactions) => {
          this.transactionsList = transactions;
          this._loadDataSource();
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
          this._handleError('Error al consultar el listado de usuarios');
        }
      );
  }

  private _handleError(message: string = '') {
    this.isLoading = false;
    this._utilsService.showNotificationError(message);
  }

  private _loadDataSource() {
    this.dataSource = new MatTableDataSource(this.transactionsList);
  }
}
