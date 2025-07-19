import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormularioServicioComponent } from './formulario-servicio.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServicioService } from '../../../services/servicio/servicio.service';
import { ImageService } from '../../../services/image/image.service';
import { of, throwError } from 'rxjs';
import { Servicio } from '../../../models/servicio.model';

describe('FormularioServicioComponent', () => {
  let component: FormularioServicioComponent;
  let fixture: ComponentFixture<FormularioServicioComponent>;
  let mockServicioService: jasmine.SpyObj<ServicioService>;
  let mockImageService: jasmine.SpyObj<ImageService>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<FormularioServicioComponent>>;

  const mockServicio: Servicio = {
    idServicio: 1,
    nombre: 'Corte Láser',
    descripcion: 'Servicio de corte',
    precio: 10000,
    urlImagen: 'https://mock.com/img.jpg',
    activo: 1
  };

  beforeEach(async () => {
    mockServicioService = jasmine.createSpyObj('ServicioService', ['crear', 'actualizar']);
    mockImageService = jasmine.createSpyObj('ImageService', ['uploadImage']);
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [FormularioServicioComponent],
      providers: [
        { provide: ServicioService, useValue: mockServicioService },
        { provide: ImageService, useValue: mockImageService },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockServicio }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
    expect(component.servicio.nombre).toBe('Corte Láser');
  });

  it('debe cerrar el diálogo con null al cancelar', () => {
    component.cancelar();
    expect(mockDialogRef.close).toHaveBeenCalledWith(null);
  });

  it('debe crear un servicio si no tiene idServicio', fakeAsync(() => {
    const nuevoServicio = { ...mockServicio, idServicio: 0 };
    component.servicio = nuevoServicio;
    mockServicioService.crear.and.returnValue(of(mockServicio));
    component.imagenFile = null;

    component.guardar();
    tick();

    expect(mockServicioService.crear).toHaveBeenCalled();
    expect(mockDialogRef.close).toHaveBeenCalledWith(jasmine.objectContaining({
      status: true,
      message: 'Servicio creado exitosamente'
    }));
  }));

  it('debe actualizar el servicio si tiene idServicio', fakeAsync(() => {
    mockServicioService.actualizar.and.returnValue(of(mockServicio));
    component.imagenFile = null;

    component.guardar();
    tick();

    expect(mockServicioService.actualizar).toHaveBeenCalledWith(1, jasmine.any(Object));
    expect(mockDialogRef.close).toHaveBeenCalledWith(jasmine.objectContaining({
      status: true,
      message: 'Servicio actualizado exitosamente'
    }));
  }));

  it('debe manejar errores en el guardado', fakeAsync(() => {
    mockServicioService.actualizar.and.returnValue(throwError(() => ({
      error: { message: 'Error en servidor' }
    })));

    component.guardar();
    tick();

    expect(component.mensajeError).toBe('Error en servidor');
  }));
});
