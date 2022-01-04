import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MindTeamsRoutes } from '@core/models';
import { UtilsService } from '@core/utils';
import { Client } from '@pages/clients/models';
import { Project } from '@pages/projects/models';
import { TableData } from '@shared/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css'],
})
export class ClientDetailComponent implements OnInit, OnDestroy {
  module = '';
  title = '';
  client: Client = null;
  projectsList: Project[] = [];
  projectsTableData: TableData = null;
  private _subscriptions: Subscription = new Subscription();
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.module = this._activatedRoute.snapshot.data.module;
    this.title = this._activatedRoute.snapshot.data.title;
    this.client = this._activatedRoute.snapshot.data.client;
    this.projectsList = this._activatedRoute.snapshot.data.projects;
    this._generateRequestsTable();
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  goBack() {
    this._router.navigate([`app/${MindTeamsRoutes.clients}`]);
  }

  goToProject(idProject: string) {
    this._router.navigate([
      `/app/${MindTeamsRoutes.projects}/${MindTeamsRoutes.show}`,
      idProject,
    ]);
  }

  private _generateRequestsTable() {
    this.projectsTableData = {
      headerRow: ['Nombre', 'Estado del proyecto', 'Ver proyecto'],
      dataRows: this.projectsList,
    };
  }
}
