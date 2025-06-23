import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-servicio-destacado',
  standalone: true,
  imports: [NgClass],
  templateUrl: './servicio-destacado.component.html',
  styleUrls: ['./servicio-destacado.component.scss'],
})
export class ServicioDestacadoComponent {
  @Input() titulo = '';
  @Input() descripcion = '';
  @Input() imagen = '';
  @Input() orientacion: 'izquierda' | 'derecha' = 'izquierda';
}
