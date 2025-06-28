import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from '../../services/productos/productos.service';
import { Producto } from '../../models/producto.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FormularioProductoComponent } from '../formulario-producto/formulario-producto.component';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-mantenedor-productos',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './mantenedor-productos.component.html',
  styleUrl: './mantenedor-productos.component.scss'
})
export class MantenedorProductosComponent implements OnInit {

  productos: Producto[] = [];
  columnas: string[] = ['tipoProducto', 'nombre', 'material', 'medidas', 'precio', 'activo', 'acciones'];

  private productosService = inject(ProductosService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productosService.obtenerTodos().subscribe({
      next: data => this.productos = data,
      error: err => {
        this.productos = [];
        console.error('Error al cargar productos', err);
      }
    });
  }

  nuevoProducto(): void {
    const dialogRef = this.dialog.open(FormularioProductoComponent, {
      width: '600px',
      data: {
        idProducto: 0,
        nombre: '',
        descripcion: '',
        material: '',
        medidas: '',
        precio: 0,
        urlImagen: '',
        activo: 1,
        idTipoProducto: null,
        nombreTipoProducto: ''
      } as Producto
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productosService.crear(result).subscribe({
          next: () => {
            this.cargarProductos();
            this.snackBar.open('Producto creado con éxito', 'Cerrar', { duration: 3000 });
          },
          error: err => console.error('Error al crear producto', err)
        });
      }
    });
  }

  editarProducto(id: number): void {
    this.productosService.obtenerPorId(id).subscribe(producto => {
      const dialogRef = this.dialog.open(FormularioProductoComponent, {
        width: '600px',
        data: producto
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.productosService.actualizar(id, result).subscribe({
            next: () => {
              this.cargarProductos();
              this.snackBar.open('Producto actualizado con éxito', 'Cerrar', { duration: 3000 });
            },
            error: err => console.error('Error al actualizar producto', err)
          });
        }
      });
    });
  }

  cambiarVigenciaProducto(producto: Producto): void {
    const nuevoEstado = producto.activo === 1 ? 0 : 1;
    const accion = nuevoEstado === 0 ? 'desactivar' : 'activar';

    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        titulo: 'Confirmación',
        mensaje: `¿Estás seguro de ${accion} este producto?`
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.productosService.cambiarEstado(producto.idProducto, nuevoEstado).subscribe({
          next: () => {
            this.cargarProductos();
            this.snackBar.open(
              nuevoEstado === 0 ? 'Producto desactivado' : 'Producto activado',
              'Cerrar', { duration: 3000 }
            );
          },
          error: err => console.error(`Error al ${accion} producto`, err)
        });
      }
    });
  }

  eliminarProducto(id: number): void {
    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        titulo: 'Confirmación',
        mensaje: '¿Estás seguro de eliminar este producto permanentemente?'
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.productosService.eliminar(id).subscribe({
          next: () => {
            this.cargarProductos();
            this.snackBar.open('Producto eliminado', 'Cerrar', { duration: 3000 });
          },
          error: err => console.error('Error al eliminar producto', err)
        });
      }
    });
  }
}
