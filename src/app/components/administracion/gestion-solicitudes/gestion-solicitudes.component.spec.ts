// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { GestionSolicitudesComponent } from './gestion-solicitudes.component';
// import { SolicitudService } from '../../../services/solicitud/solicitud.service';
// import { Router } from '@angular/router';
// import { of, throwError } from 'rxjs';
// import { Solicitud } from '../../../models/solicitud.models';
// import { FormsModule } from '@angular/forms';
// import { DatePipe } from '@angular/common';

// describe('GestionSolicitudesComponent', () => {
//   let component: GestionSolicitudesComponent;
//   let fixture: ComponentFixture<GestionSolicitudesComponent>;
//   let solicitudServiceSpy: jasmine.SpyObj<SolicitudService>;
//   let routerSpy: jasmine.SpyObj<Router>;

//   beforeEach(waitForAsync(() => {
//     const solicitudServiceMock = jasmine.createSpyObj('SolicitudService', ['obtenerTodos', 'eliminar']);
//     const routerMock = jasmine.createSpyObj('Router', ['navigate']);

//     TestBed.configureTestingModule({
//       imports: [GestionSolicitudesComponent, FormsModule],
//       providers: [
//         { provide: SolicitudService, useValue: solicitudServiceMock },
//         { provide: Router, useValue: routerMock },
//         DatePipe
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(GestionSolicitudesComponent);
//     component = fixture.componentInstance;
//     solicitudServiceSpy = TestBed.inject(SolicitudService) as jasmine.SpyObj<SolicitudService>;
//     routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
//   }));

//   it('debe crearse correctamente', () => {
//     expect(component).toBeTruthy();
//   });

//   it('debe cargar y transformar las solicitudes correctamente', () => {
//     const mockSolicitudes: Solicitud[] = [
//       {
//         idSolicitud: 1,
//         idTipoSolicitud: 1,
//         idEstadoSolicitud: 1,
//         nombreCliente: 'Juan Pérez',
//         correoCliente: 'juan@test.com',
//         productos: [
//           { idProducto: 1, cantidad: 2, nombreProducto: 'Producto A' },
//           { idProducto: 2, cantidad: 1, nombreProducto: 'Producto B' }
//         ],
//         fechaCreacion: '2025-07-18T12:00:00Z'
//       }
//     ];

//     solicitudServiceSpy.obtenerTodos.and.returnValue(of(mockSolicitudes));

//     component.cargarSolicitudes();

//     expect(component.solicitudes.length).toBe(1);
//     expect(component.solicitudes[0].productos).toBe('Producto A, Producto B');
//     expect(component.loading).toBeFalse();
//   });

//   it('debe mostrar error si falla la carga de solicitudes', () => {
//     solicitudServiceSpy.obtenerTodos.and.returnValue(throwError(() => new Error('Error')));

//     component.cargarSolicitudes();

//     expect(component.error).toBe('Error al cargar las solicitudes');
//     expect(component.loading).toBeFalse();
//   });

//   it('debe seleccionar una solicitud correctamente', () => {
//     const mockSolicitud = {
//       idSolicitud: 10,
//       nombreCliente: 'Test',
//       fechaCreacion: new Date()
//     } as any;

//     component.seleccionarSolicitud(mockSolicitud);
//     expect(component.solicitudSeleccionada).toBe(mockSolicitud);
//   });

//   it('debe redirigir al detalle de una solicitud', () => {
//     const mockSolicitud = { idSolicitud: 15 } as any;
//     component.verDetalle(mockSolicitud);
//     expect(routerSpy.navigate).toHaveBeenCalledWith(['/solicitudes', 15]);
//   });

//   it('debe eliminar una solicitud si se confirma', () => {
//     spyOn(window, 'confirm').and.returnValue(true);
//     const mockId = 99;
//     component.solicitudSeleccionada = { idSolicitud: mockId } as any;
//     solicitudServiceSpy.eliminar.and.returnValue(of(undefined));
//     spyOn(component, 'cargarSolicitudes');

//     component.eliminarSolicitud();

//     expect(solicitudServiceSpy.eliminar).toHaveBeenCalledWith(mockId);
//     expect(component.cargarSolicitudes).toHaveBeenCalled();
//   });

//   it('no debe eliminar si no hay solicitud seleccionada', () => {
//     component.solicitudSeleccionada = undefined;
//     component.eliminarSolicitud();
//     expect(solicitudServiceSpy.eliminar).not.toHaveBeenCalled();
//   });

// });
