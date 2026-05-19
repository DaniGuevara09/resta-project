// src/app/core/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {

  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  get items(): CartItem[] { return this.itemsSubject.getValue(); }

  get totalItems(): number {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  }

  get totalPrice(): number {
    return this.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  }

  add(product: Product): void {
    const current = this.items;
    const existing = current.find(i => i.product.id === product.id);

    if (existing) {
      existing.quantity++;
      this.itemsSubject.next([...current]);
    } else {
      this.itemsSubject.next([...current, { product, quantity: 1 }]);
    }
  }

  remove(productId: string): void {
    const current = this.items.filter(i => i.product.id !== productId);
    this.itemsSubject.next(current);
  }

  decrease(productId: string): void {
    const current = this.items;
    const item = current.find(i => i.product.id === productId);
    if (!item) return;

    if (item.quantity === 1) {
      this.remove(productId);
    } else {
      item.quantity--;
      this.itemsSubject.next([...current]);
    }
  }

  clear(): void { this.itemsSubject.next([]); }
}