// import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
// import { MantenedorProductosComponent } from './mantenedor-productos.component';
// import { ProductosService } from '../../../services/productos/productos.service';
// import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { of, throwError } from 'rxjs';
// import { Producto } from '../../../models/producto.model';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
// import { FormularioProductoComponent } from '../formulario-producto/formulario-producto.component';

// describe('MantenedorProductosComponent', () => {
//   let component: MantenedorProductosComponent;
//   let fixture: ComponentFixture<MantenedorProductosComponent>;

//   let mockProductosService: jasmine.SpyObj<ProductosService>;
//   let mockDialog: jasmine.SpyObj<MatDialog>;
//   let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
//   let defaultDialogRefSpy: jasmine.SpyObj<MatDialogRef<any, any>>;

//   beforeEach(async () => {
//     mockProductosService = jasmine.createSpyObj('ProductosService', [
//       'obtenerTodos',
//       'obtenerPorId',
//       'cambiarEstado',
//       'eliminar'
//     ]);

//     // DialogRef por defecto siempre devuelve afterClosed (null)
//     defaultDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
//     defaultDialogRefSpy.afterClosed.and.returnValue(of(null));

//     mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
//     mockDialog.open.and.returnValue(defaultDialogRefSpy);

//     mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

//     await TestBed.configureTestingModule({
//       imports: [
//         MantenedorProductosComponent,
//         NoopAnimationsModule,
//         ConfirmDialogComponent,
//         FormularioProductoComponent
//       ],
//       providers: [
//         { provide: ProductosService, useValue: mockProductosService },
//         { provide: MatDialog, useValue: mockDialog },
//         { provide: MatSnackBar, useValue: mockSnackBar }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(MantenedorProductosComponent);
//     component = fixture.componentInstance;
//   });

//   it('debe crear el componente', () => {
//     expect(component).toBeTruthy();
//   });

//   it('debe cargar productos correctamente', () => {
//     const productosMock: Producto[] = [{ idProducto: 1, nombre: 'Prod', descripcion: '', idMaterial: 1, nombreMaterial: '', medidas: '', precio: 0, urlImagen: '', activo: 1, idTipoProducto: 1, nombreTipoProducto: '', cantidad: 0 }];
//     mockProductosService.obtenerTodos.and.returnValue(of(productosMock));

//     component.cargarProductos();

//     expect(component.productos).toEqual(productosMock);
//   });

//   it('debe mostrar error si falla cargar productos', fakeAsync(() => {
//     mockProductosService.obtenerTodos.and.returnValue(throwError(() => new Error('Error API')));

//     component.cargarProductos();
//     tick();
//     fixture.detectChanges();

//     expect(component.productos).toEqual([]);
//     expect(mockSnackBar.open).toHaveBeenCalledWith(
//       'Error cargando productos',
//       'Cerrar',
//       { duration: 3000, panelClass: 'snack-error' }
//     );
//   }));

//   it('debe abrir el diálogo de nuevo producto y recargar productos al cerrar con éxito', () => {
//     const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
//     dialogRefSpyObj.afterClosed.and.returnValue(of({ idProducto: 10 }));
//     mockDialog.open.and.returnValue(dialogRefSpyObj);

//     spyOn(component, 'cargarProductos');

//     component.nuevoProducto();

//     expect(mockDialog.open).toHaveBeenCalledWith(
//       jasmine.any(Function),
//       jasmine.any(Object)
//     );
//     expect(mockSnackBar.open).toHaveBeenCalledWith('Producto creado con éxito', 'Cerrar', { duration: 3000 });
//     expect(component.cargarProductos).toHaveBeenCalled();
//   });

//   it('debe recargar productos y mostrar snackbar al editar un producto', () => {
//     const productoEditMock: Producto = { idProducto: 2, nombre: 'Edit', descripcion: '', idMaterial: 1, nombreMaterial: '', medidas: '', precio: 0, urlImagen: '', activo: 1, idTipoProducto: 1, nombreTipoProducto: '', cantidad: 0 };
//     mockProductosService.obtenerPorId.and.returnValue(of(productoEditMock));

//     const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
//     dialogRefSpyObj.afterClosed.and.returnValue(of(productoEditMock));
//     mockDialog.open.and.returnValue(dialogRefSpyObj);

//     spyOn(component, 'cargarProductos');

//     component.editarProducto(2);

//     expect(mockProductosService.obtenerPorId).toHaveBeenCalledWith(2);
//     expect(mockDialog.open).toHaveBeenCalledWith(
//       jasmine.any(Function),
//       jasmine.objectContaining({
//         width: '600px',
//         data: jasmine.objectContaining(productoEditMock)
//       })
//     );
//     expect(component.cargarProductos).toHaveBeenCalled();
//     expect(mockSnackBar.open).toHaveBeenCalledWith('Producto actualizado con éxito', 'Cerrar', { duration: 3000 });
//   });

//   it('debe cambiar vigencia de producto y mostrar mensaje', () => {
//     const productoMock: Producto = { idProducto: 3, nombre: 'Vigente', descripcion: '', idMaterial: 1, nombreMaterial: '', medidas: '', precio: 0, urlImagen: '', activo: 1, idTipoProducto: 1, nombreTipoProducto: '', cantidad: 0 };
//     const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
//     dialogRefSpyObj.afterClosed.and.returnValue(of(true));
//     mockDialog.open.and.returnValue(dialogRefSpyObj);
//     mockProductosService.cambiarEstado.and.returnValue(of(void 0));

//     spyOn(component, 'cargarProductos');

//     component.cambiarVigenciaProducto(productoMock);

//     expect(mockDialog.open).toHaveBeenCalledWith(
//       jasmine.any(Function),
//       jasmine.objectContaining({
//         width: '400px',
//         data: jasmine.objectContaining({
//           titulo: 'Confirmación',
//           mensaje: '¿Estás seguro de desactivar este producto?'
//         })
//       })
//     );
//     expect(mockProductosService.cambiarEstado).toHaveBeenCalledWith(3, 0);
//     expect(component.cargarProductos).toHaveBeenCalled();
//     expect(mockSnackBar.open).toHaveBeenCalledWith('Producto desactivado', 'Cerrar', { duration: 3000 });
//   });

//   it('debe mostrar error al cambiar vigencia si falla el servicio', () => {
//     const productoMock: Producto = { idProducto: 4, nombre: 'Desactivado', descripcion: '', idMaterial: 1, nombreMaterial: '', medidas: '', precio: 0, urlImagen: '', activo: 0, idTipoProducto: 1, nombreTipoProducto: '', cantidad: 0 };
//     const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
//     dialogRefSpyObj.afterClosed.and.returnValue(of(true));
//     mockDialog.open.and.returnValue(dialogRefSpyObj);
//     mockProductosService.cambiarEstado.and.returnValue(throwError(() => new Error('Falla backend')));

//     component.cambiarVigenciaProducto(productoMock);

//     expect(mockSnackBar.open).toHaveBeenCalledWith('Error al activar producto', 'Cerrar', { duration: 3500, panelClass: 'snack-error' });
//   });

//   it('debe eliminar un producto correctamente', () => {
//     const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
//     dialogRefSpyObj.afterClosed.and.returnValue(of(true));
//     mockDialog.open.and.returnValue(dialogRefSpyObj);
//     mockProductosService.eliminar.and.returnValue(of(void 0));

//     spyOn(component, 'cargarProductos');

//     component.eliminarProducto(5);

//     expect(mockDialog.open).toHaveBeenCalledWith(
//       jasmine.any(Function),
//       jasmine.objectContaining({
//         width: '400px',
//         data: jasmine.objectContaining({
//           titulo: 'Confirmación',
//           mensaje: '¿Estás seguro de eliminar este producto permanentemente?'
//         })
//       })
//     );
//     expect(mockProductosService.eliminar).toHaveBeenCalledWith(5);
//     expect(component.cargarProductos).toHaveBeenCalled();
//     expect(mockSnackBar.open).toHaveBeenCalledWith('Producto eliminado', 'Cerrar', { duration: 3000 });
//   });

//   it('debe mostrar error al eliminar si falla el servicio', () => {
//     const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
//     dialogRefSpyObj.afterClosed.and.returnValue(of(true));
//     mockDialog.open.and.returnValue(dialogRefSpyObj);
//     mockProductosService.eliminar.and.returnValue(throwError(() => new Error('Falla eliminando')));

//     component.eliminarProducto(6);

//     expect(mockSnackBar.open).toHaveBeenCalledWith('Error al eliminar producto', 'Cerrar', { duration: 3500, panelClass: 'snack-error' });
//   });

//   it('trackById debe retornar el id del producto', () => {
//     const producto: Producto = { idProducto: 10, nombre: 'T', descripcion: '', idMaterial: 1, nombreMaterial: '', medidas: '', precio: 0, urlImagen: '', activo: 1, idTipoProducto: 1, nombreTipoProducto: '', cantidad: 0 };
//     expect(component.trackById(0, producto)).toBe(10);
//   });

// });
