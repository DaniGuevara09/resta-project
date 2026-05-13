import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TenantService } from '../services/tenant.service';

@Injectable({ providedIn: 'root' })
export class TenantGuard implements CanActivate {

  constructor(
    private tenantService: TenantService,
    private router: Router
  ) {}

  canActivate(): boolean {
    // En producción, valida que el subdominio coincida con el tenant compilado
    if (this.tenantService.config.production && !this.tenantService.validateSubdomain()) {
      this.router.navigate(['/not-found']);
      return false;
    }
    return true;
  }
}