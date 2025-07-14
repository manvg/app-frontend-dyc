import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SolicitudService } from '../../../../services/solicitud/solicitud.service';
import { Solicitud } from '../../../../models/solicitud.models';
import { SolicitudImagen } from '../../../../models/solicitud-imagen.model';
import { ImageService } from '../../../../services/image/image.service';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-personalizada',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personalizada.component.html',
  styleUrls: ['./personalizada.component.scss']
})
export class PersonalizadaComponent {
  form: FormGroup;
  archivoNombre: string | null = null;
  archivoSeleccionado: File | null = null;
  enviado = false;
  enviando = false;
  errorEnvio: string | null = null;

  idProductoSeleccionado: number | null = 1;

  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudService,
    private imageService: ImageService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.pattern(/^[0-9]*$/)]],
      descripcion: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      descripcionArchivo: [''],
      archivo: [null]
    });
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
      this.archivoSeleccionado = file;
      this.form.patchValue({ archivo: file });
    }
  }

  getExtension(filename: string): string {
    const parts = filename.split('.');
    return parts.length > 1 ? parts.pop()!.toLowerCase() : '';
  }

  async enviarSolicitud() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.enviando = true;
    this.errorEnvio = null;

    try {
      //---------- Imágenes ----------//
      let imagenes: SolicitudImagen[] = [];
      if (this.archivoSeleccionado) {
        const key = `${environment.imagenes.directorios.solicitud}${this.archivoSeleccionado.name}`;
        const urlImagen = await firstValueFrom(
          this.imageService.uploadImage(key, this.archivoSeleccionado)
        );

        const imagen: SolicitudImagen = {
          idSolicitud: 0,
          nombre: this.archivoSeleccionado.name,
          extension: this.getExtension(this.archivoSeleccionado.name),
          descripcion: this.form.value.descripcionArchivo || '',
          urlImagen: urlImagen,
          activo: 1
        };
        imagenes.push(imagen);
      }

      //---------- Productos ----------//
      const productos = [];
      if (this.idProductoSeleccionado) {
        productos.push({
          idProducto: this.idProductoSeleccionado,
          cantidad: this.form.value.cantidad
        });
      }

      //---------- Solicitud ----------//
      const solicitud: Partial<Solicitud> = {
        idTipoSolicitud: 3, //PERSONALIZADA
        idEstadoSolicitud: 1,//RECIBIDA
        nombreCliente: this.form.value.nombre + ' ' + this.form.value.apellidos,
        correoCliente: this.form.value.email,
        telefonoCliente: this.form.value.telefono,
        observaciones: this.form.value.descripcion,
        productos: productos,
        imagenes: imagenes
      };

      this.solicitudService.crear(solicitud as Solicitud).subscribe({
        next: () => {
          this.enviado = true;
          this.enviando = false;
          this.form.reset({ cantidad: 1 });
          this.archivoNombre = null;
          this.archivoSeleccionado = null;
          setTimeout(() => this.enviado = false, 4000);
        },
        error: (err) => {
          this.errorEnvio = 'Error al enviar la solicitud. Intenta nuevamente.'
          this.enviando = false;
        }
      });

    } catch (err) {
      this.errorEnvio = 'Error al subir el archivo. Intenta nuevamente.' + err;
      this.enviando = false;
    }
  }

  campoInvalido(campo: string) {
    const control = this.form.get(campo);
    return control && control.touched && control.invalid;
  }

  get emailErrors() {
    const control = this.form.get('email');
    return control?.touched ? control.errors : null;
  }

  get cantidadErrors() {
    const control = this.form.get('cantidad');
    return control?.touched ? control.errors : null;
  }
}
