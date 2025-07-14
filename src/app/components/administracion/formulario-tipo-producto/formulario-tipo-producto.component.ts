import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { TipoProducto } from '../../../models/tipo-producto.model';
import { firstValueFrom } from 'rxjs';
import { ImageService } from '../../../services/image/image.service';
import { TipoProductoService } from '../../../services/tipo-producto/tipo-producto.service';
import { ResponseModel } from '../../../models/response-model.model';
@Component({
  selector: 'app-formulario-tipo-producto',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './formulario-tipo-producto.component.html',
  styleUrls: ['./formulario-tipo-producto.component.scss']
})
export class FormularioTipoProductoComponent implements OnInit {

  tipoProducto: TipoProducto;
  imagenPreview: string | null = null;
  nombreImagenSeleccionada: string | null = null;
  imagenFile: File | null = null;
  loading = false;
  mensajeError: string | null = null;


  constructor(
    public dialogRef: MatDialogRef<FormularioTipoProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TipoProducto,
    private tipoProductoService: TipoProductoService,
    private imageService: ImageService
  ) {
    this.tipoProducto = { ...data };
    if (this.tipoProducto.urlImagen) {
      this.imagenPreview = this.tipoProducto.urlImagen;
    }
  }

  ngOnInit(): void {}

  seleccionarImagen(): void {
    const input = document.getElementById('input-imagen') as HTMLInputElement;
    if (input) input.click();
  }

  onImagenSeleccionada(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files[0]) {
      const file = input.files[0];
      this.nombreImagenSeleccionada = file.name;
      this.imagenFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async guardar(): Promise<void> {
    if (this.loading) return;
    this.loading = true;
    this.mensajeError = null;

    try {
      if (this.imagenFile) {
        const key = `tipoproducto/${this.imagenFile.name}`;
        const urlImagen = await firstValueFrom(
          this.imageService.uploadImage(key, this.imagenFile)
        );
        this.tipoProducto.urlImagen = urlImagen;
      }

      let response: ResponseModel;
      if (this.tipoProducto.idTipoProducto && this.tipoProducto.idTipoProducto > 0) {
        response = await firstValueFrom(
          this.tipoProductoService.actualizar(this.tipoProducto.idTipoProducto, this.tipoProducto)
        );
      } else {
        response = await firstValueFrom(
          this.tipoProductoService.crear(this.tipoProducto)
        );
      }

      if (response.status) {
        this.dialogRef.close(response);
      } else {
        this.mensajeError = response.message || 'No se pudo guardar el tipo de producto';
      }

    } catch (error: any) {
      this.mensajeError = error?.error?.message || 'Ocurrió un error al guardar el tipo de producto';
      console.error('Error:', error);
    } finally {
      this.loading = false;
    }
  }


  cancelar(): void {
    this.dialogRef.close(null);
  }
}
