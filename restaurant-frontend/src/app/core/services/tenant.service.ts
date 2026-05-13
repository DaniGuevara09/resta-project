import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TenantConfig } from '../models/tenant.model';

@Injectable({ providedIn: 'root' })
export class TenantService {

  // BehaviorSubject para que cualquier componente
  // pueda suscribirse y reaccionar al config del tenant
  private configSubject = new BehaviorSubject<TenantConfig>(this.buildConfig());

  config$ = this.configSubject.asObservable();

  get config(): TenantConfig {
    return this.configSubject.getValue();
  }

  get apiUrl(): string {
    return this.config.apiUrl;
  }

  get tenantId(): string {
    return this.config.tenantId;
  }

  get theme(): 'dark' | 'light' {
    return this.config.theme;
  }

  private buildConfig(): TenantConfig {
    // El environment ya fue reemplazado por Angular en compilación
    // según la configuración que se usó (frisby / kfc)
    return {
      tenantId:        environment.tenantId,
      name:            environment.name,
      apiUrl:          environment.apiUrl,
      theme:           environment.theme,
      keycloakUrl:     environment.keycloakUrl,
      keycloakRealm:   environment.keycloakRealm,
      keycloakClientId: environment.keycloakClientId,
      production:       environment.production
    };
  }

  // Útil para validar que el subdominio actual coincide
  // con el tenant compilado (seguridad extra)
  validateSubdomain(): boolean {
    const hostname = window.location.hostname;       // frisby.miapp.com
    const subdomain = hostname.split('.')[0];         // frisby
    return subdomain === this.config.tenantId;
  }
}