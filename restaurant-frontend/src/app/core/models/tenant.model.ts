export interface TenantConfig {
  production: boolean;
  name: string;
  tenantId: string;
  apiUrl: string;
  keycloakUrl: string;
  keycloakRealm: string;
  keycloakClientId: string;
  theme: 'dark' | 'light';
}