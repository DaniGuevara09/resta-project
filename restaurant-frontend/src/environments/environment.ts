import { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  name: 'default',
  tenantId: 'default',
  apiUrl: 'http://localhost:3000',
  keycloakUrl: 'http://localhost:8080',
  keycloakRealm: 'default-realm',
  keycloakClientId: 'default-app',
  theme: 'light'
};