import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth/services';
import { MindTeamsRoutes, RouteInfo } from '@core/models';
import { SidebarItemsService, UtilsService } from '@core/utils';
import { Subscription } from 'rxjs';

declare const $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  menuItems: RouteInfo[];
  private _subscription: Subscription = new Subscription();

  constructor(
    private _sidebarItemsService: SidebarItemsService,
    private _authService: AuthService,
    private _utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.menuItems = this._sidebarItemsService
      .getSidebarItems()
      .filter((menuItem) => !menuItem.hidden);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  onLogOut(): void {
    this._subscription = this._authService.logout().subscribe(
      () => {
        this._authService.flushUser();
      },
      () => {
        this._utilsService.showNotificationError(
          'No se ha podido cerrar sesión'
        );
      }
    );
  }

  editProfile() {
    this._utilsService.navigate([`app/${MindTeamsRoutes.profile}`]);
  }
}
