import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SolicitudService } from '../../../services/solicitud/solicitud.service';
import { Solicitud } from '../../../models/solicitud.models';

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
  enviado = false;
  enviando = false;
  errorEnvio: string | null = null;

  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      descripcion: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
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
      this.form.patchValue({ archivo: file });
    }
  }

  async enviarSolicitud() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.enviando = true;
    this.errorEnvio = null;

    const solicitud: Partial<Solicitud> = {
      nombreCliente: this.form.value.nombre + ' ' + this.form.value.apellidos,
      correoCliente: this.form.value.email,
      telefonoCliente: this.form.value.telefono,
      observaciones: this.form.value.descripcion,
      // cantidad, archivo, etc. pueden ir en un campo personalizado según backend
    };

    // Si no envías archivos, simplemente:
    this.solicitudService.crear(solicitud as Solicitud).subscribe({
      next: () => {
        this.enviado = true;
        this.enviando = false;
        this.form.reset({ cantidad: 1 });
        this.archivoNombre = null;
        setTimeout(() => this.enviado = false, 4000);
      },
      error: (err) => {
        this.errorEnvio = 'Error al enviar la solicitud. Intenta nuevamente.';
        this.enviando = false;
      }
    });

    // Si necesitas enviar archivo, dime y te paso la versión con FormData.
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
