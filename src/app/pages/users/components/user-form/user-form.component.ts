import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Role, User } from '@auth/models';
import { AuthService } from '@auth/services';
import { MindTeamsRoutes } from '@core/models';
import { CustomValidationsService, UtilsService } from '@core/utils';
import { UserService } from '@pages/users/services';
import { DisabledService } from '@shared/services';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  module: string = '';
  title: string = '';
  isEdit: boolean = false;
  isLoading: boolean = false;
  clientLoading: boolean = false;
  userForm: FormGroup = new FormGroup({});
  userStatus: boolean = false;
  changePass: boolean = false;
  rolesList: Role[] = [];
  private _subscription: Subscription = new Subscription();

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _disabledService: DisabledService,
    private _utilsService: UtilsService,
    private _customValidationsService: CustomValidationsService
  ) {}

  ngOnInit() {
    this.module = this._activatedRoute.snapshot.data.module;
    this.title = this._activatedRoute.snapshot.data.title;
    this.isEdit = this._activatedRoute.snapshot.data.edit;
    this.rolesList = this.orderArray(
      this._activatedRoute.snapshot.data.roles,
      'label'
    );
    this._patchUserData();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  orderArray(array: any[], field: string = 'name'): any[] {
    return this._utilsService.orderArray(array, field);
  }

  goBack() {
    this._router.navigate([`/app/${MindTeamsRoutes.users}`]);
  }

  saveUser() {
    this.isLoading = true;
    if (!this.isEdit) {
      this._createUser();
    } else {
      this._updateUser();
    }
  }

  onChangeStatus(event: MatCheckboxChange) {
    const checked = event.checked;
    const user: User = this._activatedRoute.snapshot.data.user;
    this.isLoading = true;
    this._subscription = this._disabledService
      .disable('user', user.id)
      .subscribe(
        () => {
          this.isLoading = false;
          this.userStatus = checked;
          this._utilsService.successAlert(
            'El estado del usuario ha sido actualizado'
          );
        },
        () => {
          this.userStatus = !checked;
          this._handleError(
            'Error al intentar actualizar el estado del usuario'
          );
        }
      );
  }

  private _handleError(message: string = '') {
    this.isLoading = false;
    this._utilsService.showNotificationError(message);
  }

  private _patchUserData() {
    const user: User = this._activatedRoute.snapshot.data.user;
    this.userForm = this._formBuilder.group(
      {
        role_id: [this.isEdit ? user.role_id : null, Validators.required],

        name: [this.isEdit ? user.name : '', Validators.required],
        email: [
          {
            value: this.isEdit ? user.email : '',
            disabled: this.isEdit,
          },
        ],
        password: ['', [Validators.minLength(8)]],
        password_confirmation: ['', [Validators.minLength(8)]],
        disabled: [this.isEdit ? !user.disabled : false],
      },
      {
        validators: this._customValidationsService.checkMatchingPasswords(
          'password',
          'password_confirmation'
        ),
      }
    );
    this._loadStatus();
  }

  private _createUser() {
    this._subscription = this._userService
      .createUser({
        ...this.userForm.value,
      })
      .subscribe(
        () => {
          this.isLoading = false;
          this._utilsService.successAlert('Usuario creado');
          this.goBack();
        },
        () => {
          this._handleError('Error al crear el usuario');
        }
      );
  }

  private _updateUser() {
    const user: User = {
      ...this._activatedRoute.snapshot.data.user,
      ...this.userForm.value,
    };
    if (!this.changePass) {
      delete user.password;
      delete user.password_confirmation;
    }
    this._subscription = this._userService.updateUser(user).subscribe(
      () => {
        this.isLoading = false;
        this._utilsService.successAlert('Usuario actualizado');
        this.goBack();
      },
      () => {
        this._handleError('Error al actualizar el usuario');
      }
    );
  }

  private _loadStatus() {
    if (this.isEdit) {
      const user: User = this._activatedRoute.snapshot.data.user;
      this.userStatus = user.disabled ? false : true;
    } else {
      this.userStatus = true;
    }
  }
}
