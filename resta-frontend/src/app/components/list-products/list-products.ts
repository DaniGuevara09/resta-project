import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Producto, RestaurantService } from '../../services/restaurant';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [NgFor],
  templateUrl: './list-products.html'
})
export class ListProducts implements OnInit {
  public productos: Producto[] = [];

  constructor(
    private restaurantService: RestaurantService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.restaurantService.getProductos().subscribe({
      next: (result) => {
        this.productos = result;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Error al obtener los datos: ", err);
      }
    });
  }
}