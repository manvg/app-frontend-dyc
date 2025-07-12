import { Component, inject, OnInit } from '@angular/core';
import { Material } from '../../../models/material.model';
import { MaterialService } from '../../../services/material/material.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FormularioMaterialComponent } from '../formulario-material/formulario-material.component';

@Component({
  selector: 'app-mantenedor-materiales',
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
    MatProgressSpinnerModule,
  ],
  templateUrl: './mantenedor-materiales.component.html',
  styleUrl: './mantenedor-materiales.component.scss'
})
export class MantenedorMaterialesComponent implements OnInit{

  materiales: Material[] | null = null;
  columnas: string[] = ['nombre', 'activo', 'acciones'];

  private readonly materialService = inject(MaterialService);
  private readonly dialog = inject(MatDialog);
  private readonly snackbar = inject(MatSnackBar);

  ngOnInit(): void {
    this.cargarMateriales();
  }

  cargarMateriales(): void {
    this.materiales = null;
    this.materialService.obtenerTodos().subscribe({
      next: data => this.materiales = data,
      error: err => {
        this.materiales = [];
        console.error('Error cargando materiales', err);
        this.snackbar.open('Error al cargar materiales', 'Cerrar', {
          duration: 3500,
          panelClass: 'snack-error'
        });
      }
    });
  }

  nuevoMaterial(): void {
    const dialogRef = this.dialog.open(FormularioMaterialComponent, {
      width: '480px',
      data: { idMaterial: 0, nombre: '', activo: 1 } as Material
    });

    dialogRef.afterClosed().subscribe((result?: Material) => {
      if (result) {
        this.materialService.crear(result).subscribe({
          next: () => {
            this.cargarMateriales();
            this.snackbar.open('Material creado', 'Cerrar', { duration: 3000 });
          },
          error: err => {
            console.error('Error creando material', err);
            this.snackbar.open('Error al crear material', 'Cerrar', {
              duration: 3500,
              panelClass: 'snack-error'
            });
          }
        });
      }
    });
  }

  editarMaterial(id: number): void {
    this.materialService.obtenerPorId(id).subscribe(material => {
      const dialogRef = this.dialog.open(FormularioMaterialComponent, {
        width: '480px',
        data: material
      });
      dialogRef.afterClosed().subscribe((result?: Material) => {
        if (result)  {
          this.materialService.actualizar(id, result).subscribe({
            next: () => {
              this.cargarMateriales();
              this.snackbar.open('Material Actualizado', 'Cerrar', {duration: 3000});
            },
            error: err => {
              console.error('Error actualizando material', err);
              this.snackbar.open('Error al actualizar material', 'Cerrar', {
                duration: 3500,
                panelClass: 'snack-error'
              });
            }
          });
        }
      });
    });
  }

  cambiarVigenciaMaterial(mat: Material): void {
    const nuevoEstado = mat.activo === 1 ? 0 : 1;
    const accion = nuevoEstado === 0 ? 'desactivar' : 'activar';

    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        titulo: 'Confirmacion',
        mensaje: 'Estas seguro de ${accion} este material?'
      }
    }).afterClosed().subscribe((confirm?: boolean) => {
      if (confirm) {
        this.materialService.cambiarEstado(mat.idMaterial, nuevoEstado).subscribe({
          next: () => {
            this.cargarMateriales();
            this.snackbar.open(
              nuevoEstado === 0 ? 'Material desactivado' :'Material activado',
              'Cerrar', { duration: 3000 }
            );
          },
          error: err => {
            console.error(`Error al ${accion} material`, err);
            this.snackbar.open(`Error al ${accion} material`, 'Cerrar', {
              duration: 3500,
              panelClass: 'snack-error'
            });
          }
        });
      }
    });
  }

  eliminarMaterial(id: number): void {
    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        titulo: 'Confirmacion',
        mensaje: '¿Eliminar este material permanente?'
      }
    }).afterClosed().subscribe((confirm?: boolean) => {
      if (confirm) {
        this.materialService.eliminar(id).subscribe({
          next: () => {
            this.cargarMateriales();
            this.snackbar.open('MAterial eliminado', 'Cerrar', { duration: 3000});
          },
          error: err => {
            console.error('Error eliminando material', err);
            this.snackbar.open('Error al eliminar material', 'Cerrar', {
              duration: 3500,
              panelClass: 'snack-error'
            });
          }
        });
      }
    });
  }

  trackById(index: number, item: Material): number {
    return item.idMaterial;
  }

}
