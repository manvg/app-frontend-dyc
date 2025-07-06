import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgFor, CurrencyPipe } from '@angular/common';
import { Producto } from '../../../models/producto.model';
import { PRODUCTOS_MOCK } from '../../../data.mock';

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

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idTipo = Number(params.get('idTipoProducto'));
      this.productos = PRODUCTOS_MOCK.filter(p => p.idTipoProducto === idTipo);
      if (this.productos.length) {
        this.tipoProductoNombre = this.productos[0].nombreTipoProducto ?? '';
      } else {
        this.tipoProductoNombre = 'Sin productos';
      }
    });
  }
}
