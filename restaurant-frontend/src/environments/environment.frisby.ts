import { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  name: 'frisby',
  tenantId: 'frisby',
  apiUrl: 'http://localhost:3000',        // backend Node
  keycloakUrl: 'http://localhost:8082',
  keycloakRealm: 'frisby-realm',
  keycloakClientId: 'frisby-app',
  theme: 'dark'
};