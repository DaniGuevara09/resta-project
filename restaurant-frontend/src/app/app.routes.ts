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
    path: '',
    loadComponent: () => import('./features/menu/menu.component')
      .then(m => m.MenuComponent)
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
  }
];