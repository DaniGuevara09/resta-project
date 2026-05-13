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
    // Si ya está logueado, redirige directo
    if (this.authService.isLoggedIn()) this.redirectByRole();
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
        this.redirectByRole();
      },
      error: (err) => {
        this.loading  = false;
        this.errorMsg = err.status === 401
          ? 'Usuario o contraseña incorrectos'
          : 'Error al conectar con el servidor';
      }
    });
  }

  goToMenu(): void {
    this.router.navigate(['/']);
  }

  private redirectByRole(): void {
    const roles = this.authService.getRoles();
    if (roles.includes('ADMIN'))    { this.router.navigate(['/admin']);   return; }
    if (roles.includes('COCINERO')) { this.router.navigate(['/kitchen']); return; }
    if (roles.includes('MESERO'))   { this.router.navigate(['/waiter']);  return; }
    if (roles.includes('CAJERO'))   { this.router.navigate(['/billing']); return; }
    this.router.navigate(['/unauthorized']);
  }
}