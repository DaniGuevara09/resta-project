import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-billing',
  standalone: true,
  template: `
    <div style="padding:2rem; background:var(--color-bg); min-height:100vh; color:var(--color-text)">
      <h2 style="color:var(--color-primary)">Caja</h2>
      <p>Pedidos pendientes de facturar</p>
      <button (click)="auth.logout()" style="margin-top:1rem;cursor:pointer">Cerrar sesión</button>
    </div>
  `
})
export class BillingComponent {
  constructor(public auth: AuthService) {}
}