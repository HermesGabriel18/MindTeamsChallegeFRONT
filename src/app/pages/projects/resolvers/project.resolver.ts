import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { MindTeamsRoutes } from '@core/models';
import { UtilsService } from '@core/utils';
import { Project } from '@pages/projects/models';
import { ProjectService } from '@pages/projects/services';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProjectResolver implements Resolve<Project> {
  constructor(
    private _router: Router,
    private _utilsService: UtilsService,
    private _projectService: ProjectService
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Project> {
    // tslint:disable-next-line: radix
    const id: number = parseInt(route.params.id);
    return this._projectService
      .getProjectById(id, {
        with: ['client'],
      })
      .pipe(
        map((project) => project),
        catchError(() => {
          this._utilsService.showNotificationError(
            'Error al consultar el proyecto'
          );
          this._router.navigate([`app/${MindTeamsRoutes.error}`]);
          return of(null);
        })
      );
  }
}
