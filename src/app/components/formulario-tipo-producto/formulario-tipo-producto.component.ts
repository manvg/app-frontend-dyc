import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { TipoProducto } from '../../models/tipo-producto.model';

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

  constructor(
    public dialogRef: MatDialogRef<FormularioTipoProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TipoProducto
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

  guardar(): void {
    this.dialogRef.close({
      ...this.tipoProducto,
      imagenFile: this.imagenFile
    });
  }

  cancelar(): void {
    this.dialogRef.close(null);
  }
}
