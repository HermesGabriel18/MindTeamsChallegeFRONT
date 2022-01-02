import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services';
import { ErrorType } from '@core/models';
import { UtilsService } from '@core/utils';
import { environment } from '@env/environment';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private _auth: AuthService,
    private _utilsService: UtilsService,
    private _router: Router
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (new RegExp(environment.apiUrl).test(request.url)) {
      if (this._auth.accessToken) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this._auth.accessToken}`,
          },
        });
      }
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === ErrorType.unauthorize) {
          if (!this._router.url.includes('login')) {
            this._auth.flushUser().then(() => {
              setTimeout(() => {
                this._utilsService.showNotificationError('Debes autenticarte');
              }, 500);
            });
          }
        }
        return throwError(request);
      })
    );
  }
}
