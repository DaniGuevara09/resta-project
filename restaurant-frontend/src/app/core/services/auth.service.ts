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

  const body = [
    `grant_type=password`,
    `client_id=${encodeURIComponent(environment.keycloakClientId)}`,
    `username=${encodeURIComponent(username)}`,
    `password=${encodeURIComponent(password)}`,
    `scope=openid profile email`
  ].join('&');

  const headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  return this.http.post<TokenResponse>(url, body, { headers }).pipe(
    tap(res => {
      localStorage.setItem(this.TOKEN_KEY,   res.access_token);
      localStorage.setItem(this.REFRESH_KEY, res.refresh_token);
      const userInfo = this.parseToken(res.access_token);
      console.log('[AUTH] UserInfo parseado:', userInfo);  // ← confirma roles
      this.userSubject.next(userInfo);                     // ← actualiza el estado
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

  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;          // token malformado

    const payload = JSON.parse(atob(parts[1]));
    if (!payload.exp) return false;

    return payload.exp * 1000 > Date.now();        // verifica expiración
  } catch {
    // Si falla el parseo, borra el token corrupto
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
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