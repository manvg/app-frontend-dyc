import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Producto } from '../../models/producto.model';
import { TipoProductoService } from '../../services/tipo-producto/tipo-producto.service';
import { TipoProducto } from '../../models/tipo-producto.model';

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

  constructor(
    public dialogRef: MatDialogRef<FormularioProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Producto,
    private tipoProductoService: TipoProductoService
  ) {
    this.producto = { ...data };
  }

  ngOnInit(): void {
    this.cargarTiposProducto();
  }

  cargarTiposProducto(): void {
    this.tipoProductoService.obtenerTodos().subscribe({
      next: (tipos) => this.tiposProducto = tipos,
      error: () => this.tiposProducto = []
    });
  }

  guardar(): void {
    this.dialogRef.close(this.producto);
  }

  cancelar(): void {
    this.dialogRef.close(null);
  }
}
