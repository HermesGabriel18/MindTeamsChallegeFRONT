import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { User } from '@auth/models';
import { MindTeamsRoutes } from '@core/models';
import { UtilsService } from '@core/utils';
import { UserService } from '@pages/users/services';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersResolver implements Resolve<User[]> {
  constructor(
    private _router: Router,
    private _utilsService: UtilsService,
    private _userService: UserService
  ) {}
  resolve(): Observable<User[]> {
    return this._userService.getAllUsers().pipe(
      map((users) => users),
      catchError(() => {
        this._utilsService.showNotificationError(
          'Error al consultar el listado de usuarios'
        );
        this._router.navigate([`app/${MindTeamsRoutes.error}`]);
        return of(null);
      })
    );
  }
}
