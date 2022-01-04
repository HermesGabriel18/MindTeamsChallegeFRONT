import { Injectable } from '@angular/core';
import { ProjectsEndpoints } from '@core/models';
import { ApiService, UtilsService } from '@core/utils';
import { PaginatorLinks, PaginatorMeta } from '@shared/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private _links: PaginatorLinks;
  private _meta: PaginatorMeta;
  constructor(
    private _apiService: ApiService,
    private _utilsService: UtilsService
  ) {}

  set links(links: PaginatorLinks) {
    this._links = links;
  }

  set meta(meta: PaginatorMeta) {
    this._meta = meta;
  }

  get links(): PaginatorLinks {
    return this._links;
  }

  get meta(): PaginatorMeta {
    return this._meta;
  }

  getAllProjects({
    pageIndex = null,
    pageSize = null,
    dontPaginate = null,
    filters = null,
  } = {}): Observable<Project[]> {
    return this._apiService
      .get(
        ProjectsEndpoints.projects,
        this._utilsService.buildHttpOptions({
          pageIndex,
          pageSize,
          dontPaginate,
          filters,
        })
      )
      .pipe(
        map((response) => {
          this.links = response.links || null;
          this.meta = response.meta || null;
          return response.data;
        })
      );
  }

  getProjectById(id: number, filters = null): Observable<Project> {
    return this._apiService
      .get(
        ProjectsEndpoints.projectsWithId.replace(':id', String(id)),
        this._utilsService.buildHttpOptions({
          filters,
        })
      )
      .pipe(map((response) => response.data));
  }

  createProject(data: Project): Observable<Project> {
    return this._apiService
      .post(ProjectsEndpoints.projects, data)
      .pipe(map((response) => response.data));
  }

  updateProject(data: Project): Observable<Project> {
    return this._apiService
      .put(
        ProjectsEndpoints.projectsWithId.replace(':id', String(data.id)),
        data
      )
      .pipe(map((response) => response.data));
  }

  deleteProject(project_id: string): any {
    return this._apiService.delete(
      ProjectsEndpoints.projectsWithId.replace(':id', String(project_id))
    );
  }
}
