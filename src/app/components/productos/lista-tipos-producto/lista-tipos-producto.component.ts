import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { TipoProducto } from '../../../models/tipo-producto.model';
import { TIPOS_PRODUCTO } from '../../../data.mock';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [NgFor],
  templateUrl: './lista-tipos-producto.component.html',
  styleUrls: ['./lista-tipos-producto.component.scss']
})
export class ListaTiposProductoComponent  {
  tiposProducto = TIPOS_PRODUCTO;

  constructor(private router: Router) {}

  verModelos(tipo: TipoProducto) {
    this.router.navigate(['/productos', tipo.idTipoProducto]);
  }
}
