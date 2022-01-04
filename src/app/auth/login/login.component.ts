import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@auth/models';
import { AuthService } from '@auth/services';
import { MindTeamsRoutes } from '@core/models';
import { UtilsService } from '@core/utils';
import { environment } from '@env/environment';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  showError: boolean = false;
  loading: boolean = false;
  loginForm: FormGroup = new FormGroup({});
  production: boolean = environment.production;
  private _subscription: Subscription = new Subscription();

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this._createFormGroup();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  closeAlert() {
    this.showError = false;
  }

  onLogin(): void {
    this.loading = true;
    this._subscription = this._authService
      .login(this.loginForm.value)
      .subscribe(
        (response) => {
          this._authService.setAccessToken(response.token);
          const identity = response.user;
          this._authService.loggedUser = {
            ...identity,
          } as User;
          this._utilsService.showNotificationSuccess(
            `Bienvenivo/a a MindTeams ${identity.name}!`
          );
          return this._utilsService.navigate([
            `/app/${MindTeamsRoutes.dashboard}`,
          ]);
        },
        () => {
          this.showError = true;
          this.loading = false;
          this.loginForm.patchValue({
            password: '',
          });
          const timeOut$ = setTimeout(() => {
            this.showError = false;
            clearTimeout(timeOut$);
          }, 5000);
        }
      );
  }

  private _createFormGroup() {
    this.loginForm = this._formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(3),
          Validators.pattern(/^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,10}$/),
        ]),
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
  }
}
