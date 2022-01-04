import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Role, User } from '@auth/models';
import { AuthService } from '@auth/services';
import { MindTeamsRoutes } from '@core/models';
import { UtilsService } from '@core/utils';
import { UserFilter } from '@pages/users/models';
import { UserService } from '@pages/users/services';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  module = '';
  title = '';
  isLoading = false;
  dataSource = new MatTableDataSource<any>();
  usersList: User[] = [];
  rolesList: Role[] = [];
  usersFilter: UserFilter = null;
  showFilter = false;
  private _subscription: Subscription = new Subscription();
  private _displayedColumns: string[] = [
    'name',
    'email',
    'role_id',
    'status',
    'actions',
  ];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _userService: UserService,
    private _utilsService: UtilsService
  ) {}

  get loggedUser(): User {
    return this._authService.loggedUser;
  }

  get pageLength(): number {
    return this._userService.meta ? this._userService.meta.total : 0;
  }

  get pageSize(): number {
    return this._userService.meta ? this._userService.meta.per_page : 0;
  }

  get displayedColumns(): string[] {
    return this._displayedColumns;
  }

  ngOnInit() {
    this.module = this._activatedRoute.snapshot.data.module;
    this.title = this._activatedRoute.snapshot.data.title;
    this.usersList = this._activatedRoute.snapshot.data.users;
    this.rolesList = this._activatedRoute.snapshot.data.roles;
    this._loadDataSource();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  showRoleName(role_id: number): string {
    const roleFound = this.rolesList.find((role) => role.id === role_id);
    return roleFound?.label || 'Rol desconocido';
  }

  paginationEvent({ pageIndex, pageSize }) {
    this.getUsers({
      pageIndex,
      pageSize,
      filters: this.usersFilter,
    });
  }

  onFilter(usersFilter: UserFilter) {
    if (!usersFilter) {
      this.usersFilter = null;
      this.getUsers();
      return;
    }
    this.usersFilter = usersFilter;
    this.getUsers({ filters: this.usersFilter });
  }

  addUser() {
    this._router.navigate([
      `/app/${MindTeamsRoutes.users}/${MindTeamsRoutes.add}`,
    ]);
  }

  editUser(idUser: number) {
    if (idUser === this.loggedUser.id) {
      this._router.navigate([`/app/${MindTeamsRoutes.profile}`]);
    } else {
      this._router.navigate([
        `/app/${MindTeamsRoutes.users}/${MindTeamsRoutes.edit}`,
        idUser,
      ]);
    }
  }

  showUser(idUser: string) {
    this._router.navigate([
      `/app/${MindTeamsRoutes.users}/${MindTeamsRoutes.show}`,
      idUser,
    ]);
  }

  deleteUser(idUser: number) {
    if (idUser === this.loggedUser.id) {
      this._utilsService.errorAlert('No puedes eliminar tu usuario');
    } else {
      this._utilsService
        .confirmDelete('¿Estás seguro de eliminar este usuario?')
        .then((result) => {
          if (result.isConfirmed) {
            this._deleteUser(idUser);
          }
        });
    }
  }

  getUsers({ pageIndex = null, pageSize = null, filters = null } = {}) {
    this.isLoading = true;
    this._subscription = this._userService
      .getAllUsers({
        pageIndex: pageIndex + 1,
        pageSize,
        filters,
      })
      .subscribe(
        (users) => {
          this.usersList = users;
          this._loadDataSource();
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
          this._handleError('Error al consultar el listado de usuarios');
        }
      );
  }

  private _handleError(message: string = '') {
    this.isLoading = false;
    this._utilsService.showNotificationError(message);
  }

  private _loadDataSource() {
    this.dataSource = new MatTableDataSource(this.usersList);
  }

  private _deleteUser(idUser: number) {
    this.isLoading = true;
    this._subscription = this._userService.deleteUser(idUser).subscribe(
      () => {
        this._utilsService.successAlert('Usuario eliminado');
        this.getUsers();
      },
      () => {
        this._handleError('Error al eliminar el usuario');
      }
    );
  }
}
