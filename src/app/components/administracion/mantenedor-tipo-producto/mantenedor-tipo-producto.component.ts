import { Component, OnInit, inject } from '@angular/core';
import { TipoProducto } from '../../../models/tipo-producto.model';
import { TipoProductoService } from '../../../services/tipo-producto/tipo-producto.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FormularioTipoProductoComponent } from '../formulario-tipo-producto/formulario-tipo-producto.component';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ResponseModel } from '../../../models/response-model.model';

@Component({
  selector: 'app-mantenedor-tipo-producto',
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
  templateUrl: './mantenedor-tipo-producto.component.html',
  styleUrls: ['./mantenedor-tipo-producto.component.scss'],
})
export class MantenedorTipoProductoComponent implements OnInit {

  tiposProducto: TipoProducto[] | null = null;
  columnas: string[] = ['nombre', 'urlImagen', 'activo', 'acciones'];

  private readonly tiposProductoService = inject(TipoProductoService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.cargarTiposProducto();
  }

  cargarTiposProducto(): void {
    this.tiposProducto = null;
    this.tiposProductoService.obtenerTodos().subscribe({
      next: data => this.tiposProducto = data,
      error: err => {
        this.tiposProducto = [];
        this.snackBar.open('Error al cargar tipos de producto', 'Cerrar', { duration: 3500, panelClass: 'snack-error' });
        console.error('Error al cargar tipos de producto', err);
      }
    });
  }

  nuevoTipoProducto(): void {
    const dialogRef = this.dialog.open(FormularioTipoProductoComponent, {
      width: '500px',
      data: {
        idTipoProducto: 0,
        nombre: '',
        activo: 1,
        urlImagen: null
      } as TipoProducto
    });

    dialogRef.afterClosed().subscribe((response?: ResponseModel) => {
      console.log('Response del formulario:', response);
      if (!response) return;

      if (response.status) {
        this.cargarTiposProducto();
        this.snackBar.open(response.message || 'Tipo de producto creado', 'Cerrar', { duration: 3000 });
      } else {
        this.snackBar.open(response.message || 'Error al crear tipo de producto', 'Cerrar', {
          duration: 3500,
          panelClass: 'snack-error'
        });
      }
    });
  }

  editarTipoProducto(id: number): void {
    this.tiposProductoService.obtenerPorId(id).subscribe(tipo => {
      const dialogRef = this.dialog.open(FormularioTipoProductoComponent, {
        width: '500px',
        data: tipo
      });

      dialogRef.afterClosed().subscribe((response?: ResponseModel) => {
        console.log('Response del formulario (edición):', response); // Útil para debug
        if (!response) return;

        if (response.status) {
          this.cargarTiposProducto();
          this.snackBar.open(response.message || 'Tipo de producto actualizado', 'Cerrar', { duration: 3000 });
        } else {
          this.snackBar.open(response.message || 'Error al actualizar tipo de producto', 'Cerrar', {
            duration: 3500,
            panelClass: 'snack-error'
          });
        }
      });
    });
  }


  cambiarVigenciaTipoProducto(tipo: TipoProducto): void {
    const nuevoEstado = tipo.activo === 1 ? 0 : 1;
    const accion = nuevoEstado === 0 ? 'desactivar' : 'activar';

    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        titulo: 'Confirmación',
        mensaje: `¿Estás seguro de ${accion} este tipo de producto?`
      }
    }).afterClosed().subscribe((result?: boolean) => {
      if (result) {
        this.tiposProductoService.cambiarEstado(tipo.idTipoProducto, nuevoEstado).subscribe({
          next: () => {
            this.cargarTiposProducto();
            this.snackBar.open(
              nuevoEstado === 0 ? 'Tipo desactivado' : 'Tipo activado',
              'Cerrar', { duration: 3000 }
            );
          },
          error: err => {
            this.snackBar.open(`Error al ${accion} tipo de producto`, 'Cerrar', { duration: 3500, panelClass: 'snack-error' });
            console.error(`Error al ${accion} tipo de producto`, err);
          }
        });
      }
    });
  }

  eliminarTipoProducto(id: number): void {
    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        titulo: 'Confirmación',
        mensaje: '¿Estás seguro de eliminar este tipo de producto permanentemente?'
      }
    }).afterClosed().subscribe((result?: boolean) => {
      if (result) {
        this.tiposProductoService.eliminar(id).subscribe({
          next: () => {
            this.cargarTiposProducto();
            this.snackBar.open('Tipo de producto eliminado', 'Cerrar', { duration: 3000 });
          },
          error: err => {
            this.snackBar.open('Error al eliminar tipo de producto', 'Cerrar', { duration: 3500, panelClass: 'snack-error' });
            console.error('Error al eliminar tipo de producto', err);
          }
        });
      }
    });
  }

  trackById(index: number, item: TipoProducto): number {
    return item.idTipoProducto;
  }
}
