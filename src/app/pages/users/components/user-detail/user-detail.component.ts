import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@auth/models';
import { MindTeamsRoutes } from '@core/models';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  module: string = '';
  title: string = '';
  user: User = null;
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.module = this._activatedRoute.snapshot.data.module;
    this.title = this._activatedRoute.snapshot.data.title;
    this.user = this._activatedRoute.snapshot.data.user;
  }

  goBack() {
    this._router.navigate([`app/${MindTeamsRoutes.users}`]);
  }
}
