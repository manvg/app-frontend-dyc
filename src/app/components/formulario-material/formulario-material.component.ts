import { Component, Inject, OnInit } from '@angular/core';
import { Material } from '../../models/material.model';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-formulario-material',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './formulario-material.component.html',
  styleUrl: './formulario-material.component.scss'
})
export class FormularioMaterialComponent  implements OnInit{
  material: Material;

  constructor(
    public dialogRef: MatDialogRef<FormularioMaterialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Material
  ) {
    this.material = { ...data };
  }

  ngOnInit(): void {}

  guardar(): void {
    this.dialogRef.close(this.material);
  }

  cancelar(): void {
    this.dialogRef.close(null);
  }
}
