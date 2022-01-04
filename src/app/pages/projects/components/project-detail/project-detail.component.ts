import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@auth/models';
import { MindTeamsRoutes } from '@core/models';
import { UtilsService } from '@core/utils';
import { Assignment } from '@pages/assignments/models';
import { AssignmentService } from '@pages/assignments/services';
import { Project } from '@pages/projects/models';
import { TableData } from '@shared/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  module = '';
  title = '';
  project: Project = null;
  usersList: Assignment[] = [];
  usersTableData: TableData = null;
  private _subscription: Subscription = new Subscription();
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _assignmentService: AssignmentService,
    private _utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.module = this._activatedRoute.snapshot.data.module;
    this.title = this._activatedRoute.snapshot.data.title;
    this.project = this._activatedRoute.snapshot.data.project;
    this.usersList = this._activatedRoute.snapshot.data.users;
    this._generateUserTable();
  }

  ngOnDestroy() {}

  goBack() {
    this._router.navigate([`app/${MindTeamsRoutes.projects}`]);
  }

  goToUser(idUser: string) {
    this._router.navigate([
      `/app/${MindTeamsRoutes.users}/${MindTeamsRoutes.show}`,
      idUser,
    ]);
  }

  addUser() {
    this._subscription = this._assignmentService
      .createAssignment({
        user_id: Number('3'),
        project_id: this.project.id,
      })
      .subscribe(
        () => {
          this._loadUsers();
        },
        () => {
          this._handleError('Error al agregar al usuario');
        }
      );
  }

  deleteUser(idAssignment) {
    this._subscription = this._assignmentService
      .deleteAssignment(idAssignment)
      .subscribe(
        () => {
          this._loadUsers();
        },
        () => {
          this._handleError('Error al eliminar el usuario');
        }
      );
  }

  private _handleError(message: string = '') {
    this._utilsService.showNotificationError(message);
  }

  private _loadUsers() {
    this._subscription = this._assignmentService
      .getAllAssignments({
        filters: { project_id: this.project.id, with: ['user'] },
      })
      .subscribe(
        (assignments) => {
          this.usersList = assignments;
          this._generateUserTable();
        },
        () => this._handleError('Error al consultar el equipo del proyecto')
      );
  }

  private _generateUserTable() {
    this.usersTableData = {
      headerRow: ['Nombre', 'Estado del usuario', 'Acciones'],
      dataRows: this.usersList,
    };
  }
}
