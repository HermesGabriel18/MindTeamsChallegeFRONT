import { Injectable } from '@angular/core';
import { AuthResponse, RoleId, User } from '@auth/models';
import {
  adminPrivileges,
  regularPrivileges,
  superAdminPrivileges,
} from '@core/data';
import { AuthEndpoints } from '@core/models';
import { ApiService, UtilsService } from '@core/utils';
import { environment } from '@env/environment';
import { AES, enc } from 'crypto-js';
import { NgxRolesService } from 'ngx-permissions';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userSubject$: BehaviorSubject<User>;
  private _keyUser: string;
  private _userData: string;
  constructor(
    private _apiService: ApiService,
    private _ngxRoles: NgxRolesService,
    private _utilsService: UtilsService
  ) {
    this._userSubject$ = new BehaviorSubject<User>(this.loggedUser);
  }

  get LSKey(): string {
    return localStorage.getItem('user');
  }

  get accessToken(): string {
    return localStorage.getItem('token');
  }

  get loggedUser(): User {
    this._keyUser = this.LSKey;
    let user: User;
    if (localStorage.getItem(this._keyUser)) {
      user = this._decryptUser();
    }
    return user;
  }

  get userObservable() {
    return this._userSubject$;
  }

  get isSuperAdmin(): boolean {
    return this._ngxRoles.getRole(String(RoleId.SUPER_ADMIN)) ? true : false;
  }

  get isAdmin(): boolean {
    return this._ngxRoles.getRole(String(RoleId.ADMIN)) ? true : false;
  }

  get isRegular(): boolean {
    return this._ngxRoles.getRole(String(RoleId.REGULAR)) ? true : false;
  }

  get isInternal(): boolean {
    return this.isSuperAdmin || this.isAdmin;
  }

  get isExternal(): boolean {
    return this.isRegular;
  }

  set loggedUser(userData: User) {
    if (this.LSKey && localStorage.getItem('user')) {
      localStorage.removeItem(this.LSKey);
      localStorage.removeItem('user');
    }
    this._encryptUser(userData);
    this._userSubject$.next(userData);
  }

  setAccessToken(token: string): void {
    localStorage.setItem('token', token);
  }

  login(data): Observable<AuthResponse> {
    return this._apiService
      .post(AuthEndpoints.login, data)
      .pipe(map((response) => response.data));
  }

  flushUser(): Promise<boolean> {
    localStorage.removeItem('token');
    localStorage.removeItem(this.LSKey);
    localStorage.removeItem('user');
    this._userSubject$.next(null);
    this._ngxRoles.flushRolesAndPermissions();
    return this._utilsService.navigate(['/']);
  }

  logout(): Observable<AuthResponse> {
    const { email, password } = this.loggedUser;
    return this._apiService
      .post(AuthEndpoints.logout, { email, password })
      .pipe(map((response) => response.data));
  }

  setPermissionsToLoggedUser() {
    if (this.loggedUser) {
      let permissions: string[];
      switch (this.loggedUser.role_id) {
        case RoleId.SUPER_ADMIN:
          permissions = superAdminPrivileges;
          break;
        case RoleId.ADMIN:
          permissions = adminPrivileges;
          break;
        case RoleId.REGULAR:
          permissions = regularPrivileges;
          break;
          break;
        default:
          permissions = [];
          break;
      }
      this._ngxRoles.addRoleWithPermissions(
        String(this.loggedUser.role_id),
        permissions
      );
    }
  }

  private _encryptUser(userData: User) {
    this._keyUser = AES.encrypt('user', environment.seed).toString();
    this._userData = AES.encrypt(
      JSON.stringify(userData),
      environment.seed
    ).toString();

    localStorage.setItem('user', this._keyUser);
    localStorage.setItem(this._keyUser, this._userData);
  }

  private _decryptUser(): User {
    const decrypted = AES.decrypt(
      localStorage.getItem(this._keyUser),
      environment.seed
    ).toString(enc.Utf8);

    return JSON.parse(decrypted);
  }
}
