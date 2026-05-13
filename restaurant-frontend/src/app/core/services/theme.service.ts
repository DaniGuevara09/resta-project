import { Injectable } from '@angular/core';
import { TenantService } from './tenant.service';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  constructor(private tenantService: TenantService) {}

  // Llama esto desde AppComponent.ngOnInit()
  applyTheme(): void {
    const { theme, tenantId } = this.tenantService.config;
    const root = document.documentElement;

    // Agrega clase del tenant al <html> para estilos específicos
    root.classList.add(`tenant-${tenantId}`);

    // Agrega clase del tema (dark / light)
    root.classList.add(`theme-${theme}`);

    // Aplica variables CSS según el tenant
    this.applyTenantCSSVars(tenantId);
  }

  private applyTenantCSSVars(tenantId: string): void {
    const root = document.documentElement;

    const themes: Record<string, Record<string, string>> = {
      frisby: {
        '--color-primary':    '#E8593C',
        '--color-secondary':  '#F2A623',
        '--color-bg':         '#1a1a1a',
        '--color-surface':    '#2a2a2a',
        '--color-text':       '#ffffff',
        '--color-text-muted': '#aaaaaa',
        '--border-radius':    '12px',
        '--font-family':      '"Inter", sans-serif'
      },
      kfc: {
        '--color-primary':    '#E4002B',
        '--color-secondary':  '#F5F5F5',
        '--color-bg':         '#ffffff',
        '--color-surface':    '#f8f8f8',
        '--color-text':       '#1a1a1a',
        '--color-text-muted': '#666666',
        '--border-radius':    '6px',
        '--font-family':      '"Roboto", sans-serif'
      }
    };

    const vars = themes[tenantId];
    if (!vars) return;

    Object.entries(vars).forEach(([prop, value]) => {
      root.style.setProperty(prop, value);
    });
  }
}