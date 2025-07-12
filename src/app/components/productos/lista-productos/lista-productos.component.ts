import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgFor, CurrencyPipe } from '@angular/common';
import { Producto } from '../../../models/producto.model';
import { ProductosService } from '../../../services/productos/productos.service';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [NgFor, CurrencyPipe],
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit {
  productos: Producto[] = [];
  tipoProductoNombre = '';
  private route = inject(ActivatedRoute);
  private productosService = inject(ProductosService);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idTipo = Number(params.get('idTipoProducto'));
      this.productosService.obtenerActivos().subscribe({
        next: (todos) => {
          this.productos = todos.filter(p => p.idTipoProducto === idTipo);
          if (this.productos.length) {
            this.tipoProductoNombre = this.productos[0].nombreTipoProducto ?? '';
          } else {
            this.tipoProductoNombre = 'Sin productos';
          }
        },
        error: (error) => {
          console.error('Error al obtener productos:', error);
          this.productos = [];
          this.tipoProductoNombre = 'Error cargando productos';
        }
      });
    });
  }
}
