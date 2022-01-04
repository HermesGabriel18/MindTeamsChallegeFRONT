import { Injectable } from '@angular/core';
import { Role } from '@auth/models';
import { RolesEndpoints } from '@core/models';
import { ApiService } from '@core/utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    constructor(private _apiService: ApiService) {}

    getAllRoles(): Observable<Role[]> {
        return this._apiService
            .get(RolesEndpoints.roles)
            .pipe(map(response => response.data));
    }
}
