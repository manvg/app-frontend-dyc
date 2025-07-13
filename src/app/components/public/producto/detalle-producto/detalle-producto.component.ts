import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Producto } from '../../../../models/producto.model';
import { NgIf, CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { ProductosService } from '../../../../services/productos/productos.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss'],
  standalone: true,
  imports: [NgIf, CurrencyPipe, RouterModule]
})
export class DetalleProductoComponent implements OnInit, OnDestroy {
  producto?: Producto;
  loading = false;
  error?: string;
  private paramSub?: Subscription;
  private productoSub?: Subscription;

  private route = inject(ActivatedRoute);
  private productosService = inject(ProductosService);

  ngOnInit(): void {
    this.paramSub = this.route.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('idProducto'));
      if (id) {
        this.loading = true;
        this.productoSub = this.productosService.obtenerPorId(id).subscribe({
          next: producto => {
            this.producto = producto;
            this.loading = false;
            this.error = undefined;
          },
          error: err => {
            this.producto = undefined;
            this.loading = false;
            this.error = 'No se pudo cargar el producto.';
          }
        });
      } else {
        this.error = 'ID de producto inválido';
      }
    });
  }

  ngOnDestroy(): void {
    this.paramSub?.unsubscribe();
    this.productoSub?.unsubscribe();
  }
}
