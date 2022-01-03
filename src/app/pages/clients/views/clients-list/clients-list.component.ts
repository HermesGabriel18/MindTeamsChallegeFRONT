import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MindTeamsRoutes } from '@core/models';
import { UtilsService } from '@core/utils';
import { Client, ClientFilter } from '@pages/clients/models';
import { ClientService } from '@pages/clients/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css'],
})
export class ClientsListComponent implements OnInit, OnDestroy {
  module = '';
  title = '';
  isLoading = false;
  showFilter = false;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['name', 'status', 'actions'];
  clientsList: Client[] = [];
  clientsFilter: ClientFilter = null;
  private _subscription: Subscription = new Subscription();
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _clientService: ClientService,
    private _utilsService: UtilsService
  ) {}

  get pageLength(): number {
    return this._clientService.meta ? this._clientService.meta.total : 0;
  }

  get pageSize(): number {
    return this._clientService.meta ? this._clientService.meta.per_page : 0;
  }

  ngOnInit(): void {
    this.module = this._activatedRoute.snapshot.data.module;
    this.title = this._activatedRoute.snapshot.data.title;
    this.clientsList = this._activatedRoute.snapshot.data.clients;
    this._loadDataSource();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  paginationEvent({ pageIndex, pageSize }) {
    this.getClients({
      pageIndex,
      pageSize,
      filters: this.clientsFilter,
    });
  }

  onFilter(clientsFilter: ClientFilter) {
    if (!clientsFilter) {
      this.clientsFilter = null;
      this.getClients();
      return;
    }
    this.clientsFilter = clientsFilter;
    this.getClients({ filters: this.clientsFilter });
  }

  addClient() {
    this._router.navigate([
      `/app/${MindTeamsRoutes.clients}/${MindTeamsRoutes.add}`,
    ]);
  }

  editClient(idClient: string) {
    this._router.navigate([
      `/app/${MindTeamsRoutes.clients}/${MindTeamsRoutes.edit}`,
      idClient,
    ]);
  }

  showClient(idClient: string) {
    this._router.navigate([
      `/app/${MindTeamsRoutes.clients}/${MindTeamsRoutes.show}`,
      idClient,
    ]);
  }

  getClients({ pageIndex = null, pageSize = null, filters = null } = {}) {
    this.isLoading = true;
    this._subscription = this._clientService
      .getAllClients({
        pageIndex: pageIndex + 1,
        pageSize,
        filters,
      })
      .subscribe(
        (clients) => {
          this.clientsList = clients;
          this._loadDataSource();
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
          this._handleError('Error al consultar el listado de clientes');
        }
      );
  }

  deleteClient(idClient: string) {
    this._utilsService
      .confirmDelete('¿Estás seguro de eliminar este cliente?')
      .then((result) => {
        if (result.isConfirmed) {
          this._deleteClient(idClient);
        }
      });
  }

  private _handleError(message: string = '') {
    this.isLoading = false;
    this._utilsService.showNotificationError(message);
  }

  private _loadDataSource(clients?: Client[]) {
    this.dataSource = new MatTableDataSource(clients || this.clientsList);
  }

  private _deleteClient(idClient: string) {
    this.isLoading = true;
    this._subscription = this._clientService.deleteClient(idClient).subscribe(
      () => {
        this._utilsService.successAlert('Cliente eliminado');
        this.getClients();
      },
      () => {
        this._handleError('Error al eliminar el cliente');
      }
    );
  }
}
