import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SidebarItemsService, UtilsService } from '@core/utils';
import { AuthService } from '@auth/services';
import { MindTeamsRoutes } from '@core/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private listTitles: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
  private _subscription: Subscription = new Subscription();

  constructor(
    location: Location,
    private _element: ElementRef,
    private _router: Router,
    private _sidebarItemsService: SidebarItemsService,
    private _authService: AuthService,
    private _utilsService: UtilsService
  ) {
    this.location = location;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.listTitles = this._sidebarItemsService
      .getSidebarItems()
      .filter((menuItem) => !menuItem.class);
    const navbar: HTMLElement = this._element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this._router.events.subscribe((event) => {
      this.sidebarClose();
      var $layer: any = document.getElementsByClassName('close-layer')[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    body.classList.add('nav-open');

    this.sidebarVisible = true;
  }

  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    body.classList.remove('nav-open');
  }

  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    var $toggle = document.getElementsByClassName('navbar-toggler')[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const body = document.getElementsByTagName('body')[0];

    if (this.mobile_menu_visible == 1) {
      // $('html').removeClass('nav-open');
      body.classList.remove('nav-open');
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function () {
        $toggle.classList.remove('toggled');
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function () {
        $toggle.classList.add('toggled');
      }, 430);

      var $layer = document.createElement('div');
      $layer.setAttribute('class', 'close-layer');

      if (body.querySelectorAll('.main-panel')) {
        document.getElementsByClassName('main-panel')[0].appendChild($layer);
      } else if (body.classList.contains('off-canvas-sidebar')) {
        document
          .getElementsByClassName('wrapper-full-page')[0]
          .appendChild($layer);
      }

      setTimeout(function () {
        $layer.classList.add('visible');
      }, 100);

      $layer.onclick = function () {
        //asign a function
        body.classList.remove('nav-open');
        this.mobile_menu_visible = 0;
        $layer.classList.remove('visible');
        setTimeout(function () {
          $layer.remove();
          $toggle.classList.remove('toggled');
        }, 400);
      }.bind(this);

      body.classList.add('nav-open');
      this.mobile_menu_visible = 1;
    }
  }

  getTitle() {
    let title = this.location.prepareExternalUrl(this.location.path());

    if (title.charAt(0) === '#') {
      title = title.slice(1);
    }

    for (let item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === title) {
        return this.listTitles[item].title;
      }

      if (
        title.split('/')[2]?.includes(this.listTitles[item].path.split('/')[2])
      ) {
        return this.listTitles[item].title;
      }
    }
    return '';
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
    this._router.navigate([`app/${MindTeamsRoutes.dashboard}`]);
  }
}
