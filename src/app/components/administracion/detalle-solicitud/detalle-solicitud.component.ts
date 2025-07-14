import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Solicitud } from '../../../models/solicitud.models';
import { SolicitudService } from '../../../services/solicitud/solicitud.service';
import { SolicitudBitacora } from '../../../models/solicitud-bitacora';
import { SolicitudBitacoraService } from '../../../services/bitacora/solicitud-bitacora.service';
import { EstadoSolicitud } from '../../../models/estado-solicitud.models';

@Component({
  selector: 'app-detalle-solicitud',
  standalone: true,
  templateUrl: './detalle-solicitud.component.html',
  styleUrls: ['./detalle-solicitud.component.scss'],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class DetalleSolicitudComponent implements OnInit {
  solicitud: Solicitud | null = null;
  bitacoras: SolicitudBitacora[] = [];
  estados: EstadoSolicitud[] = [];

  estadoNuevo: number | null = null;
  comentario: string = '';
  loading = false;

  agregandoBitacora = false;
  nuevoEstadoBitacora: number | null = null;
  nuevaDescripcionBitacora: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private solicitudService: SolicitudService,
    private bitacoraService: SolicitudBitacoraService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.cargarDetalle(id);
      this.cargarBitacora(id);
      this.cargarEstados();
    }
  }

  cargarDetalle(id: number) {
    this.loading = true;
    this.solicitudService.obtenerPorId(id).subscribe({
      next: (resp) => {
        this.solicitud = resp;
        this.estadoNuevo = resp.idEstadoSolicitud;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  cargarBitacora(idSolicitud: number) {
    this.bitacoraService.obtenerPorSolicitud(idSolicitud).subscribe({
      next: (data) => { this.bitacoras = data; }
    });
  }

  cargarEstados() {
    this.solicitudService.obtenerEstados().subscribe({
      next: (data) => { this.estados = data; }
    });
  }

  actualizarEstado() {
    if (
      !this.solicitud ||
      typeof this.solicitud.idSolicitud !== 'number' ||
      typeof this.estadoNuevo !== 'number' ||
      this.comentario.trim() === '' ||
      this.estadoNuevo === this.solicitud.idEstadoSolicitud
    ) {
      return;
    }

    this.loading = true;
    const solicitudActualizada: Solicitud = {
      ...this.solicitud,
      idEstadoSolicitud: this.estadoNuevo
    };

    this.solicitudService.actualizar(this.solicitud.idSolicitud, solicitudActualizada)
      .subscribe({
        next: () => {
          this.cargarDetalle(this.solicitud!.idSolicitud!);
          this.cargarBitacora(this.solicitud!.idSolicitud!);
          this.comentario = '';
          this.loading = false;
          // Aquí puedes agregar showSuccess('Estado actualizado con éxito')
        },
        error: () => {
          this.loading = false;
          // Aquí puedes agregar showError('No se pudo actualizar el estado')
        }
      });
  }

  agregarBitacora() {
    if (
      !this.solicitud ||
      typeof this.solicitud.idSolicitud !== 'number' ||
      typeof this.nuevoEstadoBitacora !== 'number' ||
      this.nuevaDescripcionBitacora.trim() === ''
    ) {
      // Aquí puedes agregar showError('Completa todos los campos')
      return;
    }

    const nuevaBitacora: SolicitudBitacora = {
      idSolicitudBitacora: 0,
      idSolicitud: this.solicitud.idSolicitud,
      idEstadoSolicitud: this.nuevoEstadoBitacora,
      nombreEstado: '',
      descripcion: this.nuevaDescripcionBitacora,
      fechaCreacion: '',
      usuarioCreacion: 'usuario_actual'
    };

    this.loading = true;
    this.bitacoraService.crear(nuevaBitacora).subscribe({
      next: () => {
        this.cargarBitacora(this.solicitud!.idSolicitud!);
        this.nuevoEstadoBitacora = null;
        this.nuevaDescripcionBitacora = '';
        this.agregandoBitacora = false;
        this.loading = false;
        // Aquí puedes agregar showSuccess('Bitácora agregada correctamente')
      },
      error: () => {
        this.loading = false;
        // Aquí puedes agregar showError('No se pudo agregar la bitácora')
      }
    });
  }

  volver() {
    this.router.navigate(['/solicitudes']);
  }
}
