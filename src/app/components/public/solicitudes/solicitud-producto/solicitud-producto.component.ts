import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SolicitudService } from '../../../../services/solicitud/solicitud.service';
import { Producto } from '../../../../models/producto.model';
import { Solicitud } from '../../../../models/solicitud.models';
import { ProductosService } from '../../../../services/productos/productos.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-solicitud-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './solicitud-producto.component.html',
  styleUrls: ['./solicitud-producto.component.scss']
})
export class SolicitudProductoComponent implements OnInit {
  producto: Producto | undefined;
  form: FormGroup;
  enviado = false;
  enviando = false;
  errorEnvio: string | null = null;
  idTipoSolicitud = 2;//Tipo solicitud: PRODUCTO
  idEstadoSolicitud = 1;  //Estado solicitud: RECIBIDA
  idServicio: number | null = null;
  usuarioActual: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private solicitudService: SolicitudService,
    private oidcSecurityService: OidcSecurityService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      descripcion: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    const idProducto = Number(this.route.snapshot.paramMap.get('idProducto'));
    if (idProducto) {
      this.productosService.obtenerPorId(idProducto).subscribe({
        next: (producto) => this.producto = producto,
        error: () => {
          this.errorEnvio = 'No se pudo cargar la información del producto.';
        }
      });
      this.oidcSecurityService.userData$.subscribe(userData => {
        this.usuarioActual = userData?.userData?.email || userData?.userData?.name || 'usuario_no_identificado';
      });
    } else {
      this.errorEnvio = 'Producto no válido en la URL.';
    }
  }

  enviarSolicitud() {
    if (this.form.invalid || !this.producto) {
      this.form.markAllAsTouched();
      return;
    }
    this.enviando = true;
    this.errorEnvio = null;

    const solicitud: Solicitud = {
      idTipoSolicitud: this.idTipoSolicitud,
      idEstadoSolicitud: this.idEstadoSolicitud,
      idServicio: this.idServicio,
      nombreCliente: this.form.value.nombre + ' ' + this.form.value.apellidos,
      correoCliente: this.form.value.email,
      telefonoCliente: this.form.value.telefono,
      observaciones: this.form.value.descripcion,
      usuarioCreacion: this.usuarioActual,
      productos: [
        {
          idProducto: this.producto.idProducto,
          cantidad: this.form.value.cantidad
        }
      ]
    };

    this.solicitudService.crear(solicitud).subscribe({
      next: () => {
        this.enviado = true;
        this.enviando = false;
        this.form.reset({ cantidad: 1 });
        setTimeout(() => this.enviado = false, 4000);
      },
      error: () => {
        this.errorEnvio = 'Error al enviar la solicitud. Intenta nuevamente.';
        this.enviando = false;
      }
    });
  }

  campoInvalido(campo: string) {
    const control = this.form.get(campo);
    return control && control.touched && control.invalid;
  }
}
