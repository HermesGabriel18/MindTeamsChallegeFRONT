import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MindTeamsRoutes } from '@core/models';
import { Project } from '@pages/projects/models';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
})
export class ProjectDetailComponent implements OnInit {
  module = '';
  title = '';
  project: Project = null;
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.module = this._activatedRoute.snapshot.data.module;
    this.title = this._activatedRoute.snapshot.data.title;
    this.project = this._activatedRoute.snapshot.data.project;
  }

  goBack() {
    this._router.navigate([`app/${MindTeamsRoutes.projects}`]);
  }
}
