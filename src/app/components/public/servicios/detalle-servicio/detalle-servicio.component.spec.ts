// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { DetalleServicioComponent } from './detalle-servicio.component';
// import { ActivatedRoute } from '@angular/router';
// import { ServicioService } from '../../../../services/servicio/servicio.service';
// import { Servicio } from '../../../../models/servicio.model';
// import { of, throwError, Subject } from 'rxjs';
// import { NgIf, CurrencyPipe } from '@angular/common';
// import { RouterModule } from '@angular/router';

// describe('DetalleServicioComponent', () => {
//   let component: DetalleServicioComponent;
//   let fixture: ComponentFixture<DetalleServicioComponent>;
//   let servicioServiceSpy: jasmine.SpyObj<ServicioService>;
//   let paramMapSubject: Subject<any>;

//   const servicioMock: Servicio = {
//     idServicio: 1,
//     nombre: 'Servicio de Prueba',
//     descripcion: 'Descripción del servicio',
//     precio: 50000,
//     urlImagen: 'https://ejemplo.com/imagen.jpg',
//     activo: 1
//   };

//   beforeEach(async () => {
//     servicioServiceSpy = jasmine.createSpyObj('ServicioService', ['obtenerPorId']);
//     paramMapSubject = new Subject();

//     await TestBed.configureTestingModule({
//       imports: [DetalleServicioComponent, NgIf, CurrencyPipe, RouterModule],
//       providers: [
//         { provide: ServicioService, useValue: servicioServiceSpy },
//         { provide: ActivatedRoute, useValue: { paramMap: paramMapSubject.asObservable() } }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(DetalleServicioComponent);
//     component = fixture.componentInstance;
//   });

//   it('debe crear el componente', () => {
//     expect(component).toBeTruthy();
//   });

//   it('debe cargar el servicio correctamente si el id es válido', () => {
//     servicioServiceSpy.obtenerPorId.and.returnValue(of(servicioMock));

//     fixture.detectChanges();
//     paramMapSubject.next({ get: (key: string) => key === 'idServicio' ? '1' : null });

//     expect(servicioServiceSpy.obtenerPorId).toHaveBeenCalledWith(1);
//     expect(component.servicio).toEqual(servicioMock);
//     expect(component.loading).toBeFalse();
//     expect(component.error).toBeUndefined();
//   });

//   it('debe manejar error si el servicio no se puede cargar', () => {
//     servicioServiceSpy.obtenerPorId.and.returnValue(throwError(() => new Error('Error de red')));

//     fixture.detectChanges();
//     paramMapSubject.next({ get: () => '1' });

//     expect(component.servicio).toBeUndefined();
//     expect(component.error).toBe('No se pudo cargar el servicio');
//     expect(component.loading).toBeFalse();
//   });

//   it('debe mostrar mensaje de error si el id no es válido', () => {
//     fixture.detectChanges();
//     paramMapSubject.next({ get: () => 'abc' }); // no numérico

//     expect(component.servicio).toBeUndefined();
//     expect(component.error).toBe('ID no válido');
//   });

//   it('debe desuscribirse correctamente al destruir el componente', () => {
//     servicioServiceSpy.obtenerPorId.and.returnValue(of(servicioMock));
//     fixture.detectChanges();
//     paramMapSubject.next({ get: () => '1' });

//     const paramSubSpy = spyOn(component['paramSub']!, 'unsubscribe');
//     const servicioSubSpy = spyOn(component['servicioSub']!, 'unsubscribe');

//     component.ngOnDestroy();

//     expect(paramSubSpy).toHaveBeenCalled();
//     expect(servicioSubSpy).toHaveBeenCalled();
//   });
// });
