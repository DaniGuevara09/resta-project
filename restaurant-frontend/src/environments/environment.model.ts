// src/environments/environment.model.ts
export interface Environment {
  tenantId: string;
  name: string;
  apiUrl: string;
  theme: 'dark' | 'light';
  keycloakUrl: string;
  keycloakRealm: string;
  keycloakClientId: string;
  production: boolean;   // ← agregar este campo
}