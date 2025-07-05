import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Servicio } from '../../../models/servicio.model';

type Orientacion = 'izquierda' | 'derecha';

@Component({
  selector: 'app-servicio-destacado',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './servicio-destacado.component.html',
  styleUrls: ['./servicio-destacado.component.scss'],
})
export class ServicioDestacadoComponent {
  @Input() servicio!: Servicio;
  @Input() orientacion: Orientacion = 'izquierda';
}
