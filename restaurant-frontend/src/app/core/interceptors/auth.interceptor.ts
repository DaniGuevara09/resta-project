// src/app/core/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TenantService } from '../services/tenant.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth   = inject(AuthService);
  const tenant = inject(TenantService);

  if (!req.url.startsWith(tenant.apiUrl)) return next(req);

  const token = auth.getToken();
  if (!token) return next(req);  // cliente sin login pasa igual

  return next(req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  }));
};