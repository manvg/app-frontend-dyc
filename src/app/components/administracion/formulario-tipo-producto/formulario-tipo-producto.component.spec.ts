import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormularioTipoProductoComponent } from './formulario-tipo-producto.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipoProductoService } from '../../../services/tipo-producto/tipo-producto.service';
import { ImageService } from '../../../services/image/image.service';
import { of, throwError } from 'rxjs';
import { TipoProducto } from '../../../models/tipo-producto.model';

describe('FormularioTipoProductoComponent', () => {
  let component: FormularioTipoProductoComponent;
  let fixture: ComponentFixture<FormularioTipoProductoComponent>;
  let mockTipoProductoService: jasmine.SpyObj<TipoProductoService>;
  let mockImageService: jasmine.SpyObj<ImageService>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<FormularioTipoProductoComponent>>;

  const tipoProductoMock: TipoProducto = {
    idTipoProducto: 2,
    nombre: 'Tipo A',
    urlImagen: 'https://mock.com/img.jpg',
    activo: 1
  };

  beforeEach(async () => {
    mockTipoProductoService = jasmine.createSpyObj('TipoProductoService', ['crear', 'actualizar']);
    mockImageService = jasmine.createSpyObj('ImageService', ['uploadImage']);
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [FormularioTipoProductoComponent],
      providers: [
        { provide: TipoProductoService, useValue: mockTipoProductoService },
        { provide: ImageService, useValue: mockImageService },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: tipoProductoMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioTipoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
    expect(component.tipoProducto.nombre).toBe('Tipo A');
  });

  it('debe cerrar el diálogo con null al cancelar', () => {
    component.cancelar();
    expect(mockDialogRef.close).toHaveBeenCalledWith(null);
  });

  it('debe actualizar si tipoProducto tiene id', fakeAsync(() => {
    mockTipoProductoService.actualizar.and.returnValue(of({ status: true, message: 'Actualizado' }));

    component.guardar();
    tick();

    expect(mockTipoProductoService.actualizar).toHaveBeenCalledWith(2, jasmine.any(Object));
    expect(mockDialogRef.close).toHaveBeenCalledWith(jasmine.objectContaining({ status: true }));
  }));

  it('debe crear si tipoProducto no tiene id', fakeAsync(() => {
    component.tipoProducto.idTipoProducto = 0;
    mockTipoProductoService.crear.and.returnValue(of({ status: true, message: 'Creado' }));

    component.guardar();
    tick();

    expect(mockTipoProductoService.crear).toHaveBeenCalledWith(jasmine.any(Object));
    expect(mockDialogRef.close).toHaveBeenCalledWith(jasmine.objectContaining({ status: true }));
  }));

  it('debe manejar error en guardar', fakeAsync(() => {
    mockTipoProductoService.actualizar.and.returnValue(throwError(() => ({
      error: { message: 'Error del servidor' }
    })));

    component.guardar();
    tick();

    expect(component.mensajeError).toBe('Error del servidor');
  }));
});
