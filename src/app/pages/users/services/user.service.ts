import { Injectable } from '@angular/core';
import { User } from '@auth/models';
import { UsersEndpoints } from '@core/models';
import { ApiService, UtilsService } from '@core/utils';
import { PaginatorLinks, PaginatorMeta } from '@shared/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
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

  getAllUsers({
    pageIndex = null,
    pageSize = null,
    dontPaginate = null,
    filters = null,
  } = {}): Observable<User[]> {
    return this._apiService
      .get(
        UsersEndpoints.users,
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

  getUserById(id: number, filters = null): Observable<User> {
    return this._apiService
      .get(
        UsersEndpoints.usersWithId.replace(':id', String(id)),
        this._utilsService.buildHttpOptions({
          filters,
        })
      )
      .pipe(map((response) => response.data));
  }

  createUser(data: User): Observable<User> {
    return this._apiService
      .post(UsersEndpoints.users, data)
      .pipe(map((response) => response.data));
  }

  updateUser(data: User): Observable<User> {
    return this._apiService
      .put(UsersEndpoints.usersWithId.replace(':id', String(data.id)), data)
      .pipe(map((response) => response.data));
  }

  deleteUser(user_id: any): Observable<any> {
    return this._apiService.delete(
      UsersEndpoints.usersWithId.replace(':id', user_id)
    );
  }
}
