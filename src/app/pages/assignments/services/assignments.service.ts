import { Injectable } from '@angular/core';
import { AssignmentsEndpoints } from '@core/models';
import { ApiService, UtilsService } from '@core/utils';
import { PaginatorLinks, PaginatorMeta } from '@shared/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Assignment } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
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

  getAllAssignments({
    pageIndex = null,
    pageSize = null,
    dontPaginate = null,
    filters = null,
  } = {}): Observable<Assignment[]> {
    return this._apiService
      .get(
        AssignmentsEndpoints.assignments,
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

  createAssignment(data: Partial<Assignment>): Observable<Assignment> {
    return this._apiService
      .post(AssignmentsEndpoints.assignments, data)
      .pipe(map((response) => response.data));
  }

  deleteAssignment(assignment_id: string): any {
    return this._apiService.delete(
      AssignmentsEndpoints.assignmentsWithId.replace(
        ':id',
        String(assignment_id)
      )
    );
  }
}
