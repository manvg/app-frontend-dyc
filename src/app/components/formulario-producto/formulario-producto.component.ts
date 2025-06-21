import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-formulario-producto',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './formulario-producto.component.html',
  styleUrls: ['./formulario-producto.component.scss']
})
export class FormularioProductoComponent {

  producto: Producto;

  constructor(
    public dialogRef: MatDialogRef<FormularioProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Producto
  ) {
    this.producto = { ...data };
  }

  guardar(): void {
    this.dialogRef.close(this.producto);
  }

  cancelar(): void {
    this.dialogRef.close(null);
  }
}
