import { Component } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  template: `
    <div style="padding:2rem; background:var(--color-bg); min-height:100vh; color:var(--color-text)">
      <h2 style="color:var(--color-primary)">Panel Admin</h2>
      <p>Bienvenido {{ auth.user$ | async | json }}</p>
      <button (click)="logout()" style="margin-top:1rem;cursor:pointer">Cerrar sesión</button>
    </div>
  `
})
export class AdminComponent {
  constructor(public auth: AuthService, private router: Router) {}
  logout() { this.auth.logout(); }
}