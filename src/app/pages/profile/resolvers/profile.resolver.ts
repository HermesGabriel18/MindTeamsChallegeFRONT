import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { User } from '@auth/models';
import { MindTeamsRoutes } from '@core/models';
import { UtilsService } from '@core/utils';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProfileService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<User> {
  constructor(
    private _router: Router,
    private _utilsService: UtilsService,
    private _profileService: ProfileService
  ) {}

  resolve(): Observable<User> {
    return this._profileService.getProfile().pipe(
      map((user) => user),
      catchError(() => {
        this._utilsService.showNotificationError(
          'Error al consultar el perfil'
        );
        this._router.navigate([`app/${MindTeamsRoutes.error}`]);
        return of(null);
      })
    );
  }
}
