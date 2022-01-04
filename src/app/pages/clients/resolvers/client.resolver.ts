import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { MindTeamsRoutes } from '@core/models';
import { UtilsService } from '@core/utils';
import { Client } from '@pages/clients/models';
import { ClientService } from '@pages/clients/services';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientResolver implements Resolve<Client> {
  constructor(
    private _router: Router,
    private _utilsService: UtilsService,
    private _clientService: ClientService
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Client> {
    // tslint:disable-next-line: radix
    const id: number = parseInt(route.params.id);
    return this._clientService.getClientById(id).pipe(
      map((client) => client),
      catchError(() => {
        this._utilsService.showNotificationError(
          'Error al consultar el cliente'
        );
        this._router.navigate([`app/${MindTeamsRoutes.error}`]);
        return of(null);
      })
    );
  }
}
