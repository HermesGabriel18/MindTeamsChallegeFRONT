import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { MindTeamsRoutes } from '@core/models';
import { UtilsService } from '@core/utils';
import { Assignment } from '@pages/assignments/models';
import { AssignmentService } from '@pages/assignments/services';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsByUserResolver implements Resolve<Assignment[]> {
  constructor(
    private _router: Router,
    private _utilsService: UtilsService,
    private _assignmentService: AssignmentService
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Assignment[]> {
    // tslint:disable-next-line: radix
    const project_id: number = parseInt(route.params.id);
    return this._assignmentService
      .getAllAssignments({
        filters: { project_id: project_id, with: ['user'] },
      })
      .pipe(
        map((assignments) => assignments),
        catchError(() => {
          this._utilsService.showNotificationError(
            'Error al consultar el equipo del proyecto'
          );
          this._router.navigate([`app/${MindTeamsRoutes.error}`]);
          return of(null);
        })
      );
  }
}
