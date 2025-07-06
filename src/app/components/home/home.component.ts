import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ServicioDestacadoComponent } from '../../components/home/servicio-destacado/servicio-destacado.component';
import { ProductoDestacadoComponent } from '../../components/home/producto-destacado/producto-destacado.component';
import { PedidoPersonalizadoComponent } from '../../components/home/pedido-personalizado/pedido-personalizado.component';
import { SERVICIOS_MOCK, PRODUCTOS_MOCK } from './../../data.mock';
import { Servicio } from '../../models/servicio.model';
import { Producto } from '../../models/producto.model';

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
export class HomeComponent {
  servicios: (Servicio & { orientacion: Orientacion })[] = [
    {
      ...SERVICIOS_MOCK[0],
      orientacion: 'izquierda'
    },
    {
      ...SERVICIOS_MOCK[1],
      orientacion: 'derecha'
    },
    {
      ...SERVICIOS_MOCK[2],
      orientacion: 'izquierda'
    }
  ];

  productos: Producto[] = PRODUCTOS_MOCK;
}
