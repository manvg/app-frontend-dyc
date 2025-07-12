import { Component, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { ServicioDestacadoComponent } from '../../components/home/servicio-destacado/servicio-destacado.component';
import { ProductoDestacadoComponent } from '../../components/home/producto-destacado/producto-destacado.component';
import { PedidoPersonalizadoComponent } from '../../components/home/pedido-personalizado/pedido-personalizado.component';
import { Servicio } from '../../models/servicio.model';
import { Producto } from '../../models/producto.model';
//import { ServiciosService } from '../../services/servicios.service';      // <-- Ajusta si tu service tiene otro nombre/ruta
import { ProductosService } from '../../services/productos/productos.service';

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

  private readonly SERVICIOS_MOCK: Servicio[] = [
  {
    idServicio: 1,
    nombre: 'Corte Láser de Acrílico',
    descripcion: 'Servicio de corte de acrílico de alta precisión para proyectos industriales y personalizados.',
    precio: 12000,
    urlImagen: 'assets/servicio_corte_laser_de_acrilico.jpg',
    activo: 1
  },
  {
    idServicio: 2,
    nombre: 'Grabado Láser en Madera',
    descripcion: 'Grabado de alta definición en madera para personalizar artículos y regalos.',
    precio: 9500,
    urlImagen: 'assets/servicio_grabado_laser_en_madera.jpg',
    activo: 1
  },
  {
    idServicio: 3,
    nombre: 'Corte Láser de MDF',
    descripcion: 'Corte preciso en MDF, ideal para maquetas, decoración y señalética.',
    precio: 10500,
    urlImagen: 'assets/servicio_corte_laser_de_MDF.jpg',
    activo: 1
  }
];

  //private serviciosService = inject(ServiciosService);
  private productosService = inject(ProductosService);

  ngOnInit(): void {
    // this.serviciosService.obtenerTodos().subscribe({
    //   next: (servicios) => {
    //     this.servicios = servicios.map((servicio, idx) => ({
    //       ...servicio,
    //       orientacion: idx % 2 === 0 ? 'izquierda' : 'derecha'
    //     }));
    //   },
    //   error: (err) => {
    //     console.error('Error al cargar servicios:', err);
    //     this.servicios = [];
    //   }
    // });

    // Mock de servicios, agregando la orientación
    this.servicios = this.SERVICIOS_MOCK.map((servicio, idx) => ({
      ...servicio,
      orientacion: idx % 2 === 0 ? 'izquierda' : 'derecha'
    }));

    // Cargar productos desde backend
    this.productosService.obtenerActivos().subscribe({
      next: (productos) => {
        this.productos = productos;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.productos = [];
      }
    });
  }
}
