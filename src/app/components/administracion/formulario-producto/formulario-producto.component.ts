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
import { ProductosService } from '../../../services/productos/productos.service';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';

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
  mensajeError: string | null = null;
  readonly LIMITE_MB = 3;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<FormularioProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Producto,
    private tipoProductoService: TipoProductoService,
    private materialService: MaterialService,
    private imageService: ImageService,
    private productoService: ProductosService
  ) {
    this.producto = { ...data };
  }

  ngOnInit(): void {
    this.cargarTiposProducto();
    this.cargarMateriales();
    if (this.producto?.urlImagen) {
      this.imagenPreview = this.producto.urlImagen;
    }
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
    if (input.files && input.files.length > 0) {
      const archivo = input.files[0];
      const tamanoMB = archivo.size / (1024 * 1024);

      if (tamanoMB > this.LIMITE_MB) {
        this.mensajeError = `La imagen supera el límite permitido de ${this.LIMITE_MB} MB.`;
        this.imagenFile = null;
        this.imagenPreview = null;
        this.nombreImagenSeleccionada = '';
        return;
      }

      this.imagenFile = archivo;
      this.nombreImagenSeleccionada = archivo.name;

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagenPreview = e.target?.result as string;
      };
      reader.readAsDataURL(archivo);
      this.mensajeError = null;
    }
  }

  async guardar(): Promise<void> {
    if (this.loading) return; // Previene dobles clics rápidos

    this.loading = true;
    this.mensajeError = null;

    const mat = this.materiales.find(m => m.idMaterial === this.producto.idMaterial);
    const tip = this.tiposProducto.find(t => t.idTipoProducto === this.producto.idTipoProducto);
    this.producto.nombreMaterial     = mat?.nombre || '';
    this.producto.nombreTipoProducto = tip?.nombre || '';

    try {
      if (this.imagenFile) {
        const key = `${environment.imagenes.directorios.producto}${this.imagenFile.name}`;
        const urlImagen = await firstValueFrom(
          this.imageService.uploadImage(key, this.imagenFile)
        );
        this.producto.urlImagen = urlImagen;
      }

      let resultado: Producto;
      if (this.producto.idProducto) { // Editar
        resultado = await firstValueFrom(
          this.productoService.actualizar(this.producto.idProducto, this.producto)
        );
      } else { // Crear
        resultado = await firstValueFrom(
          this.productoService.crear(this.producto)
        );
      }

      this.dialogRef.close(resultado);

    } catch (error: any) {
      console.error('Error en el guardado:', error);
      this.mensajeError = error?.error?.message || 'Ocurrió un error al guardar el producto';
    } finally {
      this.loading = false;
    }
  }

  cancelar(): void {
    this.dialogRef.close(null);
  }
}
