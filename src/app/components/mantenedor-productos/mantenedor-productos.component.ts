import { Component, OnInit } from '@angular/core';
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
    MatSnackBarModule
  ],
  templateUrl: './mantenedor-productos.component.html',
  styleUrl: './mantenedor-productos.component.scss'
})
export class MantenedorProductosComponent implements OnInit {

  productos: Producto[] = [];
  columnas: string[] = ['nombre', 'material', 'medidas', 'precio', 'activo', 'acciones'];

  constructor(
    private productosService: ProductosService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productosService.obtenerTodos().subscribe({
      next: data => this.productos = data,
      error: err => console.error('Error al cargar productos', err)
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
        activo: 1
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

  desactivarProducto(id: number): void {
    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        titulo: 'Confirmación',
        mensaje: '¿Estás seguro de desactivar este producto?'
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.productosService.desactivar(id).subscribe({
          next: () => {
            this.cargarProductos();
            this.snackBar.open('Producto desactivado', 'Cerrar', { duration: 3000 });
          },
          error: err => console.error('Error al desactivar producto', err)
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
