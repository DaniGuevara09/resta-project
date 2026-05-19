import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-waiter',
  standalone: true,
  template: `
    <div style="padding:2rem; background:var(--color-bg); min-height:100vh; color:var(--color-text)">
      <h2 style="color:var(--color-primary)">Mesero</h2>
      <p>Pedidos listos para entregar</p>
      <button (click)="auth.logout()" style="margin-top:1rem;cursor:pointer">Cerrar sesión</button>
    </div>
  `
})
export class WaiterComponent {
  constructor(public auth: AuthService) {}
}