// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { DetalleProductoComponent } from './detalle-producto.component';
// import { ActivatedRoute } from '@angular/router';
// import { ProductosService } from '../../../../services/productos/productos.service';
// import { Producto } from '../../../../models/producto.model';
// import { of, throwError, Subject } from 'rxjs';
// import { CurrencyPipe, NgIf } from '@angular/common';
// import { RouterModule } from '@angular/router';

// describe('DetalleProductoComponent', () => {
//   let component: DetalleProductoComponent;
//   let fixture: ComponentFixture<DetalleProductoComponent>;
//   let productosServiceSpy: jasmine.SpyObj<ProductosService>;
//   let paramMapSubject: Subject<any>;

//   const productoMock: Producto = {
//     idProducto: 1,
//     nombre: 'Producto Mock',
//     descripcion: 'Descripción de prueba',
//     idMaterial: 2,
//     nombreMaterial: 'Madera',
//     medidas: '30x30cm',
//     precio: 10000,
//     urlImagen: 'http://imagen.jpg',
//     activo: 1,
//     idTipoProducto: 1,
//     nombreTipoProducto: 'Decorativo',
//     cantidad: 5
//   };

//   beforeEach(async () => {
//     productosServiceSpy = jasmine.createSpyObj('ProductosService', ['obtenerPorId']);
//     paramMapSubject = new Subject();

//     await TestBed.configureTestingModule({
//       imports: [DetalleProductoComponent, NgIf, CurrencyPipe, RouterModule],
//       providers: [
//         { provide: ProductosService, useValue: productosServiceSpy },
//         {
//           provide: ActivatedRoute,
//           useValue: {
//             paramMap: paramMapSubject.asObservable()
//           }
//         }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(DetalleProductoComponent);
//     component = fixture.componentInstance;
//   });

//   it('debe crear el componente', () => {
//     expect(component).toBeTruthy();
//   });

//   it('debe cargar producto correctamente si id es válido', () => {
//     productosServiceSpy.obtenerPorId.and.returnValue(of(productoMock));

//     fixture.detectChanges();
//     paramMapSubject.next({
//       get: (key: string) => key === 'idProducto' ? '1' : null
//     });

//     expect(productosServiceSpy.obtenerPorId).toHaveBeenCalledWith(1);
//     expect(component.producto).toEqual(productoMock);
//     expect(component.loading).toBeFalse();
//     expect(component.error).toBeUndefined();
//   });

//   it('debe manejar error si la carga del producto falla', () => {
//     productosServiceSpy.obtenerPorId.and.returnValue(throwError(() => new Error('fallo')));

//     fixture.detectChanges();
//     paramMapSubject.next({
//       get: (key: string) => key === 'idProducto' ? '1' : null
//     });

//     expect(component.producto).toBeUndefined();
//     expect(component.loading).toBeFalse();
//     expect(component.error).toBe('No se pudo cargar el producto.');
//   });

//   it('debe mostrar error si el idProducto no está presente', () => {
//     fixture.detectChanges();
//     paramMapSubject.next({
//       get: () => null
//     });

//     expect(component.producto).toBeUndefined();
//     expect(component.error).toBe('ID de producto inválido');
//   });

//   it('debe desuscribirse al destruir el componente', () => {
//     productosServiceSpy.obtenerPorId.and.returnValue(of(productoMock));

//     fixture.detectChanges();
//     paramMapSubject.next({
//       get: () => '1'
//     });

//     const paramSubSpy = spyOn(component['paramSub']!, 'unsubscribe');
//     const productoSubSpy = spyOn(component['productoSub']!, 'unsubscribe');

//     component.ngOnDestroy();

//     expect(paramSubSpy).toHaveBeenCalled();
//     expect(productoSubSpy).toHaveBeenCalled();
//   });
// });
