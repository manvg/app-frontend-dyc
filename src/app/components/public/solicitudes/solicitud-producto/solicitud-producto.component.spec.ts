import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SolicitudProductoComponent } from './solicitud-producto.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../../../services/productos/productos.service';
import { SolicitudService } from '../../../../services/solicitud/solicitud.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { of, throwError } from 'rxjs';
import { Producto } from '../../../../models/producto.model';
import { Solicitud } from '../../../../models/solicitud.models';

describe('SolicitudProductoComponent', () => {
  let component: SolicitudProductoComponent;
  let fixture: ComponentFixture<SolicitudProductoComponent>;
  let productosServiceSpy: jasmine.SpyObj<ProductosService>;
  let solicitudServiceSpy: jasmine.SpyObj<SolicitudService>;
  let oidcSecuritySpy: jasmine.SpyObj<OidcSecurityService>;

  const productoMock: Producto = {
    idProducto: 1,
    nombre: 'Producto de prueba',
    descripcion: 'desc',
    idMaterial: 1,
    nombreMaterial: 'Madera',
    medidas: '10x10',
    precio: 10000,
    urlImagen: '',
    activo: 1,
    idTipoProducto: 2,
    nombreTipoProducto: 'Tipo A',
    cantidad: 10
  };

  beforeEach(async () => {
    productosServiceSpy = jasmine.createSpyObj('ProductosService', ['obtenerPorId']);
    solicitudServiceSpy = jasmine.createSpyObj('SolicitudService', ['crear']);
    oidcSecuritySpy = jasmine.createSpyObj('OidcSecurityService', [], {
      userData$: of({ userData: { email: 'usuario@test.com' } })
    });

    await TestBed.configureTestingModule({
      imports: [SolicitudProductoComponent, ReactiveFormsModule, CommonModule],
      providers: [
        FormBuilder,
        { provide: ProductosService, useValue: productosServiceSpy },
        { provide: SolicitudService, useValue: solicitudServiceSpy },
        { provide: OidcSecurityService, useValue: oidcSecuritySpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1' // Simula idProducto = 1
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudProductoComponent);
    component = fixture.componentInstance;
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar el producto en ngOnInit', () => {
    productosServiceSpy.obtenerPorId.and.returnValue(of(productoMock));
    fixture.detectChanges();

    expect(component.producto).toEqual(productoMock);
    expect(component.errorEnvio).toBeNull();
  });

  it('debe marcar error si el producto no se encuentra', () => {
    productosServiceSpy.obtenerPorId.and.returnValue(throwError(() => new Error('404')));
    fixture.detectChanges();

    expect(component.producto).toBeUndefined();
    expect(component.errorEnvio).toBe('No se pudo cargar la información del producto.');
  });

  it('debe enviar la solicitud con éxito', fakeAsync(() => {
    productosServiceSpy.obtenerPorId.and.returnValue(of(productoMock));
    solicitudServiceSpy.crear.and.returnValue(of({
      idTipoSolicitud: 2,
      idEstadoSolicitud: 1,
      nombreCliente: 'Juan Pérez',
      correoCliente: 'jperez@test.com',
      productos: [],
      imagenes: []
    } as Solicitud));

    fixture.detectChanges();

    component.form.setValue({
      nombre: 'Juan',
      apellidos: 'Pérez',
      email: 'jperez@test.com',
      telefono: '12345678',
      descripcion: 'quiero uno',
      cantidad: 2
    });

    component.enviarSolicitud();
    tick();

    expect(solicitudServiceSpy.crear).toHaveBeenCalled();
    expect(component.enviado).toBeTrue();
    expect(component.enviando).toBeFalse();
    expect(component.errorEnvio).toBeNull();
  }));

  it('debe manejar error al enviar la solicitud', fakeAsync(() => {
    productosServiceSpy.obtenerPorId.and.returnValue(of(productoMock));
    solicitudServiceSpy.crear.and.returnValue(throwError(() => new Error('error')));

    fixture.detectChanges();

    component.form.setValue({
      nombre: 'Luis',
      apellidos: 'Silva',
      email: 'luis@test.com',
      telefono: '999999999',
      descripcion: 'Error test',
      cantidad: 1
    });

    component.enviarSolicitud();
    tick();

    expect(solicitudServiceSpy.crear).toHaveBeenCalled();
    expect(component.errorEnvio).toBe('Error al enviar la solicitud. Intenta nuevamente.');
    expect(component.enviando).toBeFalse();
  }));

  it('no debe enviar si el formulario es inválido', () => {
    component.producto = productoMock;
    component.form.patchValue({ nombre: '', apellidos: '', email: '', descripcion: '', cantidad: null });

    component.enviarSolicitud();

    expect(component.enviando).toBeFalse();
    expect(component.enviado).toBeFalse();
    expect(component.form.invalid).toBeTrue();
  });
});
