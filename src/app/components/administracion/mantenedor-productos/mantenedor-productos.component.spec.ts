import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MantenedorProductosComponent } from './mantenedor-productos.component';
import { ProductosService } from '../../../services/productos/productos.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { Producto } from '../../../models/producto.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FormularioProductoComponent } from '../formulario-producto/formulario-producto.component';

describe('MantenedorProductosComponent', () => {
  let component: MantenedorProductosComponent;
  let fixture: ComponentFixture<MantenedorProductosComponent>;
  let mockProductosService: jasmine.SpyObj<ProductosService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  const mockProductos: Producto[] = [
    { idProducto: 1, nombre: 'Producto 1', descripcion: '', idMaterial: 1, nombreMaterial: '', medidas: '', precio: 1000, urlImagen: '', activo: 1, idTipoProducto: 1, nombreTipoProducto: 'Tipo A', cantidad: 10 },
    { idProducto: 2, nombre: 'Producto 2', descripcion: '', idMaterial: 1, nombreMaterial: '', medidas: '', precio: 2000, urlImagen: '', activo: 1, idTipoProducto: 2, nombreTipoProducto: 'Tipo B', cantidad: 5 },
  ];

  beforeEach(async () => {
    mockProductosService = jasmine.createSpyObj<ProductosService>('ProductosService', [
      'obtenerTodos',
      'obtenerPorId',
      'cambiarEstado',
      'eliminar'
    ]);
    mockDialog = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);
    mockSnackBar = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [MantenedorProductosComponent],
      providers: [
        { provide: ProductosService, useValue: mockProductosService },
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MantenedorProductosComponent);
    component = fixture.componentInstance;
  });

  it('debe cargar productos correctamente', () => {
    mockProductosService.obtenerTodos.and.returnValue(of(mockProductos));
    fixture.detectChanges();

    expect(component.productos?.length).toBe(2);
  });

  it('debe manejar error al cargar productos', () => {
    mockProductosService.obtenerTodos.and.returnValue(throwError(() => new Error('Error de red')));
    fixture.detectChanges();

    expect(component.productos).toEqual([]);
    expect(mockSnackBar.open).toHaveBeenCalledWith('Error cargando productos', 'Cerrar', { duration: 3000, panelClass: 'snack-error' });
  });

  it('debe cambiar vigencia del producto', fakeAsync(() => {
    const producto = { ...mockProductos[0] };
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(true));
    mockDialog.open.and.returnValue(dialogRefSpy);
    mockProductosService.cambiarEstado.and.returnValue(of(undefined));
    mockProductosService.obtenerTodos.and.returnValue(of(mockProductos));

    component.cambiarVigenciaProducto(producto);
    tick();

    expect(mockProductosService.cambiarEstado).toHaveBeenCalledWith(producto.idProducto, 0);
    expect(mockSnackBar.open).toHaveBeenCalled();
  }));

  it('debe eliminar producto si se confirma', fakeAsync(() => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(true));
    mockDialog.open.and.returnValue(dialogRefSpy);

    mockProductosService.eliminar.and.returnValue(of(undefined));
    mockProductosService.obtenerTodos.and.returnValue(of(mockProductos));

    component.eliminarProducto(1);
    tick();

    expect(mockProductosService.eliminar).toHaveBeenCalledWith(1);
    expect(mockSnackBar.open).toHaveBeenCalledWith('Producto eliminado', 'Cerrar', { duration: 3000 });
  }));

  it('no debe eliminar producto si se cancela confirmación', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(false));
    mockDialog.open.and.returnValue(dialogRefSpy);

    component.eliminarProducto(1);

    expect(mockProductosService.eliminar).not.toHaveBeenCalled();
  });

});
