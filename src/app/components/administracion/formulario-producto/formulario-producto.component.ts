import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Producto } from '../../../models/producto.model';
import { TipoProductoService } from '../../../services/tipo-producto/tipo-producto.service';
import { TipoProducto } from '../../../models/tipo-producto.model';
import { Material } from '../../../models/material.model';
import { MaterialService } from '../../../services/material/material.service';
import { ImageService } from '../../../services/image/image.service';
import { v4 as uuid } from 'uuid';
import { url } from 'inspector';

@Component({
  selector: 'app-formulario-producto',
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
  templateUrl: './formulario-producto.component.html',
  styleUrls: ['./formulario-producto.component.scss']
})
export class FormularioProductoComponent implements OnInit {

  producto: Producto;
  tiposProducto: TipoProducto[] = [];
  materiales: Material[] = [];

  imagenPreview: string | null = null;
  nombreImagenSeleccionada: string | null = null;
  imagenFile: File | null = null;

  private readonly BUCKET = 'bucketdyc';

  constructor(
    public dialogRef: MatDialogRef<FormularioProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Producto,
    private tipoProductoService: TipoProductoService,
    private materialService: MaterialService,
    private imageService: ImageService
  ) {
    this.producto = { ...data };
  }

  ngOnInit(): void {
    this.cargarTiposProducto();
    this.cargarMateriales();
  }

  cargarTiposProducto(): void {
    this.tipoProductoService.obtenerTodos().subscribe({
      next: (tipos) => this.tiposProducto = tipos,
      error: () => this.tiposProducto = []
    });
  }

  private cargarMateriales(): void {
    this.materialService.obtenerTodos().subscribe({
      next: mats => this.materiales = mats,
      error: () => this.materiales = []
    });
  }

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
    // rellena nombres para el DTO
    const mat = this.materiales.find(m => m.idMaterial === this.producto.idMaterial);
    const tip = this.tiposProducto.find(t => t.idTipoProducto === this.producto.idTipoProducto);
    this.producto.nombreMaterial     = mat?.nombre || '';
    this.producto.nombreTipoProducto = tip?.nombre || '';

    if (this.imagenFile) {
      const key = `producto/${Date.now()}_${uuid()}_${this.imagenFile.name}`;
      this.imageService.uploadImage(this.BUCKET, key, this.imagenFile)
        .subscribe({
          next: url => {
            this.producto.urlImagen = url;
            this.dialogRef.close(this.producto);    // <<< EDIT: cerramos con el producto completo
          },
          error: err => {
            console.error('Error subiendo imagen:', err);
          }
        });
    } else {
      this.dialogRef.close(this.producto);        // <<< EDIT: cerramos aunque no haya imagen
    }
  }

  cancelar(): void {
    this.dialogRef.close(null);
  }
}
