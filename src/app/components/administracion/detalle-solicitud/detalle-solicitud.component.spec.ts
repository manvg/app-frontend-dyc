import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DetalleSolicitudComponent } from './detalle-solicitud.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { SolicitudService } from '../../../services/solicitud/solicitud.service';
import { SolicitudBitacoraService } from '../../../services/bitacora/solicitud-bitacora.service';
import { ProductosService } from '../../../services/productos/productos.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Solicitud } from '../../../models/solicitud.models';
import { Producto } from '../../../models/producto.model';
import { SolicitudBitacora } from '../../../models/solicitud-bitacora';

describe('DetalleSolicitudComponent', () => {
  let component: DetalleSolicitudComponent;
  let fixture: ComponentFixture<DetalleSolicitudComponent>;
  let solicitudServiceSpy: jasmine.SpyObj<SolicitudService>;
  let bitacoraServiceSpy: jasmine.SpyObj<SolicitudBitacoraService>;
  let productosServiceSpy: jasmine.SpyObj<ProductosService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let oidcSpy: jasmine.SpyObj<OidcSecurityService>;

  const solicitudMock: Solicitud = {
    idTipoSolicitud: 3,
    idEstadoSolicitud: 1,
    nombreCliente: 'Juan Pérez',
    correoCliente: 'juan@example.com',
    productos: [{ idProducto: 1, cantidad: 2 }],
    imagenes: [],
    idSolicitud: 99
  };

  const productoMock: Producto = {
    idProducto: 1,
    nombre: 'Producto prueba',
    descripcion: '',
    idMaterial: 1,
    nombreMaterial: '',
    medidas: '',
    precio: 1000,
    urlImagen: '',
    activo: 1,
    idTipoProducto: 1,
    nombreTipoProducto: '',
    cantidad: 10
  };

  beforeEach(async () => {
    solicitudServiceSpy = jasmine.createSpyObj('SolicitudService', [
      'obtenerPorId',
      'obtenerEstados'
    ]);
    bitacoraServiceSpy = jasmine.createSpyObj('SolicitudBitacoraService', ['obtenerPorSolicitud', 'crear']);
    productosServiceSpy = jasmine.createSpyObj('ProductosService', ['obtenerPorId']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    oidcSpy = jasmine.createSpyObj('OidcSecurityService', [], {
      userData$: of({ userData: { email: 'test@correo.com' } })
    });

    await TestBed.configureTestingModule({
      imports: [DetalleSolicitudComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '99' } } } },
        { provide: SolicitudService, useValue: solicitudServiceSpy },
        { provide: SolicitudBitacoraService, useValue: bitacoraServiceSpy },
        { provide: ProductosService, useValue: productosServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: OidcSecurityService, useValue: oidcSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleSolicitudComponent);
    component = fixture.componentInstance;
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar solicitud y datos relacionados en ngOnInit', fakeAsync(() => {
    solicitudServiceSpy.obtenerPorId.and.returnValue(of(solicitudMock));
    bitacoraServiceSpy.obtenerPorSolicitud.and.returnValue(of([]));
    solicitudServiceSpy.obtenerEstados.and.returnValue(of([]));
    productosServiceSpy.obtenerPorId.and.returnValue(of(productoMock));

    fixture.detectChanges();
    tick();

    expect(solicitudServiceSpy.obtenerPorId).toHaveBeenCalledWith(99);
    expect(component.solicitud).toEqual(solicitudMock);
    expect(component.detallesProductos.length).toBe(1);
    expect(component.bitacoras.length).toBe(0);
    expect(component.estados.length).toBe(0);
    expect(component.usuarioActual).toBe('test@correo.com');
  }));

  it('debe agregar una bitácora correctamente', fakeAsync(() => {
    component.solicitud = solicitudMock;
    component.nuevoEstadoBitacora = 2;
    component.nuevaDescripcionBitacora = 'Comentario';
    bitacoraServiceSpy.crear.and.returnValue(of({}));
    solicitudServiceSpy.obtenerPorId.and.returnValue(of(solicitudMock));
    bitacoraServiceSpy.obtenerPorSolicitud.and.returnValue(of([]));

    component.agregarBitacora();
    tick();

    expect(bitacoraServiceSpy.crear).toHaveBeenCalled();
    expect(component.mensajeExito).toContain('Bitácora agregada');
    expect(component.agregandoBitacora).toBeFalse();
  }));

  it('no debe agregar bitácora si faltan campos', () => {
    component.solicitud = solicitudMock;
    component.nuevoEstadoBitacora = null;
    component.nuevaDescripcionBitacora = '';

    component.agregarBitacora();

    expect(component.mensajeError).toContain('Completa todos los campos');
    expect(bitacoraServiceSpy.crear).not.toHaveBeenCalled();
  });

  it('debe navegar al volver()', () => {
    component.volver();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/gestion-solicitudes']);
  });

  it('productosAsociados debe retornar nombres válidos', () => {
    component.solicitud = {
      ...solicitudMock,
      productos: [{ idProducto: 1, cantidad: 1, nombreProducto: 'Mesa Láser' }]
    };
    const resultado = component.productosAsociados;
    expect(resultado).toEqual(['Mesa Láser']);
  });

  it('esTipoProducto debe retornar true solo para "Producto" o "Catálogo"', () => {
    expect(component.esTipoProducto('Producto')).toBeTrue();
    expect(component.esTipoProducto('Catálogo')).toBeTrue();
    expect(component.esTipoProducto('Servicio')).toBeFalse();
  });

  it('esTipoServicio debe retornar true solo para "Servicio"', () => {
    expect(component.esTipoServicio('Servicio')).toBeTrue();
    expect(component.esTipoServicio('Producto')).toBeFalse();
  });

  it('esTipoPersonalizada debe retornar true solo para "Personalizada"', () => {
    expect(component.esTipoPersonalizada('Personalizada')).toBeTrue();
    expect(component.esTipoPersonalizada('Catálogo')).toBeFalse();
  });
});
