import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Servicio } from '../../../models/servicio.model';
import { NgIf, CurrencyPipe } from '@angular/common';
import { SERVICIOS_MOCK } from '../lista-servicios.mock-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle-servicio',
  templateUrl: './detalle-servicio.component.html',
  styleUrls: ['./detalle-servicio.component.scss'],
  standalone: true,
  imports: [NgIf, CurrencyPipe]
})
export class DetalleServicioComponent implements OnInit, OnDestroy {
  servicio?: Servicio;
  private paramSub?: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.paramSub = this.route.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('idServicio'));
      this.servicio = SERVICIOS_MOCK.find(s => s.idServicio === id);
    });
  }

  ngOnDestroy(): void {
    this.paramSub?.unsubscribe();
  }
}
