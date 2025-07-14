import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Servicio } from '../../../../models/servicio.model';
import { SolicitudService } from '../../../../services/solicitud/solicitud.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ServicioService } from '../../../../services/servicio/servicio.service';
import { Solicitud } from '../../../../models/solicitud.models';

@Component({
  selector: 'app-solicitud-servicio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './solicitud-servicio.component.html',
  styleUrls: ['./solicitud-servicio.component.scss']
})
export class SolicitudServicioComponent implements OnInit {
  @Input() servicio?: Servicio;
  form: FormGroup;
  enviado = false;
  enviando = false;
  errorEnvio: string | null = null;
  idTipoSolicitud = 1;//Tipo solicitud: SERVICIO
  idEstadoSolicitud = 1;  //Estado solicitud: RECIBIDA
  idServicio: number | null = null;

  private fb = inject(FormBuilder);
  private solicitudService = inject(SolicitudService);
  private route = inject(ActivatedRoute);
  private servicioService = inject(ServicioService);

  constructor() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (!this.servicio) {
      this.route.paramMap.subscribe((params: ParamMap) => {
        const id = Number(params.get('idServicio'));
        if (id) {
          this.servicioService.obtenerPorId(id).subscribe({
            next: s => this.servicio = s,
            error: () => this.errorEnvio = 'No se pudo cargar el servicio'
          });
        }
      });
    }
  }

  enviarSolicitud() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.enviando = true;
    this.errorEnvio = null;

    // Construir objeto de tipo Solicitud
    const solicitud: Solicitud = {
      idTipoSolicitud: this.idTipoSolicitud,
      idEstadoSolicitud: this.idEstadoSolicitud,
      idServicio: this.idServicio,
      nombreCliente: this.form.value.nombre + ' ' + this.form.value.apellidos,
      correoCliente: this.form.value.email,
      telefonoCliente: this.form.value.telefono,
      observaciones: this.form.value.descripcion,
    };

    this.solicitudService.crear(solicitud).subscribe({
      next: () => {
        this.enviado = true;
        this.enviando = false;
        this.form.reset();
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
