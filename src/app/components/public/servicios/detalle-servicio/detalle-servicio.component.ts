import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Servicio } from '../../../../models/servicio.model';
import { NgIf, CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { ServicioService } from '../../../../services/servicio/servicio.service'; // Asegúrate de la ruta
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-detalle-servicio',
  templateUrl: './detalle-servicio.component.html',
  styleUrls: ['./detalle-servicio.component.scss'],
  standalone: true,
  imports: [NgIf, CurrencyPipe, RouterModule]
})
export class DetalleServicioComponent implements OnInit, OnDestroy {
  servicio?: Servicio;
  loading = false;
  error?: string;
  private paramSub?: Subscription;
  private servicioSub?: Subscription;

  private route = inject(ActivatedRoute);
  private servicioService = inject(ServicioService);

  ngOnInit(): void {
    this.paramSub = this.route.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('idServicio'));
      if (!isNaN(id)) {
        this.loading = true;
        this.servicioSub = this.servicioService.obtenerPorId(id).subscribe({
          next: (servicio) => {
            this.servicio = servicio;
            this.loading = false;
          },
          error: (err) => {
            this.error = 'No se pudo cargar el servicio';
            this.loading = false;
          }
        });
      } else {
        this.error = 'ID no válido';
      }
    });
  }

  ngOnDestroy(): void {
    this.paramSub?.unsubscribe();
    this.servicioSub?.unsubscribe();
  }
}
