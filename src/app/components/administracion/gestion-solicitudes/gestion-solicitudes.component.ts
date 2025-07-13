import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgFor } from '@angular/common';
import { SolicitudService } from '../../../services/solicitud/solicitud.service';
import { Solicitud } from '../../../models/solicitud.models';

interface SolicitudTabla {
  idSolicitud: number;
  nombreCliente: string;
  estadoSolicitud: string;
  tipoSolicitud: string;
  producto?: string;
  fechaCreacion: Date;
  observaciones?: string;
}

@Component({
  selector: 'app-gestion-solicitudes',
  templateUrl: './gestion-solicitudes.component.html',
  styleUrls: ['./gestion-solicitudes.component.scss'],
  standalone: true,
  imports: [FormsModule, DatePipe, NgFor]
})
export class GestionSolicitudesComponent implements OnInit {
  solicitudes: SolicitudTabla[] = [];
  solicitudesFiltradas: SolicitudTabla[] = [];
  solicitudSeleccionada?: SolicitudTabla;

  filtroSeleccionado: string = '';
  busqueda: string = '';
  loading = false;
  error?: string;

  constructor(private solicitudService: SolicitudService) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    this.loading = true;
    this.error = undefined;

    this.solicitudService.obtenerTodos().subscribe({
      next: (data: Solicitud[]) => {
        this.solicitudes = data.map(this.toSolicitudTabla);
        this.solicitudesFiltradas = [...this.solicitudes];
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
      estadoSolicitud: s.estadoSolicitud?.nombreEstado ?? '',
      tipoSolicitud: s.tipoSolicitud?.nombreSolicitud ?? '',
      producto: s.productos && s.productos.length > 0
        ? s.productos.map(p => p.nombreProducto ?? '').join(', ')
        : '',
      fechaCreacion: s.fechaCreacion ? new Date(s.fechaCreacion) : new Date(),
      observaciones: s.observaciones ?? ''
    };
  }

  aplicarFiltros() {
    let datos = [...this.solicitudes];

    if (this.busqueda) {
      const texto = this.busqueda.trim().toLowerCase();
      datos = datos.filter(s =>
        String(s.idSolicitud).includes(texto) ||
        s.nombreCliente.toLowerCase().includes(texto) ||
        s.estadoSolicitud.toLowerCase().includes(texto) ||
        s.tipoSolicitud.toLowerCase().includes(texto) ||
        (s.producto?.toLowerCase().includes(texto) ?? false) ||
        (s.observaciones?.toLowerCase().includes(texto) ?? false)
      );
    }
    this.solicitudesFiltradas = datos;
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

  cambiarEstado() {
    if (!this.solicitudSeleccionada) return;
    this.solicitudService.cambiarEstado(this.solicitudSeleccionada.idSolicitud, 0).subscribe({
      next: () => this.cargarSolicitudes(),
      error: () => this.error = 'Error al cambiar el estado'
    });
  }
}
