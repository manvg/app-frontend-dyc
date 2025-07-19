// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ListaTiposProductoComponent } from './lista-tipos-producto.component';
// import { Router } from '@angular/router';
// import { TipoProductoService } from '../../../../services/tipo-producto/tipo-producto.service';
// import { TipoProducto } from '../../../../models/tipo-producto.model';
// import { of, throwError } from 'rxjs';
// import { NgFor } from '@angular/common';

// describe('ListaTiposProductoComponent', () => {
//   let component: ListaTiposProductoComponent;
//   let fixture: ComponentFixture<ListaTiposProductoComponent>;
//   let tipoProductoServiceSpy: jasmine.SpyObj<TipoProductoService>;
//   let routerSpy: jasmine.SpyObj<Router>;

//   const tiposMock: TipoProducto[] = [
//     {
//       idTipoProducto: 1,
//       nombre: 'Decorativo',
//       activo: 1,
//       urlImagen: 'https://ejemplo.com/img1.jpg'
//     },
//     {
//       idTipoProducto: 2,
//       nombre: 'Utilitario',
//       activo: 1,
//       urlImagen: null
//     }
//   ];

//   beforeEach(async () => {
//     tipoProductoServiceSpy = jasmine.createSpyObj('TipoProductoService', ['obtenerTodos']);
//     routerSpy = jasmine.createSpyObj('Router', ['navigate']);

//     await TestBed.configureTestingModule({
//       imports: [ListaTiposProductoComponent, NgFor],
//       providers: [
//         { provide: TipoProductoService, useValue: tipoProductoServiceSpy },
//         { provide: Router, useValue: routerSpy }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(ListaTiposProductoComponent);
//     component = fixture.componentInstance;
//   });

//   it('debe crear el componente', () => {
//     expect(component).toBeTruthy();
//   });

//   it('debe cargar tipos de producto correctamente', () => {
//     tipoProductoServiceSpy.obtenerTodos.and.returnValue(of(tiposMock));

//     fixture.detectChanges();

//     expect(component.tiposProducto.length).toBe(2);
//     expect(component.tiposProducto[0].nombre).toBe('Decorativo');
//   });

//   it('debe manejar error al obtener tipos de producto', () => {
//     tipoProductoServiceSpy.obtenerTodos.and.returnValue(throwError(() => new Error('Error de red')));

//     fixture.detectChanges();

//     expect(component.tiposProducto).toEqual([]);
//   });

//   it('debe navegar al hacer clic en verModelos', () => {
//     const tipo: TipoProducto = {
//       idTipoProducto: 99,
//       nombre: 'Prueba',
//       activo: 1,
//       urlImagen: null
//     };

//     component.verModelos(tipo);

//     expect(routerSpy.navigate).toHaveBeenCalledWith(['/productos', 99]);
//   });
// });
