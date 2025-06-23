import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-producto-destacado',
  standalone: true,
  imports: [NgClass],
  templateUrl: './producto-destacado.component.html',
  styleUrl: './producto-destacado.component.scss'
})
export class ProductoDestacadoComponent {
  @Input() titulo = '';
  @Input() descripcion = '';
  @Input() imagen = '';
  @Input() orientacion: 'izquierda' | 'derecha' = 'izquierda';
}
