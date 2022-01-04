import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { MindTeamsRoutes } from '@core/models';
import { UtilsService } from '@core/utils';
import { Client } from '@pages/clients/models';
import { ClientService } from '@pages/clients/services';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientsResolver implements Resolve<Client[]> {
  constructor(
    private _router: Router,
    private _utilsService: UtilsService,
    private _clientService: ClientService
  ) {}
  resolve(): Observable<Client[]> {
    return this._clientService.getAllClients().pipe(
      map((clients) => clients),
      catchError(() => {
        this._utilsService.showNotificationError(
          'Error al consultar el listado de clientes'
        );
        this._router.navigate([`app/${MindTeamsRoutes.error}`]);
        return of(null);
      })
    );
  }
}
