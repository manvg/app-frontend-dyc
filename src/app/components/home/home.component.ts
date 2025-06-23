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
      imagen: 'https://picsum.photos/340/220?random=1',
      orientacion: 'izquierda'
    },
    {
      titulo: 'Grabado Láser en Madera',
      descripcion: 'Personaliza tus artículos o regalos con grabado láser en madera: nombres, logotipos o diseños exclusivos, todo con máxima definición.',
      imagen: 'https://picsum.photos/340/220?random=2',
      orientacion: 'derecha'
    },
    {
      titulo: 'Corte Láser de MDF',
      descripcion: 'Fabricación de piezas en MDF con cortes complejos y detalles finos, ideal para maquetas, decoración y señalética.',
      imagen: 'https://picsum.photos/340/220?random=3',
      orientacion: 'izquierda'
    }
  ];

  productos: Producto[] = [
    {
      titulo: 'Llavero Personalizado',
      descripcion: 'Llavero en acrílico con grabado personalizado, ideal para empresas, eventos o regalos únicos.',
      imagen: 'https://picsum.photos/260/180?random=4'
    },
    {
      titulo: 'Caja Organizadora',
      descripcion: 'Caja armable en MDF con encaje perfecto, personalizable con grabados. Práctica y elegante.',
      imagen: 'https://picsum.photos/260/180?random=5'
    },
    {
      titulo: 'Señalética de Oficina',
      descripcion: 'Placa señalética acrílica con impresión o grabado láser, resistente y de alta calidad.',
      imagen: 'https://picsum.photos/260/180?random=6'
    }
  ];
}
