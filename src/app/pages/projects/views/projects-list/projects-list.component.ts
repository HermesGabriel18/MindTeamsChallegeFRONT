import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MindTeamsRoutes } from '@core/models';
import { UtilsService } from '@core/utils';
import { Project, ProjectFilter } from '@pages/projects/models';
import { ProjectService } from '@pages/projects/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css'],
})
export class ProjectsListComponent implements OnInit, OnDestroy {
  module = '';
  title = '';
  isLoading = false;
  dataSource = new MatTableDataSource<any>();
  projectsList: Project[] = [];
  projectsFilter: ProjectFilter = null;
  showFilter = false;
  private _subscription: Subscription = new Subscription();
  private _displayedColumns: string[] = ['name', 'client', 'status', 'actions'];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _projectService: ProjectService,
    private _utilsService: UtilsService
  ) {}

  get pageLength(): number {
    return this._projectService.meta ? this._projectService.meta.total : 0;
  }

  get pageSize(): number {
    return this._projectService.meta ? this._projectService.meta.per_page : 0;
  }

  get displayedColumns(): string[] {
    return this._displayedColumns;
  }

  ngOnInit() {
    this.module = this._activatedRoute.snapshot.data.module;
    this.title = this._activatedRoute.snapshot.data.title;
    this.projectsList = this._activatedRoute.snapshot.data.projects;
    this._loadDataSource();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  paginationEvent({ pageIndex, pageSize }) {
    this.getProjects({
      pageIndex,
      pageSize,
      filters: this.projectsFilter,
    });
  }

  onFilter(projectsFilter: ProjectFilter) {
    if (!projectsFilter) {
      this.projectsFilter = null;
      this.getProjects();
      return;
    }
    this.projectsFilter = projectsFilter;
    this.getProjects({ filters: this.projectsFilter });
  }

  addProject() {
    this._router.navigate([
      `/app/${MindTeamsRoutes.projects}/${MindTeamsRoutes.add}`,
    ]);
  }

  editProject(idProject: number) {
    this._router.navigate([
      `/app/${MindTeamsRoutes.projects}/${MindTeamsRoutes.edit}`,
      idProject,
    ]);
  }

  showProject(idProject: string) {
    this._router.navigate([
      `/app/${MindTeamsRoutes.projects}/${MindTeamsRoutes.show}`,
      idProject,
    ]);
  }

  deleteProject(idProject: string) {
    this._utilsService
      .confirmDelete('¿Estás seguro de eliminar este proyecto?')
      .then((result) => {
        if (result.isConfirmed) {
          this._deleteProject(idProject);
        }
      });
  }

  getProjects({ pageIndex = null, pageSize = null, filters = null } = {}) {
    this.isLoading = true;
    this._subscription = this._projectService
      .getAllProjects({
        pageIndex: pageIndex + 1,
        pageSize,
        filters: { ...filters, with: 'client' },
      })
      .subscribe(
        (projects) => {
          this.projectsList = projects;
          this._loadDataSource();
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
          this._handleError('Error al consultar el listado de proyectos');
        }
      );
  }

  private _handleError(message: string = '') {
    this.isLoading = false;
    this._utilsService.showNotificationError(message);
  }

  private _loadDataSource() {
    this.dataSource = new MatTableDataSource(this.projectsList);
  }

  private _deleteProject(idProject: string) {
    this.isLoading = true;
    this._subscription = this._projectService
      .deleteProject(idProject)
      .subscribe(
        () => {
          this._utilsService.successAlert('Proyecto eliminado');
          this.getProjects();
        },
        () => {
          this._handleError('Error al eliminar el proyecto');
        }
      );
  }
}
