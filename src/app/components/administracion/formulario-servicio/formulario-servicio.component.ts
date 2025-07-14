import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Servicio } from '../../../models/servicio.model';
import { ServicioService } from '../../../services/servicio/servicio.service';
import { ImageService } from '../../../services/image/image.service';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
// import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-formulario-servicio',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './formulario-servicio.component.html',
  styleUrls: ['./formulario-servicio.component.scss']
})
export class FormularioServicioComponent implements OnInit {

  servicio: Servicio;
  imagenPreview: string | null = null;
  nombreImagenSeleccionada: string | null = null;
  imagenFile: File | null = null;
  mensajeError: string | null = null;
  loading = false;
  readonly LIMITE_MB = 3;

  constructor(
    public dialogRef: MatDialogRef<FormularioServicioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Servicio,
    private servicioService: ServicioService,
    private imageService: ImageService
  ) {
    this.servicio = { ...data };
    if (this.servicio.urlImagen) {
      this.imagenPreview = this.servicio.urlImagen;
    }
  }

  ngOnInit(): void {}

  seleccionarImagen(): void {
    const input = document.getElementById('input-imagen') as HTMLInputElement;
    if (input) input.click();
  }

  onImagenSeleccionada(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const tamanoMB = file.size / (1024 * 1024);
      if (tamanoMB > this.LIMITE_MB) {
        this.mensajeError = `La imagen supera el límite de ${this.LIMITE_MB} MB.`;
        this.imagenFile = null;
        this.imagenPreview = null;
        this.nombreImagenSeleccionada = '';
        return;
      }
      this.imagenFile = file;
      this.nombreImagenSeleccionada = file.name;
      const reader = new FileReader();
      reader.onload = () => this.imagenPreview = reader.result as string;
      reader.readAsDataURL(file);
      this.mensajeError = null;
    }
  }

  // async guardar(): Promise<void> {
  //   if (this.loading) return;
  //   this.loading = true;
  //   this.mensajeError = null;

  //   try {
  //     if (this.imagenFile) {
  //       const key = `${environment.imagenes.directorios.servicio}${this.imagenFile.name}`;
  //       const url = await firstValueFrom(
  //         this.imageService.uploadImage(key, this.imagenFile)
  //       );
  //       this.servicio.urlImagen = url;
  //     }

  //     let resultado: Servicio;
  //     if (this.servicio.idServicio) {
  //       resultado = await firstValueFrom(
  //         this.servicioService.actualizar(this.servicio.idServicio, this.servicio)
  //       );
  //     } else {
  //       resultado = await firstValueFrom(
  //         this.servicioService.crear(this.servicio)
  //       );
  //     }

  //     this.dialogRef.close(resultado);
  //   } catch (error: any) {
  //     console.error('Error guardando servicio:', error);
  //     this.mensajeError = error?.error?.message || 'Ocurrió un error al guardar el servicio';
  //   } finally {
  //     this.loading = false;
  //   }
  // }

  guardar(): void {
    this.dialogRef.close(this.servicio);
  }

  cancelar(): void {
    this.dialogRef.close(null);
  }
}