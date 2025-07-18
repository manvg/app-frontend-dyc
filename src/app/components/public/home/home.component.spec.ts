import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ServicioService } from '../../../services/servicio/servicio.service';
import { ProductosService } from '../../../services/productos/productos.service';
import { of, throwError } from 'rxjs';
import { Servicio } from '../../../models/servicio.model';
import { Producto } from '../../../models/producto.model';
import { ServicioDestacadoComponent } from './servicio-destacado/servicio-destacado.component';
import { ProductoDestacadoComponent } from './producto-destacado/producto-destacado.component';
import { PedidoPersonalizadoComponent } from './pedido-personalizado/pedido-personalizado.component';
import { NgFor } from '@angular/common';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let servicioServiceSpy: jasmine.SpyObj<ServicioService>;
  let productosServiceSpy: jasmine.SpyObj<ProductosService>;

  const serviciosMock: Servicio[] = [
    {
      idServicio: 1,
      nombre: 'Servicio 1',
      descripcion: '',
      precio: 100,
      urlImagen: '',
      activo: 1
    },
    {
      idServicio: 2,
      nombre: 'Servicio 2',
      descripcion: '',
      precio: 100,
      urlImagen: '',
      activo: 1
    }
  ];

  const productosMock: Producto[] = [
    {
      idProducto: 1,
      nombre: 'Producto 1',
      descripcion: 'Descripción del producto',
      idMaterial: 2,
      nombreMaterial: 'Madera',
      medidas: '30x30cm',
      precio: 15000,
      urlImagen: 'http://imagen.jpg',
      activo: 1,
      idTipoProducto: 1,
      nombreTipoProducto: 'Decorativo',
      cantidad: 10
    }
  ];

  beforeEach(async () => {
    servicioServiceSpy = jasmine.createSpyObj('ServicioService', ['obtenerActivos']);
    productosServiceSpy = jasmine.createSpyObj('ProductosService', ['obtenerActivos']);

    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        NgFor,
        ServicioDestacadoComponent,
        ProductoDestacadoComponent,
        PedidoPersonalizadoComponent
      ],
      providers: [
        { provide: ServicioService, useValue: servicioServiceSpy },
        { provide: ProductosService, useValue: productosServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar servicios con orientación alternada', () => {
    servicioServiceSpy.obtenerActivos.and.returnValue(of(serviciosMock));
    productosServiceSpy.obtenerActivos.and.returnValue(of([]));

    fixture.detectChanges();

    expect(component.servicios.length).toBe(2);
    expect(component.servicios[0].orientacion).toBe('izquierda');
    expect(component.servicios[1].orientacion).toBe('derecha');
  });

  it('debe cargar productos correctamente', () => {
    servicioServiceSpy.obtenerActivos.and.returnValue(of([]));
    productosServiceSpy.obtenerActivos.and.returnValue(of(productosMock));

    fixture.detectChanges();

    expect(component.productos.length).toBe(1);
    expect(component.productos[0].nombre).toBe('Producto 1');
  });

  it('debe manejar error al cargar servicios', () => {
    servicioServiceSpy.obtenerActivos.and.returnValue(throwError(() => new Error('Fallo servicios')));
    productosServiceSpy.obtenerActivos.and.returnValue(of([]));

    fixture.detectChanges();

    expect(component.servicios).toEqual([]);
  });

  it('debe manejar error al cargar productos', () => {
    servicioServiceSpy.obtenerActivos.and.returnValue(of([]));
    productosServiceSpy.obtenerActivos.and.returnValue(throwError(() => new Error('Fallo productos')));

    fixture.detectChanges();

    expect(component.productos).toEqual([]);
  });
});
