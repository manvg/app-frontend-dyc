import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { TipoProducto } from '../../../../models/tipo-producto.model';
import { TipoProductoService } from '../../../../services/tipo-producto/tipo-producto.service';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [NgFor],
  templateUrl: './lista-tipos-producto.component.html',
  styleUrls: ['./lista-tipos-producto.component.scss']
})
export class ListaTiposProductoComponent implements OnInit {
  tiposProducto: TipoProducto[] = [];

  constructor(
    private router: Router,
    private tipoProductoService: TipoProductoService
  ) {}

  ngOnInit(): void {
    this.tipoProductoService.obtenerTodos().subscribe({
      next: (tipos) => {
        this.tiposProducto = tipos;
      },
      error: (error) => {
        console.error('Error al obtener tipos de producto:', error);
        this.tiposProducto = [];
      }
    });
  }

  verModelos(tipo: TipoProducto) {
    this.router.navigate(['/productos', tipo.idTipoProducto]);
  }
}
