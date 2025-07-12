import { Component } from '@angular/core';
import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { Servicio } from '../../../../models/servicio.model';
import { Router } from '@angular/router';
import { SERVICIOS_MOCK } from '../lista-servicios.mock-data';

@Component({
  selector: 'app-lista-servicios',
  templateUrl: './lista-servicios.component.html',
  styleUrls: ['./lista-servicios.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe]
})
export class ListaServiciosComponent {
  constructor(private router: Router) {}

  servicios: Servicio[] = SERVICIOS_MOCK;

  verDetalle(idServicio: number) {
    this.router.navigate(['/servicios', idServicio]);
  }
}
