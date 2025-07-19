import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SolicitudServicioComponent } from '../../public/solicitudes/solicitud-servicio/solicitud-servicio.component';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ServicioService } from '../../../services/servicio/servicio.service';
import { SolicitudService } from '../../../services/solicitud/solicitud.service';
import { Servicio } from '../../../models/servicio.model';
import { Solicitud } from '../../../models/solicitud.models';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('SolicitudServicioComponent', () => {
  let component: SolicitudServicioComponent;
  let fixture: ComponentFixture<SolicitudServicioComponent>;
  let solicitudServiceSpy: jasmine.SpyObj<SolicitudService>;
  let servicioServiceSpy: jasmine.SpyObj<ServicioService>;

  beforeEach(async () => {
    solicitudServiceSpy = jasmine.createSpyObj('SolicitudService', ['crear']);
    servicioServiceSpy = jasmine.createSpyObj('ServicioService', ['obtenerPorId']);

    await TestBed.configureTestingModule({
      imports: [SolicitudServicioComponent, CommonModule, ReactiveFormsModule],
      providers: [
        { provide: SolicitudService, useValue: solicitudServiceSpy },
        { provide: ServicioService, useValue: servicioServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => key === 'idServicio' ? '42' : null
            })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener el formulario inválido al inicio', () => {
    expect(component.form.invalid).toBeTrue();
  });

  it('debería marcar campos como tocados si el formulario es inválido', () => {
    const spy = spyOn(component.form, 'markAllAsTouched');
    component.enviarSolicitud();
    expect(spy).toHaveBeenCalled();
  });

  it('debería cargar el servicio si no está definido', () => {
    component.servicio = undefined;
    const servicioMock: Servicio = {
      idServicio: 42,
      nombre: 'Servicio Test',
      descripcion: 'Servicio de prueba',
      precio: 10000,
      urlImagen: '',
      activo: 1
    };
    servicioServiceSpy.obtenerPorId.and.returnValue(of(servicioMock));
    component.ngOnInit();
    expect(servicioServiceSpy.obtenerPorId).toHaveBeenCalledWith(42);
    expect(component.servicio).toEqual(jasmine.objectContaining(servicioMock));
  });

  it('debería manejar error al cargar el servicio', () => {
    component.servicio = undefined;
    servicioServiceSpy.obtenerPorId.and.returnValue(throwError(() => new Error('Error')));
    component.ngOnInit();
    expect(component.errorEnvio).toBe('No se pudo cargar el servicio');
  });

  it('debería enviar la solicitud correctamente', fakeAsync(() => {
    const solicitudMock: Solicitud = {
      idTipoSolicitud: 1,
      idEstadoSolicitud: 1,
      idServicio: null,
      nombreCliente: 'Juan Pérez',
      correoCliente: 'juan@test.com',
      telefonoCliente: '12345678',
      observaciones: 'Requiero servicio urgente'
    };

    component.form.setValue({
      nombre: 'Juan',
      apellidos: 'Pérez',
      email: 'juan@test.com',
      telefono: '12345678',
      descripcion: 'Requiero servicio urgente'
    });

    solicitudServiceSpy.crear.and.returnValue(of(solicitudMock));

    component.enviarSolicitud();

    // Simula respuesta inmediata del observable
    tick();

    expect(solicitudServiceSpy.crear).toHaveBeenCalledWith(jasmine.objectContaining(solicitudMock));
    expect(component.enviado).toBeTrue();
    expect(component.enviando).toBeFalse();

    // Simula los 4 segundos del setTimeout interno
    tick(4000);
    expect(component.enviado).toBeFalse();
  }));

  it('debería manejar error al enviar la solicitud', () => {
    component.form.setValue({
      nombre: 'Ana',
      apellidos: 'Díaz',
      email: 'ana@test.com',
      telefono: '',
      descripcion: 'Servicio urgente'
    });

    solicitudServiceSpy.crear.and.returnValue(throwError(() => new Error('Falló')));

    component.enviarSolicitud();

    expect(component.errorEnvio).toBe('Error al enviar la solicitud. Intenta nuevamente.');
    expect(component.enviando).toBeFalse();
  });

  it('campoInvalido debería detectar campo inválido tocado', () => {
    const control = component.form.get('nombre');
    control?.markAsTouched();
    control?.setValue('');
    expect(component.campoInvalido('nombre')).toBeTrue();
  });
});
