import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgFor } from '@angular/common';

interface SolicitudTabla {
  idSolicitud: number;
  nombreCliente: string;
  estadoSolicitud: string;
  tipoSolicitud: string;
  producto?: string;
  fecha: Date;
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

  ngOnInit(): void {
    this.cargarSolicitudes();
    this.aplicarFiltros();
  }

  cargarSolicitudes() {
    this.solicitudes = [
      {
        idSolicitud: 1,
        nombreCliente: 'Pedro Picapiedra Pérez',
        estadoSolicitud: 'Recibida (R)',
        tipoSolicitud: 'Catálogo',
        producto: 'Galvano',
        fecha: new Date('2025-07-01'),
        observaciones: '---'
      },
      {
        idSolicitud: 2,
        nombreCliente: 'Mardco Botton Splatoon',
        estadoSolicitud: 'En Proceso (P)',
        tipoSolicitud: 'Catálogo',
        producto: 'Medalla',
        fecha: new Date('2025-07-02'),
        observaciones: 'Prioridad Alta'
      },
      {
        idSolicitud: 3,
        nombreCliente: 'Mariah Maclachlan Garage',
        estadoSolicitud: 'Finalizada (F)',
        tipoSolicitud: 'Personalizada',
        producto: undefined,
        fecha: new Date('2025-07-04'),
        observaciones: 'Personalización especial'
      }
    ];
    this.solicitudesFiltradas = [...this.solicitudes];
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
      this.solicitudes = this.solicitudes.filter(s => s !== this.solicitudSeleccionada);
      this.aplicarFiltros();
      this.solicitudSeleccionada = undefined;
    }
  }

  cambiarEstado() {
    if (!this.solicitudSeleccionada) return;
    alert(`Cambiar estado de solicitud #${this.solicitudSeleccionada.idSolicitud}`);
  }
}
