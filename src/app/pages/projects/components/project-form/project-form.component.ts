import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { MindTeamsRoutes } from '@core/models';
import { UtilsService } from '@core/utils';
import { Client } from '@pages/clients/models';
import { ClientService } from '@pages/clients/services';
import { Project } from '@pages/projects/models';
import { ProjectService } from '@pages/projects/services';
import { DisabledService } from '@shared/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
})
export class ProjectFormComponent implements OnInit, OnDestroy {
  module = '';
  title = '';
  isEdit = false;
  isLoading = false;
  clientsLoading = false;
  projectForm: FormGroup = new FormGroup({});
  projectStatus = false;
  clientsList: Client[] = [];
  bufferSize = 15;
  numberOfItemsFromEndBeforeFetchingMore = 5;
  private _subscription: Subscription = new Subscription();

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _projectService: ProjectService,
    private _disabledService: DisabledService,
    private _clientService: ClientService,
    private _utilsService: UtilsService
  ) {}

  get clientsTotal(): number {
    return this._clientService.meta ? this._clientService.meta.total : 0;
  }

  ngOnInit() {
    this.module = this._activatedRoute.snapshot.data.module;
    this.title = this._activatedRoute.snapshot.data.title;
    this.isEdit = this._activatedRoute.snapshot.data.edit;
    this.clientsList = this.orderArray(
      this._activatedRoute.snapshot.data.clients,
      'label'
    );
    this._patchProjectData();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  orderArray(array: any[], field: string = 'name'): any[] {
    return this._utilsService.orderArray(array, field);
  }

  goBack() {
    this._router.navigate([`/app/${MindTeamsRoutes.projects}`]);
  }

  onScrollToEnd() {
    this._loadClients();
  }

  onScrollClients({ end }) {
    if (this.clientsLoading || this.clientsTotal <= this.clientsList.length) {
      return;
    }

    if (
      end + this.numberOfItemsFromEndBeforeFetchingMore >=
      this.clientsList.length
    ) {
      this._loadClients();
    }
  }

  saveProject() {
    this.isLoading = true;
    if (!this.isEdit) {
      this._createProject();
    } else {
      this._updateProject();
    }
  }

  onChangeStatus(event: MatCheckboxChange) {
    const checked = event.checked;
    const project: Project = this._activatedRoute.snapshot.data.project;
    this.isLoading = true;
    this._subscription = this._disabledService
      .disable('project', project.id)
      .subscribe(
        () => {
          this.isLoading = false;
          this.projectStatus = checked;
          this._utilsService.successAlert(
            'El estado del proyecto ha sido actualizado'
          );
        },
        () => {
          this.projectStatus = !checked;
          this._handleError(
            'Error al intentar actualizar el estado del proyecto'
          );
        }
      );
  }

  private _handleError(message: string = '') {
    this.isLoading = false;
    this._utilsService.showNotificationError(message);
  }

  private _patchProjectData() {
    const project: Project = this._activatedRoute.snapshot.data.project;
    this.projectForm = this._formBuilder.group({
      client_id: [this.isEdit ? project.client_id : null, Validators.required],
      name: [this.isEdit ? project.name : '', Validators.required],
    });
    console.log(this.projectForm.value);
    this._loadStatus();
  }

  private _createProject() {
    this._subscription = this._projectService
      .createProject({
        ...this.projectForm.value,
      })
      .subscribe(
        () => {
          this.isLoading = false;
          this._utilsService.successAlert('Proyecto creado');
          this.goBack();
        },
        () => {
          this._handleError('Error al crear el proyecto');
        }
      );
  }

  private _updateProject() {
    const project: Project = {
      ...this._activatedRoute.snapshot.data.project,
      ...this.projectForm.value,
    };
    this._subscription = this._projectService.updateProject(project).subscribe(
      () => {
        this.isLoading = false;
        this._utilsService.successAlert('Proyecto actualizado');
        this.goBack();
      },
      () => {
        this._handleError('Error al actualizar el proyecto');
      }
    );
  }

  private _loadClients() {
    this.clientsLoading = true;
    this._subscription = this._clientService
      .getAllClients({
        pageSize: this.clientsList.length + this.bufferSize,
      })
      .subscribe(
        (clients: Client[]) => {
          this.clientsLoading = false;
          this.clientsList = clients;
        },
        () => {
          this.clientsLoading = false;
          this.clientsList = [];
          this._handleError('Error al cargar los usuarios');
        }
      );
  }

  private _loadStatus() {
    if (this.isEdit) {
      const project: Project = this._activatedRoute.snapshot.data.project;
      this.projectStatus = project.disabled ? false : true;
    } else {
      this.projectStatus = true;
    }
  }
}
