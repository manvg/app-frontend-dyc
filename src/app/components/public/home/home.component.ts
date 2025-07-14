import { Component, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { ServicioDestacadoComponent } from './servicio-destacado/servicio-destacado.component';
import { ProductoDestacadoComponent } from './producto-destacado/producto-destacado.component';
import { PedidoPersonalizadoComponent } from './pedido-personalizado/pedido-personalizado.component';
import { Servicio } from '../../../models/servicio.model';
import { Producto } from '../../../models/producto.model';
import { ServicioService } from '../../../services/servicio/servicio.service'; // Ajusta ruta si es necesario
import { ProductosService } from '../../../services/productos/productos.service';

type Orientacion = 'izquierda' | 'derecha';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgFor,
    ServicioDestacadoComponent,
    ProductoDestacadoComponent,
    PedidoPersonalizadoComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  servicios: (Servicio & { orientacion: Orientacion })[] = [];
  productos: Producto[] = [];

  private serviciosService = inject(ServicioService);
  private productosService = inject(ProductosService);

  ngOnInit(): void {
    this.serviciosService.obtenerActivos().subscribe({
      next: (servicios) => {
        this.servicios = servicios.map((servicio, idx) => ({
          ...servicio,
          orientacion: idx % 2 === 0 ? 'izquierda' : 'derecha',
        }));
      },
      error: (err) => {
        console.error('Error al cargar servicios:', err);
        this.servicios = [];
      },
    });

    this.productosService.obtenerActivos().subscribe({
      next: (productos) => {
        this.productos = productos;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.productos = [];
      },
    });
  }
}
