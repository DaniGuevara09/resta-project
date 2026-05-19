// src/app/features/menu/menu.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { TenantService } from '../../core/services/tenant.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  products: Product[]         = [];
  filteredProducts: Product[] = [];
  loading  = true;
  error    = '';
  selectedCategory = 'Todos';
  categories: string[]        = ['Todos'];
  tenantName: string;

  constructor(
    private productService: ProductService,
    public  cartService: CartService,
    public  tenantService: TenantService,
    private router: Router
  ) {
    this.tenantName = tenantService.config.name.toUpperCase();
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (products) => {
        this.products = products.filter(p => p.available);

        // Extraer categorías únicas de los productos
        const cats = [...new Set(products.map(p => p.category).filter(Boolean))] as string[];
        this.categories = ['Todos', ...cats];

        this.filteredProducts = this.products;
        this.loading = false;
      },
      error: () => {
        this.error   = 'No se pudieron cargar los productos';
        this.loading = false;
      }
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.filteredProducts = category === 'Todos'
      ? this.products
      : this.products.filter(p => p.category === category);
  }

  addToCart(product: Product, event: Event): void {
    event.stopPropagation();
    this.cartService.add(product);
  }

  getQuantityInCart(productId: string): number {
    return this.cartService.items.find(i => i.product.id === productId)?.quantity ?? 0;
  }

  goHome():  void { this.router.navigate(['/']); }
  goToCart(): void { this.router.navigate(['/cart']); }
}