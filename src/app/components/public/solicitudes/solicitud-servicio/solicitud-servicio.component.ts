import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Servicio } from '../../../../models/servicio.model';
import { SolicitudService } from '../../../../services/solicitud/solicitud.service';
import { ActivatedRoute } from '@angular/router';
import { SERVICIOS_MOCK } from '../../servicios/lista-servicios.mock-data';

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

  archivoNombre: string | null = null;
  archivoPreview: string | null = null;
  archivoEsImagen = false;
  archivo: File | null = null;

  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudService,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      descripcion: ['', Validators.required],
      archivo: [null]
    });
  }

  ngOnInit() {
    if (!this.servicio) {
      this.route.paramMap.subscribe(params => {
        const id = Number(params.get('idServicio'));
        this.servicio = SERVICIOS_MOCK.find(s => s.idServicio === id);
      });
    }
  }

  seleccionarArchivo() {
    const input = document.getElementById('archivo') as HTMLInputElement;
    input?.click();
  }

  onArchivoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      const file = input.files[0];
      this.archivoNombre = file.name;
      this.archivo = file;
      this.form.patchValue({ archivo: file });

      const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
      this.archivoEsImagen = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext);
      if (this.archivoEsImagen) {
        const reader = new FileReader();
        reader.onload = () => this.archivoPreview = reader.result as string;
        reader.readAsDataURL(file);
      } else {
        this.archivoPreview = null;
      }
    }
  }

  enviarSolicitud() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.enviando = true;
    this.errorEnvio = null;

    const formData = new FormData();
    formData.append('nombre', this.form.value.nombre);
    formData.append('apellidos', this.form.value.apellidos);
    formData.append('email', this.form.value.email);
    formData.append('telefono', this.form.value.telefono ?? '');
    formData.append('descripcion', this.form.value.descripcion);
    formData.append('idServicio', this.servicio?.idServicio?.toString() ?? '');
    if (this.archivo) {
      formData.append('archivo', this.archivo);
    }

    this.solicitudService.crearSolicitudServicio(formData).subscribe({
      next: () => {
        this.enviado = true;
        this.enviando = false;
        this.form.reset();
        this.archivoNombre = null;
        this.archivoPreview = null;
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
