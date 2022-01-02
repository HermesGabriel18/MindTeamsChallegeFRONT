import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Role } from '@auth/models';
import { MindTeamsRoutes } from '@core/models';
import { UtilsService } from '@core/utils';
import { RoleService } from '@shared/services';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RolesResolver implements Resolve<Role[]> {
  constructor(
    private _router: Router,
    private _utilsService: UtilsService,
    private _roleService: RoleService
  ) {}
  resolve(): Observable<Role[]> {
    return this._roleService.getAllRoles().pipe(
      map((roles) => roles),
      catchError(() => {
        this._utilsService.showNotificationError(
          'Error al consultar el listado de roles'
        );
        this._router.navigate([`app/${MindTeamsRoutes.error}`]);
        return of(null);
      })
    );
  }
}
