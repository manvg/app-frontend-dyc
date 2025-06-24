import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ServicioDestacadoComponent } from '../../components/home/servicio-destacado/servicio-destacado.component';
import { ProductoDestacadoComponent } from '../../components/home/producto-destacado/producto-destacado.component';
import { PedidoPersonalizadoComponent } from '../../components/home/pedido-personalizado/pedido-personalizado.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

type Orientacion = 'izquierda' | 'derecha';

interface Servicio {
  titulo: string;
  descripcion: string;
  imagen: string;
  orientacion: Orientacion;
}

interface Producto {
  titulo: string;
  descripcion: string;
  imagen: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, ServicioDestacadoComponent, ProductoDestacadoComponent, PedidoPersonalizadoComponent,
    NavbarComponent, FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  servicios: Servicio[] = [
    {
      titulo: 'Corte Láser de Acrílico',
      descripcion: 'Servicio de corte de acrílico de alta precisión con terminaciones limpias y profesionales para proyectos industriales y personalizados.',
      imagen: 'assets/servicio_corte_laser_de_acrilico.jpg',
      orientacion: 'izquierda'
    },
    {
      titulo: 'Grabado Láser en Madera',
      descripcion: 'Personaliza tus artículos o regalos con grabado láser en madera: nombres, logotipos o diseños exclusivos, todo con máxima definición.',
      imagen: 'assets/servicio_grabado_laser_en_madera.jpg',
      orientacion: 'derecha'
    },
    {
      titulo: 'Corte Láser de MDF',
      descripcion: 'Fabricación de piezas en MDF con cortes complejos y detalles finos, ideal para maquetas, decoración y señalética.',
      imagen: 'assets/servicio_corte_laser_de_MDF.jpg',
      orientacion: 'izquierda'
    }
  ];

  productos: Producto[] = [
    {
      titulo: 'Letrero Luminoso Personalizado',
      descripcion: 'Letrero en acrílico personalizado con corte láser e iluminación LED.',
      imagen: 'assets/producto_letrero_negocio.jpg'
    },
    {
      titulo: 'Medalla Personalizada en Acrílico',
      descripcion: 'Medalla en acrílico cortada y grabada con láser, ideal para premiaciones.',
      imagen: 'assets/producto_premio_medalla.jpg'
    },
    {
      titulo: 'Señalética de Oficina',
      descripcion: 'Placa señalética acrílica con impresión o grabado láser, resistente y de alta calidad.',
      imagen: 'assets/producto_senaletica_oficina.jpg'
    }
  ];
}
