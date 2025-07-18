import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SolicitudServicioComponent } from './solicitud-servicio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { of, throwError, Subject } from 'rxjs';
import { ServicioService } from '../../../../services/servicio/servicio.service';
import { SolicitudService } from '../../../../services/solicitud/solicitud.service';
import { Servicio } from '../../../../models/servicio.model';
import { Solicitud } from '../../../../models/solicitud.models';

describe('SolicitudServicioComponent', () => {
  let component: SolicitudServicioComponent;
  let fixture: ComponentFixture<SolicitudServicioComponent>;
  let solicitudServiceSpy: jasmine.SpyObj<SolicitudService>;
  let servicioServiceSpy: jasmine.SpyObj<ServicioService>;
  let paramMapSubject: Subject<any>;

  const servicioMock: Servicio = {
    idServicio: 1,
    nombre: 'Servicio Test',
    descripcion: 'Descripción',
    precio: 10000,
    urlImagen: 'http://test.com/img.jpg',
    activo: 1
  };

  beforeEach(async () => {
    solicitudServiceSpy = jasmine.createSpyObj('SolicitudService', ['crear']);
    servicioServiceSpy = jasmine.createSpyObj('ServicioService', ['obtenerPorId']);
    paramMapSubject = new Subject();

    await TestBed.configureTestingModule({
      imports: [SolicitudServicioComponent, ReactiveFormsModule, CommonModule],
      providers: [
        { provide: SolicitudService, useValue: solicitudServiceSpy },
        { provide: ServicioService, useValue: servicioServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: paramMapSubject.asObservable() }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudServicioComponent);
    component = fixture.componentInstance;
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar el servicio desde route param si no se entrega por @Input()', () => {
    servicioServiceSpy.obtenerPorId.and.returnValue(of(servicioMock));

    fixture.detectChanges(); // dispara ngOnInit
    paramMapSubject.next({ get: () => '1' });

    expect(servicioServiceSpy.obtenerPorId).toHaveBeenCalledWith(1);
    expect(component.servicio).toEqual(servicioMock);
  });

  it('debe manejar error al cargar el servicio desde route param', () => {
    servicioServiceSpy.obtenerPorId.and.returnValue(throwError(() => new Error('error')));
    fixture.detectChanges();
    paramMapSubject.next({ get: () => '1' });

    expect(component.errorEnvio).toBe('No se pudo cargar el servicio');
  });

  it('debe enviar la solicitud correctamente', fakeAsync(() => {
    component.servicio = servicioMock;
    solicitudServiceSpy.crear.and.returnValue(of({
      idTipoSolicitud: 1,
      idEstadoSolicitud: 1,
      nombreCliente: 'Juan Pérez',
      correoCliente: 'juan@test.com',
      productos: [],
      imagenes: []
    } as Solicitud));

    component.form.setValue({
      nombre: 'Juan',
      apellidos: 'Pérez',
      email: 'juan@test.com',
      telefono: '123456789',
      descripcion: 'Deseo un servicio'
    });

    component.enviarSolicitud();
    tick();

    expect(solicitudServiceSpy.crear).toHaveBeenCalled();
    expect(component.enviado).toBeTrue();
    expect(component.enviando).toBeFalse();
    expect(component.errorEnvio).toBeNull();
  }));

  it('debe manejar error al enviar la solicitud', fakeAsync(() => {
    component.servicio = servicioMock;
    solicitudServiceSpy.crear.and.returnValue(throwError(() => new Error('Error al guardar')));

    component.form.setValue({
      nombre: 'Ana',
      apellidos: 'Lopez',
      email: 'ana@test.com',
      telefono: '',
      descripcion: 'Fallará'
    });

    component.enviarSolicitud();
    tick();

    expect(solicitudServiceSpy.crear).toHaveBeenCalled();
    expect(component.errorEnvio).toBe('Error al enviar la solicitud. Intenta nuevamente.');
    expect(component.enviando).toBeFalse();
  }));

  it('no debe enviar si el formulario es inválido', () => {
    component.servicio = servicioMock;
    component.form.patchValue({
      nombre: '',
      apellidos: '',
      email: '',
      telefono: '',
      descripcion: ''
    });

    component.enviarSolicitud();

    expect(solicitudServiceSpy.crear).not.toHaveBeenCalled();
    expect(component.enviando).toBeFalse();
  });
});
