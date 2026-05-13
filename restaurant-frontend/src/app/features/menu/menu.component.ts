// src/app/features/login/login.component.ts
import { Component } from '@angular/core';
import { KeycloakAuthService } from '../../core/services/keycloak.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  styles: [`
    .login-wrapper {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-bg);
    }
    .login-card {
      background: var(--color-surface);
      padding: 3rem 2.5rem;
      border-radius: var(--border-radius);
      text-align: center;
      width: 100%;
      max-width: 380px;
    }
    h1 {
      color: var(--color-primary);
      margin-bottom: 0.5rem;
      font-size: 1.8rem;
    }
    p {
      color: var(--color-text-muted);
      margin-bottom: 2rem;
    }
    .btn-login {
      width: 100%;
      padding: 0.85rem;
      background: var(--color-primary);
      color: white;
      border: none;
      border-radius: var(--border-radius);
      font-size: 1rem;
      cursor: pointer;
      font-weight: 600;
      transition: opacity 0.2s;
    }
    .btn-login:hover { opacity: 0.88; }
    .divider {
      margin: 1.5rem 0;
      color: var(--color-text-muted);
      font-size: 0.85rem;
    }
    .btn-client {
      width: 100%;
      padding: 0.75rem;
      background: transparent;
      color: var(--color-primary);
      border: 1.5px solid var(--color-primary);
      border-radius: var(--border-radius);
      font-size: 0.95rem;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-client:hover { background: var(--color-surface); }
  `],
  template: `
    <div class="login-wrapper">
      <div class="login-card">
        <h1>{{ tenantName }}</h1>
        <p>Acceso para empleados</p>

        <button class="btn-login" (click)="loginEmpleado()">
          Iniciar sesión
        </button>

        <div class="divider">¿Eres cliente?</div>

        <button class="btn-client" (click)="entrarComoCliente()">
          Ver menú sin cuenta
        </button>
      </div>
    </div>
  `
})
export class MenuComponent {
  tenantName: string;

  constructor(
    private keycloak: KeycloakAuthService,
    private router: Router
  ) {
    this.tenantName = environment.name.toUpperCase();
  }

  loginEmpleado(): void {
    this.keycloak.login();  // redirige a Keycloak
  }

  entrarComoCliente(): void {
    this.router.navigate(['/']);  // va al menú público
  }
}