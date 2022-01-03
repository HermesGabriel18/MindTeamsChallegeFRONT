import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { MindTeamsRoutes } from '@core/models';
import { UtilsService } from '@core/utils';
import { Client } from '@pages/clients/models';
import { ClientService } from '@pages/clients/services';
import { DisabledService } from '@shared/services';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
})
export class ClientFormComponent implements OnInit, OnDestroy {
  module = '';
  title = '';
  isEdit = false;
  isLoading = false;
  clientForm: FormGroup = new FormGroup({});
  clientStatus = false;
  private _subscription: Subscription = new Subscription();
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _clientService: ClientService,
    private _disabledService: DisabledService,
    private _utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.module = this._activatedRoute.snapshot.data.module;
    this.title = this._activatedRoute.snapshot.data.title;
    this.isEdit = this._activatedRoute.snapshot.data.edit;
    this._patchClientData();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  goBack() {
    this._router.navigate([`/app/${MindTeamsRoutes.clients}`]);
  }

  orderArray(array: any[], field: string = 'name'): any[] {
    return this._utilsService.orderArray(array, field);
  }

  onChangeStatus(event: MatCheckboxChange) {
    const checked = event.checked;
    const client: Client = this._activatedRoute.snapshot.data.client;
    this.isLoading = true;
    this._subscription = this._disabledService
      .disable('client', client.id)
      .subscribe(
        () => {
          this.isLoading = false;
          this.clientStatus = checked;
          this._utilsService.successAlert(
            'El estado del cliente ha sido actualizado'
          );
        },
        () => {
          this.clientStatus = !checked;
          this._handleError(
            'Error al intentar actualizar el estado del cliente'
          );
        }
      );
  }

  saveClient() {
    this.isLoading = true;
    if (!this.isEdit) {
      this._createClient();
    } else {
      this._updateClient();
    }
  }

  private _handleError(message: string = '') {
    this.isLoading = false;
    this._utilsService.showNotificationError(message);
  }

  private _patchClientData() {
    const client: Client = this._activatedRoute.snapshot.data.client;
    this.clientForm = this._formBuilder.group({
      name: [this.isEdit ? client.name : '', Validators.required],
    });
    this._loadStatus();
  }

  private _createClient() {
    this._subscription = this._clientService
      .createClient({ ...this.clientForm.value })
      .subscribe(
        () => {
          this.isLoading = false;
          this._utilsService.successAlert('Cliente creado');
          this.goBack();
        },
        () => {
          this._handleError('Error al crear el cliente');
        }
      );
  }

  private _updateClient() {
    const client: Client = {
      ...this._activatedRoute.snapshot.data.client,
      ...this.clientForm.value,
    };
    this._subscription = this._clientService.updateClient(client).subscribe(
      () => {
        this.isLoading = false;
        this._utilsService.successAlert('Cliente actualizado');
        this.goBack();
      },
      () => {
        this._handleError('Error al actualizar el cliente');
      }
    );
  }

  private _loadStatus() {
    if (this.isEdit) {
      const client: Client = this._activatedRoute.snapshot.data.client;
      this.clientStatus = client.disabled ? false : true;
    } else {
      this.clientStatus = true;
    }
  }
}
