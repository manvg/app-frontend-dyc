import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormularioServicioComponent } from './formulario-servicio.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { ServicioService } from '../../../services/servicio/servicio.service';
import { ImageService } from '../../../services/image/image.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FormularioServicioComponent', () => {
  let component: FormularioServicioComponent;
  let fixture: ComponentFixture<FormularioServicioComponent>;

  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  const mockServicio = {
    idServicio: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    urlImagen: '',
    activo: 1
  };

  const mockServicioService = {
    crear: jasmine.createSpy('crear').and.returnValue(of({ ...mockServicio, idServicio: 1 })),
    actualizar: jasmine.createSpy('actualizar').and.returnValue(of({ ...mockServicio }))
  };

  const mockImageService = {
    uploadImage: jasmine.createSpy('uploadImage').and.returnValue(of('https://mock.url/servicio.jpg'))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioServicioComponent, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockServicio },
        { provide: ServicioService, useValue: mockServicioService },
        { provide: ImageService, useValue: mockImageService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  // it('debe cerrar el diálogo al cancelar', () => {
  //   component.cancelar();
  //   expect(mockDialogRef.close).toHaveBeenCalledWith(null);
  // });

  // it('debe guardar un nuevo servicio', fakeAsync(() => {
  //   component.servicio = {
  //     idServicio: 0,
  //     nombre: 'Nuevo Servicio',
  //     descripcion: 'Servicio de prueba',
  //     precio: 10000,
  //     urlImagen: '',
  //     activo: 1
  //   };

  //   component.imagenFile = new File([''], 'servicio.jpg');

  //   const expectedResponse = {
  //     status: true,
  //     message: 'Servicio creado exitosamente'
  //   };

  //   component.guardar();
  //   tick();

  //   expect(mockImageService.uploadImage).toHaveBeenCalled();
  //   expect(mockServicioService.crear).toHaveBeenCalled();
  //   expect(mockDialogRef.close).toHaveBeenCalledWith(expectedResponse);
  // }));

  // it('debe mostrar error si ocurre un fallo al guardar', fakeAsync(() => {
  //   mockServicioService.crear.and.returnValue(throwError(() => ({
  //     error: { message: 'Error desde backend' }
  //   })));

  //   component.servicio.idServicio = 0;
  //   component.guardar();
  //   tick();

  //   expect(component.mensajeError).toBe('Error desde backend');
  // }));

  // it('debe rechazar imágenes mayores al límite de tamaño', () => {
  //   const file = new File([new ArrayBuffer(4 * 1024 * 1024)], 'grande.jpg'); // 4MB
  //   const event = {
  //     target: { files: [file] }
  //   } as unknown as Event;

  //   component.onImagenSeleccionada(event);

  //   expect(component.mensajeError).toContain('supera el límite');
  //   expect(component.imagenPreview).toBeNull();
  //   expect(component.imagenFile).toBeNull();
  // });
});
