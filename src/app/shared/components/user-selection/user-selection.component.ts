import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleId, User } from '@auth/models';
import { UtilsService } from '@core/utils';
import { UserService } from '@pages/users/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.css'],
})
export class UserSelectionComponent implements OnInit, OnDestroy {
  isLoading = false;
  selectLoading = false;
  userForm: FormGroup = new FormGroup({});
  usersList: User[] = [];
  bufferSize = 15;
  numberOfItemsFromEndBeforeFetchingMore = 5;
  private _subscription: Subscription = new Subscription();
  constructor(
    public dialogRef: MatDialogRef<UserSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _utilsService: UtilsService
  ) {}

  get usersTotal(): number {
    return this._userService.meta ? this._userService.meta.total : 0;
  }

  ngOnInit(): void {
    this._createUserForm();
    this._loadSelectData();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  onScrollToEnd() {
    this._loadUsers();
  }

  onScrollUsers({ end }) {
    if (this.selectLoading || this.usersTotal <= this.usersList.length) {
      return;
    }

    if (
      end + this.numberOfItemsFromEndBeforeFetchingMore >=
      this.usersList.length
    ) {
      this._loadUsers();
    }
  }

  addUser() {
    this.isLoading = true;
    this.dialogRef.close(this.userForm.value);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  private _handleError(message: string = '') {
    this._utilsService.showNotificationError(message);
  }

  private _createUserForm() {
    this.userForm = this._formBuilder.group({
      id: [null, Validators.required],
    });
  }

  private _loadSelectData() {
    this.selectLoading = true;
    this._subscription = this._userService
      .getAllUsers({
        filters: {
          role_id: RoleId.REGULAR,
        },
      })
      .subscribe(
        (users) => {
          this.usersList = users;
          this.selectLoading = false;
        },
        () => {
          this.selectLoading = false;
          this._handleError('Error al consultar los usuarios');
          this.dialogRef.close();
        }
      );
  }

  private _loadUsers() {
    this.selectLoading = true;
    this._subscription = this._userService
      .getAllUsers({
        pageSize: this.usersList.length + this.bufferSize,
      })
      .subscribe(
        (users: User[]) => {
          this.selectLoading = false;
          this.usersList = users;
        },
        () => {
          this.selectLoading = false;
          this.usersList = [];
          this._handleError('Error al cargar los usuarios');
        }
      );
  }
}
