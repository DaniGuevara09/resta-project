// src/app/core/services/keycloak.service.ts
import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class KeycloakAuthService {

  private keycloak: Keycloak;

  constructor() {
    this.keycloak = new Keycloak({
      url:      environment.keycloakUrl,
      realm:    environment.keycloakRealm,
      clientId: environment.keycloakClientId
    });
  }

  // Se llama en APP_INITIALIZER — bloquea el arranque hasta que Keycloak responda
  async init(): Promise<void> {
    await this.keycloak.init({
      onLoad:           'check-sso',   // no fuerza login, solo chequea si ya hay sesión
      silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
      pkceMethod:       'S256',
      checkLoginIframe: false
    });
  }

  // Redirige a la pantalla de login de Keycloak
  login(): void {
    this.keycloak.login({
      redirectUri: window.location.origin + '/dashboard'
    });
  }

  logout(): void {
    this.keycloak.logout({
      redirectUri: window.location.origin
    });
  }

  // El token JWT para enviarlo en los requests HTTP
  getToken(): string | undefined {
    return this.keycloak.token;
  }

  // Refresca el token si está próximo a vencer
  async refreshToken(): Promise<void> {
    await this.keycloak.updateToken(60); // refresca si vence en menos de 60 segundos
  }

  isLoggedIn(): boolean {
    return !!this.keycloak.authenticated;
  }

  // Obtiene los roles del realm asignados al usuario
  getRoles(): string[] {
    return this.keycloak.realmAccess?.roles ?? [];
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  // Datos del usuario logueado
  getUsername(): string {
    return this.keycloak.tokenParsed?.['preferred_username'] ?? '';
  }

  getFullName(): string {
    return this.keycloak.tokenParsed?.['name'] ?? '';
  }

  getEmail(): string {
    return this.keycloak.tokenParsed?.['email'] ?? '';
  }
}