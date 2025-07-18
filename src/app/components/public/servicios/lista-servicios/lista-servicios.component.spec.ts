import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaServiciosComponent } from './lista-servicios.component';
import { ServicioService } from '../../../../services/servicio/servicio.service';
import { Servicio } from '../../../../models/servicio.model';
import { of, throwError } from 'rxjs';
import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

describe('ListaServiciosComponent', () => {
  let component: ListaServiciosComponent;
  let fixture: ComponentFixture<ListaServiciosComponent>;
  let servicioServiceSpy: jasmine.SpyObj<ServicioService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const serviciosMock: Servicio[] = [
    {
      idServicio: 1,
      nombre: 'Servicio A',
      descripcion: 'Descripción A',
      precio: 15000,
      urlImagen: 'https://imagen.com/a.jpg',
      activo: 1
    },
    {
      idServicio: 2,
      nombre: 'Servicio B',
      descripcion: 'Descripción B',
      precio: 25000,
      urlImagen: 'https://imagen.com/b.jpg',
      activo: 1
    }
  ];

  beforeEach(async () => {
    servicioServiceSpy = jasmine.createSpyObj('ServicioService', ['obtenerTodos']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ListaServiciosComponent, NgIf, NgFor, CurrencyPipe],
      providers: [
        { provide: ServicioService, useValue: servicioServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaServiciosComponent);
    component = fixture.componentInstance;
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar servicios correctamente', () => {
    servicioServiceSpy.obtenerTodos.and.returnValue(of(serviciosMock));

    fixture.detectChanges(); // dispara ngOnInit

    expect(servicioServiceSpy.obtenerTodos).toHaveBeenCalled();
    expect(component.servicios.length).toBe(2);
    expect(component.loading).toBeFalse();
    expect(component.error).toBeUndefined();
  });

  it('debe manejar error al cargar servicios', () => {
    servicioServiceSpy.obtenerTodos.and.returnValue(throwError(() => new Error('Error de red')));

    fixture.detectChanges();

    expect(component.servicios).toEqual([]);
    expect(component.loading).toBeFalse();
    expect(component.error).toBe('No se pudo cargar la lista de servicios');
  });

  it('debe navegar al detalle del servicio', () => {
    component.verDetalle(99);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/servicios', 99]);
  });
});
