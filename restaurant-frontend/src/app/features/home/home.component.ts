import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TenantService } from '../../core/services/tenant.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  tenantName: string;
  tagline: string;

  private taglines: Record<string, string> = {
    frisby: 'El sabor que enamora',
    kfc:    "Finger lickin' good",
    default: 'Bienvenido'
  };

  constructor(
    public tenantService: TenantService,
    private router: Router
  ) {
    this.tenantName = tenantService.config.name.toUpperCase();
    this.tagline    = this.taglines[tenantService.config.tenantId] ?? this.taglines['default'];
  }

  goToMenu():  void { this.router.navigate(['/menu']); }
  goToLogin(): void { this.router.navigate(['/login']); }
}