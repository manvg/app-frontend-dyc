import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Solicitud } from '../../../models/solicitud.models';
import { SolicitudService } from '../../../services/solicitud/solicitud.service';
import { SolicitudBitacora } from '../../../models/solicitud-bitacora';
import { SolicitudBitacoraService } from '../../../services/bitacora/solicitud-bitacora.service';
import { SolicitudImagen } from '../../../models/solicitud-imagen.model';
import { EstadoSolicitud } from '../../../models/estado-solicitud.models';
import { ProductosService } from '../../../services/productos/productos.service';
import { Producto } from '../../../models/producto.model';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-detalle-solicitud',
  standalone: true,
  templateUrl: './detalle-solicitud.component.html',
  styleUrls: ['./detalle-solicitud.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class DetalleSolicitudComponent implements OnInit {
  solicitud: Solicitud | null = null;
  bitacoras: SolicitudBitacora[] = [];
  estados: EstadoSolicitud[] = [];
  detallesProductos: Producto[] = [];
  solicitudImagen: SolicitudImagen | null = null;
  agregandoBitacora = false;
  nuevoEstadoBitacora: number | null = null;
  nuevaDescripcionBitacora: string = '';
  loading = false;
  mensajeExito?: string;
  mensajeError?: string;
  usuarioActual: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private solicitudService: SolicitudService,
    private bitacoraService: SolicitudBitacoraService,
    private productoService: ProductosService,
    private oidcSecurityService: OidcSecurityService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loading = true;
      this.solicitudService.obtenerPorId(id).subscribe({
        next: (resp) => {
          this.solicitud = resp;
          this.loading = false;
          this.cargarDetallesProductos();
          this.cargarBitacora(id);
          this.cargarEstados();
          this.oidcSecurityService.userData$.subscribe(userData => {
            this.usuarioActual = userData?.userData?.email || userData?.userData?.name || 'usuario_no_identificado';
          });
        },
        error: () => { this.loading = false; }
      });
    }
  }


  cargarDetalle(id: number) {
    this.loading = true;
    this.solicitudService.obtenerPorId(id).subscribe({
      next: (resp) => {
        this.solicitud = resp;
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

  cargarDetallesProductos() {
    this.detallesProductos = [];
    if (this.solicitud && Array.isArray(this.solicitud.productos) && this.solicitud.productos.length > 0)
    {
      this.solicitud.productos.forEach(prod => {
        if (prod.idProducto) {
          this.productoService.obtenerPorId(prod.idProducto).subscribe({
            next: (detalle) => {
              const productoSolicitud = this.solicitud!.productos!.find(p => p.idProducto === prod.idProducto);
              this.detallesProductos.push({
                ...detalle,
                cantidad: productoSolicitud ? productoSolicitud.cantidad : 0
              });
            }
          });
        }
      });
    }
  }

  agregarBitacora() {
    if(!this.solicitud){
      return;

    }
    if  (typeof this.solicitud.idSolicitud !== 'number'){
      return;
    }
    if (!this.solicitud || typeof this.solicitud.idSolicitud !== 'number' || typeof this.nuevoEstadoBitacora !== 'number' || this.nuevaDescripcionBitacora.trim() === '')
    {
      this.showError('Completa todos los campos para agregar bitácora');
      return;
    }

    const nuevaBitacora: SolicitudBitacora = {
      idSolicitudBitacora: 0,
      idSolicitud: this.solicitud.idSolicitud,
      idEstadoSolicitud: this.nuevoEstadoBitacora,
      nombreEstado: '',
      descripcion: this.nuevaDescripcionBitacora,
      fechaCreacion: '',
      usuarioCreacion: this.usuarioActual
    };

    this.loading = true;
    this.bitacoraService.crear(nuevaBitacora).subscribe({
      next: () => {
        this.cargarDetalle(this.solicitud!.idSolicitud!);
        this.cargarBitacora(this.solicitud!.idSolicitud!);
        this.nuevoEstadoBitacora = null;
        this.nuevaDescripcionBitacora = '';
        this.agregandoBitacora = false;
        this.loading = false;
        this.showExito('Bitácora agregada correctamente');
      },
      error: () => {
        this.loading = false;
        this.showError('Error al agregar la bitácora');
      }
    });
  }

  volver() {
    this.router.navigate(['/gestion-solicitudes']);
  }

  showExito(mensaje: string) {
    this.mensajeExito = mensaje;
    setTimeout(() => this.mensajeExito = undefined, 2500);
  }
  showError(mensaje: string) {
    this.mensajeError = mensaje;
    setTimeout(() => this.mensajeError = undefined, 3500);
  }

  get productosAsociados(): string[] {
    return Array.isArray(this.solicitud?.productos)
      ? this.solicitud!.productos.map(p => p.nombreProducto || '').filter(n => n)
      : [];
  }

  esTipoProducto(tipo?: string | null): boolean {
    return tipo === 'Producto' || tipo === 'Catálogo';
  }

  esTipoServicio(tipo?: string | null): boolean {
    return tipo === 'Servicio';
  }

  esTipoPersonalizada(tipo?: string | null): boolean {
    return tipo === 'Personalizada';
  }

}
