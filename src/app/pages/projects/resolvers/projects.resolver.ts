import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { MindTeamsRoutes } from '@core/models';
import { UtilsService } from '@core/utils';
import { Project } from '@pages/projects/models';
import { ProjectService } from '@pages/projects/services';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProjectsResolver implements Resolve<Project[]> {
  constructor(
    private _router: Router,
    private _utilsService: UtilsService,
    private _projectService: ProjectService
  ) {}
  resolve(): Observable<Project[]> {
    return this._projectService
      .getAllProjects({ filters: { with: ['client'] } })
      .pipe(
        map((projects) => projects),
        catchError(() => {
          this._utilsService.showNotificationError(
            'Error al consultar el listado de proyectos'
          );
          this._router.navigate([`app/${MindTeamsRoutes.error}`]);
          return of(null);
        })
      );
  }
}
