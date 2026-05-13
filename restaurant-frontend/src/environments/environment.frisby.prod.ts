import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  name: 'frisby',
  tenantId: 'frisby',
  apiUrl: 'https://api.frisby.miapp.com',
  keycloakUrl: 'https://auth.miapp.com',
  keycloakRealm: 'frisby-realm',
  keycloakClientId: 'frisby-app',
  theme: 'dark'
};