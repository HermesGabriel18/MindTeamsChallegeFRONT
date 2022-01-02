import { Injectable } from '@angular/core';
import { DisabledEndpoints } from '@core/models';
import { ApiService } from '@core/utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DisabledService {
    constructor(private _apiService: ApiService) {}

    disable(entity: string, id: number): Observable<any> {
        return this._apiService
            .put(DisabledEndpoints[entity].replace(':id', id))
            .pipe(map(response => response.data));
    }
}
