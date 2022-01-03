import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@auth/models';
import { AuthService } from '@auth/services';
import { MindTeamsRoutes } from '@core/models';
import { CustomValidationsService, UtilsService } from '@core/utils';
import { UserService } from '@pages/users/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  module = '';
  title = '';
  isLoading = false;
  profileForm: FormGroup = new FormGroup({});
  changePass = false;
  private _subscription: Subscription = new Subscription();
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _userService: UserService,
    private _utilsService: UtilsService,
    private _customValidationsService: CustomValidationsService
  ) {}

  ngOnInit() {
    this.module = this._activatedRoute.snapshot.data.module;
    this.title = this._activatedRoute.snapshot.data.title;
    this._patchProfileData();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  goHome() {
    this._router.navigate([`/app/${MindTeamsRoutes.dashboard}`]);
  }

  updateProfile() {
    this.isLoading = true;
    this._updateProfile();
  }

  private _handleError(message: string = '') {
    this.isLoading = false;
    this._utilsService.showNotificationError(message);
  }

  private _patchProfileData() {
    const user: User = this._activatedRoute.snapshot.data.user;
    this.profileForm = this._formBuilder.group(
      {
        role_id: [user.role_id, Validators.required],

        name: [user.name, Validators.required],
        email: [{ value: user.email, disabled: true }],
        password: ['', [Validators.minLength(8)]],
        password_confirmation: ['', [Validators.minLength(8)]],
      },
      {
        validators: this._customValidationsService.checkMatchingPasswords(
          'password',
          'password_confirmation'
        ),
      }
    );
  }

  private _updateProfile() {
    const user: User = {
      ...this._activatedRoute.snapshot.data.user,
      ...this.profileForm.value,
    };
    if (!this.changePass) {
      delete user.password;
      delete user.password_confirmation;
    }
    this._subscription = this._userService.updateUser(user).subscribe(
      (response) => {
        this._authService.loggedUser = {
          email: response.email,
          name: response.name,
          id: response.id,
          role_id: response.role_id,
        } as User;

        this.isLoading = false;
        this._utilsService.successAlert('Perfil actualizado');
      },
      () => {
        this._handleError('Error al actualizar el perfil');
      }
    );
  }
}
