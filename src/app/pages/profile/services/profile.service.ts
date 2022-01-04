import { Injectable } from '@angular/core';
import { User } from '@auth/models';
import { UsersEndpoints } from '@core/models';
import { ApiService, UtilsService } from '@core/utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    constructor(
        private _apiService: ApiService,
        private _utilsService: UtilsService
    ) {}

    getProfile(filters = null): Observable<User> {
        return this._apiService
            .get(
                UsersEndpoints.profile,
                this._utilsService.buildHttpOptions({
                    filters
                })
            )
            .pipe(map(response => response.data));
    }
}
