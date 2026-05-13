// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export interface UserInfo {
  username: string;
  fullName: string;
  email: string;
  roles: string[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly TOKEN_KEY    = 'access_token';
  private readonly REFRESH_KEY  = 'refresh_token';

  private userSubject = new BehaviorSubject<UserInfo | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Si hay token guardado al iniciar, reconstruye el usuario
    const token = this.getToken();
    if (token) this.userSubject.next(this.parseToken(token));
  }

  // ── LOGIN ────────────────────────────────────────────────────────
  login(username: string, password: string): Observable<TokenResponse> {
    const url = `${environment.keycloakUrl}/realms/${environment.keycloakRealm}/protocol/openid-connect/token`;

    // Keycloak ROPC requiere x-www-form-urlencoded, no JSON
    const body = new URLSearchParams({
      grant_type:    'password',
      client_id:     environment.keycloakClientId,
      username,
      password,
      scope:         'openid profile email'
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<TokenResponse>(url, body.toString(), { headers }).pipe(
      tap(res => {
        // Guarda los tokens y actualiza el estado del usuario
        localStorage.setItem(this.TOKEN_KEY,   res.access_token);
        localStorage.setItem(this.REFRESH_KEY, res.refresh_token);
        this.userSubject.next(this.parseToken(res.access_token));
      })
    );
  }

  // ── LOGOUT ───────────────────────────────────────────────────────
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  // ── TOKEN ────────────────────────────────────────────────────────
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    // Verifica que el token no haya expirado
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  getRoles(): string[] {
    return this.userSubject.getValue()?.roles ?? [];
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  // ── PARSEO DEL JWT ───────────────────────────────────────────────
  private parseToken(token: string): UserInfo {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      username: payload.preferred_username ?? '',
      fullName: payload.name ?? '',
      email:    payload.email ?? '',
      roles:    payload.realm_access?.roles ?? []
    };
  }
}