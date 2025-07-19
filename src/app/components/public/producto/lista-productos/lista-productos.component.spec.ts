// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ListaProductosComponent } from './lista-productos.component';
// import { ActivatedRoute } from '@angular/router';
// import { ProductosService } from '../../../../services/productos/productos.service';
// import { Producto } from '../../../../models/producto.model';
// import { of, throwError, Subject } from 'rxjs';
// import { NgFor, CurrencyPipe } from '@angular/common';
// import { RouterModule } from '@angular/router';

// describe('ListaProductosComponent', () => {
//   let component: ListaProductosComponent;
//   let fixture: ComponentFixture<ListaProductosComponent>;
//   let productosServiceSpy: jasmine.SpyObj<ProductosService>;
//   let paramMapSubject: Subject<any>;

//   const productosMock: Producto[] = [
//     {
//       idProducto: 1,
//       nombre: 'Producto A',
//       descripcion: 'Descripción A',
//       idMaterial: 1,
//       nombreMaterial: 'Madera',
//       medidas: '10x10',
//       precio: 1000,
//       urlImagen: '',
//       activo: 1,
//       idTipoProducto: 5,
//       nombreTipoProducto: 'Decorativo',
//       cantidad: 2
//     },
//     {
//       idProducto: 2,
//       nombre: 'Producto B',
//       descripcion: 'Descripción B',
//       idMaterial: 2,
//       nombreMaterial: 'Plástico',
//       medidas: '20x20',
//       precio: 2000,
//       urlImagen: '',
//       activo: 1,
//       idTipoProducto: 3,
//       nombreTipoProducto: 'Utilitario',
//       cantidad: 4
//     }
//   ];

//   beforeEach(async () => {
//     productosServiceSpy = jasmine.createSpyObj('ProductosService', ['obtenerActivos']);
//     paramMapSubject = new Subject();

//     await TestBed.configureTestingModule({
//       imports: [ListaProductosComponent, NgFor, CurrencyPipe, RouterModule],
//       providers: [
//         { provide: ProductosService, useValue: productosServiceSpy },
//         { provide: ActivatedRoute, useValue: { paramMap: paramMapSubject.asObservable() } }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(ListaProductosComponent);
//     component = fixture.componentInstance;
//   });

//   it('debe crear el componente', () => {
//     expect(component).toBeTruthy();
//   });

//   it('debe filtrar productos por idTipoProducto y mostrar nombreTipoProducto', () => {
//     productosServiceSpy.obtenerActivos.and.returnValue(of(productosMock));

//     fixture.detectChanges();
//     paramMapSubject.next({ get: (key: string) => key === 'idTipoProducto' ? '5' : null });

//     expect(productosServiceSpy.obtenerActivos).toHaveBeenCalled();
//     expect(component.productos.length).toBe(1);
//     expect(component.productos[0].nombre).toBe('Producto A');
//     expect(component.tipoProductoNombre).toBe('Decorativo');
//   });

//   it('debe mostrar mensaje si no hay productos para ese tipo', () => {
//     productosServiceSpy.obtenerActivos.and.returnValue(of(productosMock));

//     fixture.detectChanges();
//     paramMapSubject.next({ get: () => '999' }); // idTipoProducto que no coincide

//     expect(component.productos.length).toBe(0);
//     expect(component.tipoProductoNombre).toBe('Sin productos para este tipo');
//   });

//   it('debe manejar error al obtener productos', () => {
//     productosServiceSpy.obtenerActivos.and.returnValue(throwError(() => new Error('Fallo')));

//     fixture.detectChanges();
//     paramMapSubject.next({ get: () => '5' });

//     expect(component.productos).toEqual([]);
//     expect(component.tipoProductoNombre).toBe('Error cargando productos');
//   });
// });
