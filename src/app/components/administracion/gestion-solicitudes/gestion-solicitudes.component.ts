import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { SolicitudService } from '../../../services/solicitud/solicitud.service';
import { Solicitud } from '../../../models/solicitud.models';
import { Router } from '@angular/router';

interface SolicitudTabla {
  idSolicitud: number;
  nombreCliente: string;
  nombreEstadoSolicitud?: string;
  nombreTipoSolicitud?: string;
  nombreServicio?: string | null;
  productos?: string;
  fechaCreacion: Date;
  observaciones?: string;
}

@Component({
  selector: 'app-gestion-solicitudes',
  templateUrl: './gestion-solicitudes.component.html',
  styleUrls: ['./gestion-solicitudes.component.scss'],
  standalone: true,
  imports: [FormsModule, DatePipe, NgFor, NgIf]
})
export class GestionSolicitudesComponent implements OnInit {
  solicitudes: SolicitudTabla[] = [];
  solicitudesFiltradas: SolicitudTabla[] = [];
  solicitudSeleccionada?: SolicitudTabla;
  filtroSeleccionado: string = '';
  busqueda: string = '';
  loading = false;
  error?: string;
  paginaActual = 1;
  tamanoPagina = 10;
  totalPaginas = 1;

  constructor(
    private solicitudService: SolicitudService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    this.loading = true;
    this.error = undefined;

    this.solicitudService.obtenerTodos().subscribe({
      next: (data: Solicitud[]) => {
        this.solicitudes = data
          .map(this.toSolicitudTabla)
          .sort((a, b) => b.idSolicitud - a.idSolicitud);

        this.aplicarFiltros();
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar las solicitudes';
        this.loading = false;
      }
    });
  }

  private toSolicitudTabla(s: Solicitud): SolicitudTabla {
    return {
      idSolicitud: s.idSolicitud ?? 0,
      nombreCliente: s.nombreCliente,
      nombreEstadoSolicitud: s.nombreEstadoSolicitud ?? '--',
      nombreTipoSolicitud: s.nombreTipoSolicitud ?? '--',
      nombreServicio: s.nombreServicio ?? '--',
      productos: s.productos && s.productos.length > 0
        ? s.productos.map(p => p.nombreProducto ?? '').join(', ')
        : '--',
      fechaCreacion: s.fechaCreacion ? new Date(s.fechaCreacion) : new Date(),
      observaciones: s.observaciones ?? '--'
    };
  }

  aplicarFiltros() {
    let datos = [...this.solicitudes];
    const texto = this.removeAccents(this.busqueda.trim());

    if (this.filtroSeleccionado && texto) {
      switch (this.filtroSeleccionado) {
        case 'id':
          datos = datos.filter(s => String(s.idSolicitud).includes(texto));
          break;
        case 'tipo':
          datos = datos.filter(s =>
            this.removeAccents(s.nombreTipoSolicitud ?? '').includes(texto)
          );
          break;
        case 'producto':
          datos = datos.filter(s =>
            this.removeAccents(s.productos ?? '').includes(texto)
          );
          break;
        default:
          break;
      }
    } else if (texto) {
      datos = datos.filter(s =>
        String(s.idSolicitud).includes(texto) ||
        this.removeAccents(s.nombreCliente).includes(texto) ||
        this.removeAccents(s.nombreEstadoSolicitud ?? '').includes(texto) ||
        this.removeAccents(s.nombreTipoSolicitud ?? '').includes(texto) ||
        this.removeAccents(s.nombreServicio ?? '').includes(texto) ||
        this.removeAccents(s.productos ?? '').includes(texto) ||
        this.removeAccents(s.observaciones ?? '').includes(texto)
      );
    }

    this.solicitudesFiltradas = datos;
    this.paginaActual = 1;
    this.actualizarTotalPaginas();
  }



  ordenarPor(campo: keyof SolicitudTabla) {
    this.solicitudesFiltradas.sort((a, b) => {
      const vA = a[campo] ?? '';
      const vB = b[campo] ?? '';
      return vA > vB ? 1 : vA < vB ? -1 : 0;
    });
  }

  seleccionarSolicitud(solicitud: SolicitudTabla) {
    this.solicitudSeleccionada = solicitud;
  }

  verDetalle(solicitud: SolicitudTabla) {
    this.router.navigate(['/solicitudes', solicitud.idSolicitud]);
  }

  verImagen(solicitud: SolicitudTabla) {
    alert(`Mostrando imagen de la solicitud #${solicitud.idSolicitud}`);
  }

  verBitacora(solicitud: SolicitudTabla) {
    alert(`Mostrando bitácora de la solicitud #${solicitud.idSolicitud}`);
  }

  editarSolicitud() {
    if (!this.solicitudSeleccionada) return;
    alert(`Editar solicitud #${this.solicitudSeleccionada.idSolicitud}`);
  }

  eliminarSolicitud() {
    if (!this.solicitudSeleccionada) return;
    if (confirm(`¿Eliminar solicitud #${this.solicitudSeleccionada.idSolicitud}?`)) {
      this.solicitudService.eliminar(this.solicitudSeleccionada.idSolicitud).subscribe({
        next: () => {
          this.cargarSolicitudes();
          this.solicitudSeleccionada = undefined;
        },
        error: () => {
          this.error = 'Error al eliminar la solicitud';
        }
      });
    }
  }

  get solicitudesPaginadas() {
    if (!this.solicitudesFiltradas) return [];
    const inicio = (this.paginaActual - 1) * this.tamanoPagina;
    return this.solicitudesFiltradas.slice(inicio, inicio + this.tamanoPagina);
  }

  actualizarTotalPaginas() {
    this.totalPaginas = Math.ceil((this.solicitudesFiltradas?.length || 0) / this.tamanoPagina) || 1;
    if (this.paginaActual > this.totalPaginas) this.paginaActual = this.totalPaginas;
  }

  irPagina(pagina: number) {
    if (pagina < 1 || pagina > this.totalPaginas) return;
    this.paginaActual = pagina;
  }

  removeAccents(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

}
