import { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  name: 'kfc',
  tenantId: 'kfc',
  apiUrl: 'http://localhost:8081',        // backend Python
  keycloakUrl: 'http://localhost:8082',
  keycloakRealm: 'kfc-realm',
  keycloakClientId: 'kfc-app',
  theme: 'light'
};