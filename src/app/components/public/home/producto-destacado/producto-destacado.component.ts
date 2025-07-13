import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-producto-destacado',
  standalone: true,
  imports: [NgClass, RouterModule],
  templateUrl: './producto-destacado.component.html',
  styleUrl: './producto-destacado.component.scss'
})
export class ProductoDestacadoComponent {
  @Input() idProducto!: number;
  @Input() titulo = '';
  @Input() descripcion = '';
  @Input() imagen = '';
  @Input() orientacion: 'izquierda' | 'derecha' = 'izquierda';
}
