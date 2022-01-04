import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '@auth/services';
import { UtilsService } from '@core/utils';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private _auth: AuthService,
        private _utils: UtilsService
    ) {}

    canActivate(): boolean {
        if (this._auth.accessToken) {
            if (this._auth.loggedUser) {
                this._auth.setPermissionsToLoggedUser();
            }
            return true;
        }
        this._utils.navigate(['app/dashboard']);
    }
}
