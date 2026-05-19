// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () => import('./features/home/home.component')
      .then(m => m.HomeComponent)
  },

  // ── CLIENTE (sin login) ──────────────────────────────────────
  {
    path: 'menu',
    loadComponent: () => import('./features/menu/menu.component')
      .then(m => m.MenuComponent)
  },

  {
  path: 'cart',
  loadComponent: () => import('./features/cart/cart.component')
    .then(m => m.CartComponent)
},

  // ── LOGIN (redirige a Keycloak) ───────────────────────────────
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component')
      .then(m => m.LoginComponent)
  },

  // ── DASHBOARD (decide a dónde ir según el rol) ────────────────
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./features/dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  },
  {
    path: 'kitchen',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['chef'] },
    loadComponent: () => import('./features/kitchen/kitchen.component')
      .then(m => m.KitchenComponent)
  },
  {
    path: 'waiter',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['waiter'] },
    loadComponent: () => import('./features/waiter/waiter.component')
      .then(m => m.WaiterComponent)
  },
  {
    path: 'billing',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['cashier'] },
    loadComponent: () => import('./features/billing/billing.component')
      .then(m => m.BillingComponent)
  },
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] },
    loadComponent: () => import('./features/admin/admin.component')
      .then(m => m.AdminComponent)
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./features/unauthorized/unauthorized.component')
      .then(m => m.UnauthorizedComponent)
  }
];