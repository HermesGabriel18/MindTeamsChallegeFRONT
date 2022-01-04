import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { User } from '@auth/models';
import { MindTeamsRoutes } from '@core/models';
import { UtilsService } from '@core/utils';
import { UserService } from '@pages/users/services';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserDetailResolver implements Resolve<User> {
  constructor(
    private _router: Router,
    private _utilsService: UtilsService,
    private _userService: UserService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    // tslint:disable-next-line: radix
    const id: number = parseInt(route.params.id);
    return this._userService
      .getUserById(id, {
        with: ['role'],
      })
      .pipe(
        map((user) => user),
        catchError(() => {
          this._utilsService.showNotificationError(
            'Error al consultar el usuario'
          );
          this._router.navigate([`app/${MindTeamsRoutes.error}`]);
          return of(null);
        })
      );
  }
}
