import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormularioProductoComponent } from './formulario-producto.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { TipoProductoService } from '../../../services/tipo-producto/tipo-producto.service';
import { MaterialService } from '../../../services/material/material.service';
import { ImageService } from '../../../services/image/image.service';
import { ProductosService } from '../../../services/productos/productos.service';
import { Producto } from '../../../models/producto.model';

describe('FormularioProductoComponent', () => {
  let component: FormularioProductoComponent;
  let fixture: ComponentFixture<FormularioProductoComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<FormularioProductoComponent>>;
  let tipoProductoServiceSpy: jasmine.SpyObj<TipoProductoService>;
  let materialServiceSpy: jasmine.SpyObj<MaterialService>;
  let imageServiceSpy: jasmine.SpyObj<ImageService>;
  let productoServiceSpy: jasmine.SpyObj<ProductosService>;

  const productoMock: Producto = {
    idProducto: 1,
    nombre: 'Producto de prueba',
    descripcion: 'Descripción del producto de prueba',
    idMaterial: 10,
    nombreMaterial: 'Acrílico',
    medidas: '30x20 cm',
    precio: 15000,
    urlImagen: 'https://ejemplo.com/imagen.jpg',
    activo: 1,
    idTipoProducto: 2,
    nombreTipoProducto: 'Decorativo',
    cantidad: 5
  };


  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    tipoProductoServiceSpy = jasmine.createSpyObj('TipoProductoService', ['obtenerTodos']);
    materialServiceSpy = jasmine.createSpyObj('MaterialService', ['obtenerTodos']);
    imageServiceSpy = jasmine.createSpyObj('ImageService', ['uploadImage']);
    productoServiceSpy = jasmine.createSpyObj('ProductosService', ['crear', 'actualizar']);

    await TestBed.configureTestingModule({
      imports: [FormularioProductoComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: productoMock },
        { provide: TipoProductoService, useValue: tipoProductoServiceSpy },
        { provide: MaterialService, useValue: materialServiceSpy },
        { provide: ImageService, useValue: imageServiceSpy },
        { provide: ProductosService, useValue: productoServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
    expect(component.producto.nombre).toBe('Test Producto');
  });

  it('debe cargar tipos de producto correctamente', () => {
    tipoProductoServiceSpy.obtenerTodos.and.returnValue(of([{ idTipoProducto: 1, nombre: 'Tipo 1', activo: 1 }]));
    component.cargarTiposProducto();
    expect(tipoProductoServiceSpy.obtenerTodos).toHaveBeenCalled();
  });

  it('debe cargar materiales correctamente', () => {
    materialServiceSpy.obtenerTodos.and.returnValue(of([{ idMaterial: 1, nombre: 'Madera', descripcion: '', activo: 1 }]));
    component['cargarMateriales']();
    expect(materialServiceSpy.obtenerTodos).toHaveBeenCalled();
  });

  it('debe cancelar correctamente', () => {
    component.cancelar();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(null);
  });

  it('debe mostrar error si el servicio falla al guardar', fakeAsync(() => {
    component.imagenFile = null; // para evitar subida
    productoServiceSpy.actualizar.and.returnValue(throwError(() => ({ error: { message: 'Error mock' } })));
    component.guardar();
    tick();
    expect(component.mensajeError).toBe('Error mock');
  }));

  it('debe guardar correctamente producto actualizado', fakeAsync(() => {
    component.imagenFile = null;
    productoServiceSpy.actualizar.and.returnValue(of(productoMock));
    component.guardar();
    tick();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(productoMock);
  }));

  it('debe guardar correctamente un nuevo producto', fakeAsync(() => {
    const nuevoProducto = { ...productoMock, idProducto: 0 };
    component.producto = nuevoProducto;
    component.imagenFile = null;
    productoServiceSpy.crear.and.returnValue(of(nuevoProducto));
    component.guardar();
    tick();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(nuevoProducto);
  }));
});
