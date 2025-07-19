import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormularioProductoComponent } from './formulario-producto.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { TipoProductoService } from '../../../services/tipo-producto/tipo-producto.service';
import { MaterialService } from '../../../services/material/material.service';
import { ImageService } from '../../../services/image/image.service';
import { ProductosService } from '../../../services/productos/productos.service';
import { Producto } from '../../../models/producto.model';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FormularioProductoComponent', () => {
  let component: FormularioProductoComponent;
  let fixture: ComponentFixture<FormularioProductoComponent>;

  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  const mockTipoProductoService = {
    obtenerTodos: jasmine.createSpy('obtenerTodos').and.returnValue(of([]))
  };

  const mockMaterialService = {
    obtenerTodos: jasmine.createSpy('obtenerTodos').and.returnValue(of([]))
  };

  const mockImageService = {
    uploadImage: jasmine.createSpy('uploadImage').and.returnValue(of('https://mock.url'))
  };

  const mockProductosService = {
    crear: jasmine.createSpy('crear').and.returnValue(of({ idProducto: 1 })),
    actualizar: jasmine.createSpy('actualizar').and.returnValue(of({ idProducto: 1 }))
  };

  const mockProducto: Producto = {
    idProducto: 0,
    nombre: 'Producto Test',
    descripcion: 'Descripción',
    idMaterial: 1,
    nombreMaterial: '',
    medidas: '10x10',
    precio: 1000,
    urlImagen: '',
    activo: 1,
    idTipoProducto: 2,
    nombreTipoProducto: '',
    cantidad: null
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioProductoComponent, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockProducto },
        { provide: TipoProductoService, useValue: mockTipoProductoService },
        { provide: MaterialService, useValue: mockMaterialService },
        { provide: ImageService, useValue: mockImageService },
        { provide: ProductosService, useValue: mockProductosService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar tipos de producto y materiales al iniciar', () => {
    expect(mockTipoProductoService.obtenerTodos).toHaveBeenCalled();
    expect(mockMaterialService.obtenerTodos).toHaveBeenCalled();
  });

  it('debería cerrar el diálogo al cancelar', () => {
    component.cancelar();
    expect(mockDialogRef.close).toHaveBeenCalledWith(null);
  });

  it('debería guardar un nuevo producto', fakeAsync(() => {
    component.producto = {
      idProducto: 0,
      nombre: 'Producto Test',
      descripcion: 'Descripción de prueba',
      idMaterial: 1,
      nombreMaterial: '',
      medidas: '10x10',
      precio: 1000,
      urlImagen: '',
      activo: 1,
      idTipoProducto: 2,
      nombreTipoProducto: '',
      cantidad: null
    };

    component.materiales = [{ idMaterial: 1, nombre: 'Madera', activo: 1 }];
    component.tiposProducto = [{ idTipoProducto: 2, nombre: 'TipoX', urlImagen: '', activo: 1 }];
    component.imagenFile = new File([''], 'producto.jpg');

    const resultadoMock: Producto = {
      ...component.producto,
      nombreMaterial: 'Madera',
      nombreTipoProducto: 'TipoX',
      urlImagen: 'https://mock.url/producto.jpg',
      idProducto: 1
    };

    mockImageService.uploadImage.and.returnValue(of('https://mock.url/producto.jpg'));
    mockProductosService.crear.and.returnValue(of(resultadoMock));

    component.guardar();
    tick();

    expect(mockDialogRef.close).toHaveBeenCalledWith(resultadoMock);
  }));

  it('debería mostrar mensaje de error si falla el guardado', fakeAsync(() => {
    mockProductosService.crear.and.returnValue(throwError(() => ({ error: { message: 'Error mock' } })));
    component.producto.idProducto = 0;
    component.producto.nombre = 'Producto con error';
    component.producto.descripcion = 'Descripción';
    component.producto.idMaterial = 1;
    component.producto.medidas = '10x10';
    component.producto.precio = 1000;
    component.producto.idTipoProducto = 2;

    component.guardar();
    tick();

    expect(component.mensajeError).toBe('Error mock');
  }));
});
