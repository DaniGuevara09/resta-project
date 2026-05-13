// src/app/features/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakAuthService } from '../../core/services/keycloak.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `<p>Redirigiendo...</p>`
})
export class DashboardComponent implements OnInit {

  constructor(
    private keycloak: KeycloakAuthService,
    private router:   Router
  ) {}

  ngOnInit(): void {
    const roles = this.keycloak.getRoles();

    if (roles.includes('ADMIN'))    { this.router.navigate(['/admin']);    return; }
    if (roles.includes('COCINERO')) { this.router.navigate(['/kitchen']);  return; }
    if (roles.includes('MESERO'))   { this.router.navigate(['/waiter']);   return; }
    if (roles.includes('CAJERO'))   { this.router.navigate(['/billing']);  return; }

    // Si no tiene ningún rol conocido
    this.router.navigate(['/unauthorized']);
  }
}