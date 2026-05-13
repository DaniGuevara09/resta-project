import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  name: 'kfc',
  tenantId: 'kfc',
  apiUrl: 'https://api.kfc.miapp.com',
  keycloakUrl: 'https://auth.miapp.com',
  keycloakRealm: 'kfc-realm',
  keycloakClientId: 'kfc-app',
  theme: 'light'
};