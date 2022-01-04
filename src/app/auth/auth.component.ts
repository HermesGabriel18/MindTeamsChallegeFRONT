import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  template: `<div class="layout__auth">
    <router-outlet></router-outlet>
  </div> `,
  styles: [
    `
      .layout__auth {
        background: url(assets/img/cover.jpeg);
        background-size: cover;
        opacity: 0.8;
        background-repeat: no-repeat;
      }
    `,
  ],
})
export class AuthComponent {}
