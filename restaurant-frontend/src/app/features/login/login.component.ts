// src/app/features/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TenantService } from '../../core/services/tenant.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username    = '';
  password    = '';
  loading     = false;
  errorMsg    = '';
  showPass    = false;

  tenant: string;

constructor(
  private authService: AuthService,
  private tenantService: TenantService,
  private router: Router
) {
  this.tenant = this.tenantService.config.name;

  // Solo redirige si está logueado Y tiene un rol conocido
  if (this.authService.isLoggedIn()) {
    const roles = this.authService.getRoles();
    const tieneRol = ['admin','chef','waiter','cashier'].some(r => roles.includes(r));
    if (tieneRol) {
      this.redirectByRole();
    } else {
      // Token existe pero sin rol válido — limpiar y quedarse en login
      this.authService.logout();
    }
  }
}

  onSubmit(): void {
  if (!this.username.trim() || !this.password.trim()) {
    this.errorMsg = 'Completa todos los campos';
    return;
  }

  this.loading  = true;
  this.errorMsg = '';

  this.authService.login(this.username.trim(), this.password).subscribe({
    next: () => {
      this.loading = false;
      // Pequeño delay para que el userSubject se actualice antes de leer roles
      setTimeout(() => this.redirectByRole(), 100);
    },
    error: (err) => {
      this.loading  = false;
      this.errorMsg = err.status === 401
        ? 'Usuario o contraseña incorrectos'
        : `Error ${err.status}: ${err.message}`;
    }
  });
}

  goToMenu(): void {
    this.router.navigate(['/']);
  }

  private redirectByRole(): void {
    const roles = this.authService.getRoles();
    if (roles.includes('admin'))    { this.router.navigate(['/admin']);   return; }
    if (roles.includes('chef')) { this.router.navigate(['/kitchen']); return; }
    if (roles.includes('waiter'))   { this.router.navigate(['/waiter']);  return; }
    if (roles.includes('cashier'))   { this.router.navigate(['/billing']); return; }
    this.router.navigate(['/unauthorized']);
  }
}