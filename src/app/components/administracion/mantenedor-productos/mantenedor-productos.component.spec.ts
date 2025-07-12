import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MantenedorProductosComponent } from './mantenedor-productos.component';
import { ProductosService } from '../../../services/productos/productos.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Producto } from '../../../models/producto.model';
import { CommonModule } from '@angular/common';

describe('MantenedorProductosComponent', () => {
  let component: MantenedorProductosComponent;
  let fixture: ComponentFixture<MantenedorProductosComponent>;
  let mockProductosService: jasmine.SpyObj<ProductosService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const productosMock: Producto[] = [
    {
      idProducto: 1,
      nombre: 'Producto 1',
      descripcion: 'Desc',
      material: 'Madera',
      medidas: '10x10',
      precio: 5000,
      urlImagen: '',
      activo: 1,
      idTipoProducto: 1
    }
  ];

  beforeEach(async () => {
    mockProductosService = jasmine.createSpyObj('ProductosService', [
      'obtenerTodos', 'desactivar', 'eliminar'
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [MantenedorProductosComponent, CommonModule],
      providers: [
        { provide: ProductosService, useValue: mockProductosService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MantenedorProductosComponent);
    component = fixture.componentInstance;
  });

  it('debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar productos al inicializar', () => {
    mockProductosService.obtenerTodos.and.returnValue(of(productosMock));
    fixture.detectChanges();

    expect(component.productos.length).toBe(1);
    expect(component.productos[0].nombre).toBe('Producto 1');
    expect(mockProductosService.obtenerTodos).toHaveBeenCalled();
  });

  it('debe redirigir al formulario de nuevo producto', () => {
    component.nuevoProducto();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/productos/nuevo']);
  });

  it('debe redirigir al formulario de edición de producto', () => {
    component.editarProducto(99);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/productos/editar', 99]);
  });

  // it('debe desactivar un producto', () => {
  //   spyOn(window, 'confirm').and.returnValue(true);
  //   mockProductosService.desactivar.and.returnValue(of());

  //   component.desactivarProducto(1);
  //   expect(mockProductosService.desactivar).toHaveBeenCalledWith(1);
  // });

  it('debe eliminar un producto si se confirma', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    mockProductosService.eliminar.and.returnValue(of());

    component.eliminarProducto(1);
    expect(mockProductosService.eliminar).toHaveBeenCalledWith(1);
  });
});
