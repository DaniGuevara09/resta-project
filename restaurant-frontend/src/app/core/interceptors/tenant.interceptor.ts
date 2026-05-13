// src/app/core/interceptors/tenant.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TenantService } from '../services/tenant.service';

export const tenantInterceptor: HttpInterceptorFn = (req, next) => {
  const tenantService = inject(TenantService);

  if (!req.url.startsWith(tenantService.apiUrl)) {
    return next(req);
  }

  const tenantReq = req.clone({
    setHeaders: {
      'X-Tenant-ID': tenantService.tenantId
    }
  });

  return next(tenantReq);
};