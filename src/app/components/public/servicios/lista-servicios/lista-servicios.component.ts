import { Component, OnInit, inject } from '@angular/core';
import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { Servicio } from '../../../../models/servicio.model';
import { Router } from '@angular/router';
import { ServicioService } from '../../../../services/servicio/servicio.service';

@Component({
  selector: 'app-lista-servicios',
  templateUrl: './lista-servicios.component.html',
  styleUrls: ['./lista-servicios.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe]
})
export class ListaServiciosComponent implements OnInit {
  servicios: Servicio[] = [];
  loading = false;
  error?: string;

  private servicioService = inject(ServicioService);
  private router = inject(Router);

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios() {
    this.loading = true;
    this.servicioService.obtenerTodos().subscribe({
      next: servicios => {
        this.servicios = servicios;
        this.loading = false;
      },
      error: err => {
        this.error = 'No se pudo cargar la lista de servicios';
        this.loading = false;
      }
    });
  }

  verDetalle(idServicio: number) {
    this.router.navigate(['/servicios', idServicio]);
  }
}
