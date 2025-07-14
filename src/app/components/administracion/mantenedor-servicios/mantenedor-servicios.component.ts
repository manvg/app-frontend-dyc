import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Servicio } from '../../../models/servicio.model';
import { ServicioService } from '../../../services/servicio/servicio.service';
import { FormularioServicioComponent } from '../formulario-servicio/formulario-servicio.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-mantenedor-servicios',
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
  templateUrl: './mantenedor-servicios.component.html',
  styleUrls: ['./mantenedor-servicios.component.scss']
})
export class MantenedorServiciosComponent implements OnInit {
  servicios: Servicio[] | null = null;
  columnas: string[] = ['nombre', 'precio', 'activo', 'acciones'];

  private servicioService = inject(ServicioService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios(): void {
    this.servicios = null;
    this.servicioService.obtenerTodos().subscribe({
      next: data => this.servicios = data,
      error: err => {
        console.error('Error cargando servicios', err);
        this.snackBar.open('Error cargando servicios', 'Cerrar', { duration: 3000, panelClass: 'snack-error' });
        this.servicios = [];
      }
    });
  }

  nuevoServicio(): void {
      const dialogRef = this.dialog.open(FormularioServicioComponent, {
        width: '480px',
        data: {
        idServicio: 0,
        nombre: '',
        descripcion: '',
        precio: 0,
        urlImagen: '',
        activo: 1
      } as Servicio
      });
  
      dialogRef.afterClosed().subscribe((result?: Servicio) => {
        if (result) {
          this.servicioService.crear(result).subscribe({
            next: () => {
              this.cargarServicios();
              this.snackBar.open('Material creado', 'Cerrar', { duration: 3000 });
            },
            error: err => {
              console.error('Error creando material', err);
              this.snackBar.open('Error al crear material', 'Cerrar', {
                duration: 3500,
                panelClass: 'snack-error'
              });
            }
          });
        }
      });
    }

  editarServicio(id: number): void {
      this.servicioService.obtenerPorId(id).subscribe(servicio => {
        const dialogRef = this.dialog.open(FormularioServicioComponent, {
          width: '480px',
          data: servicio
        });
        dialogRef.afterClosed().subscribe((result?: Servicio) => {
          if (result)  {
            this.servicioService.actualizar(id, result).subscribe({
              next: () => {
                this.cargarServicios();
                this.snackBar.open('Servicio Actualizado', 'Cerrar', {duration: 3000});
              },
              error: err => {
                console.error('Error actualizando servicio', err);
                this.snackBar.open('Error al actualizar servicio', 'Cerrar', {
                  duration: 3500,
                  panelClass: 'snack-error'
                });
              }
            });
          }
        });
      });
    }

  cambiarVigenciaServicio(serv: Servicio): void {
    const id = serv.idServicio!;  // <-- aserción no-null
    const activo = serv.activo === 1 ? 0 : 1;
    const acción = activo === 1 ? 'activar' : 'desactivar';

    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        titulo: 'Confirmación',
        mensaje: `¿Seguro de ${acción} este servicio?`
      }
    }).afterClosed().subscribe((ok?: boolean) => {
      if (!ok) return;
      this.servicioService.cambiarEstado(id, activo).subscribe({
        next: () => {
          this.snackBar.open(`Servicio ${acción}`, 'Cerrar', { duration: 3000 });
          this.cargarServicios();
        },
        error: err => {
          console.error(`Error al ${acción} servicio`, err);
          this.snackBar.open(`Error al ${acción} servicio`, 'Cerrar', { duration: 3500, panelClass: 'snack-error' });
        }
      });
    });
  }

  eliminarServicio(id?: number): void {
    if (id == null) return;
    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        titulo: 'Confirmación',
        mensaje: '¿Seguro de eliminar este servicio?'
      }
    }).afterClosed().subscribe((ok?: boolean) => {
      if (!ok) return;
      this.servicioService.eliminar(id).subscribe({
        next: () => {
          this.snackBar.open('Servicio eliminado', 'Cerrar', { duration: 3000 });
          this.cargarServicios();
        },
        error: err => {
          console.error('Error eliminando servicio', err);
          this.snackBar.open('Error al eliminar servicio', 'Cerrar', { duration: 3500, panelClass: 'snack-error' });
        }
      });
    });
  }

  trackById(idx: number, item: Servicio): number {
    return item.idServicio;
  }
}
