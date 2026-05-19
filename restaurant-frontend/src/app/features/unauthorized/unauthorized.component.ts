import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  template: `
    <div style="padding:2rem; background:var(--color-bg); min-height:100vh;
                color:var(--color-text); display:flex; flex-direction:column;
                align-items:center; justify-content:center">
      <h2 style="color:var(--color-primary)">Sin permisos</h2>
      <p style="margin:1rem 0; color:var(--color-text-muted)">
        No tienes acceso a esta sección
      </p>
      <button (click)="clearAndLogin()" style="cursor:pointer; padding:8px 20px">
        Volver al login
      </button>
    </div>
  `
})
export class UnauthorizedComponent {
  constructor(private auth: AuthService, private router: Router) {}

  clearAndLogin(): void {
    this.auth.logout();  // limpia localStorage y va a /login
  }
}