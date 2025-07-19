import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MantenedorServiciosComponent } from './mantenedor-servicios.component';
import { ServicioService } from '../../../services/servicio/servicio.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { Servicio } from '../../../models/servicio.model';
import { ResponseModel } from '../../../models/response-model.model';

describe('MantenedorServiciosComponent', () => {
  let component: MantenedorServiciosComponent;
  let fixture: ComponentFixture<MantenedorServiciosComponent>;
  let mockServicioService: jasmine.SpyObj<ServicioService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  const fakeServicios: Servicio[] = [
    { idServicio: 1, nombre: 'S1', descripcion: '', precio: 1000, urlImagen: '', activo: 1 },
    { idServicio: 2, nombre: 'S2', descripcion: '', precio: 2000, urlImagen: '', activo: 0 }
  ];

  beforeEach(async () => {
    mockServicioService = jasmine.createSpyObj('ServicioService', [
      'obtenerTodos', 'obtenerPorId', 'crear', 'actualizar', 'cambiarEstado', 'eliminar'
    ]);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [MantenedorServiciosComponent],
      providers: [
        { provide: ServicioService, useValue: mockServicioService },
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MantenedorServiciosComponent);
    component = fixture.componentInstance;
  });

  it('debe cargar servicios correctamente', () => {
    mockServicioService.obtenerTodos.and.returnValue(of(fakeServicios));

    component.cargarServicios();

    expect(mockServicioService.obtenerTodos).toHaveBeenCalled();
    expect(component.servicios).toEqual(fakeServicios);
  });

  it('debe manejar error al cargar servicios', () => {
    mockServicioService.obtenerTodos.and.returnValue(throwError(() => new Error('Error')));

    component.cargarServicios();

    expect(mockSnackBar.open).toHaveBeenCalledWith('Error cargando servicios', 'Cerrar', jasmine.any(Object));
    expect(component.servicios).toEqual([]);
  });

  it('debe abrir diálogo al crear nuevo servicio', fakeAsync(() => {
    const response: ResponseModel = { status: true, message: 'Creado' };
    const dialogRefMock = { afterClosed: () => of(response) };
    mockDialog.open.and.returnValue(dialogRefMock as any);
    mockServicioService.obtenerTodos.and.returnValue(of([]));

    component.nuevoServicio();
    tick();

    expect(mockDialog.open).toHaveBeenCalled();
    expect(mockSnackBar.open).toHaveBeenCalledWith('Creado', 'Cerrar', { duration: 3000 });
  }));

  it('debe actualizar servicio si se edita correctamente', fakeAsync(() => {
    const servicio = fakeServicios[0];
    const response: ResponseModel = { status: true, message: 'Actualizado' };
    const dialogRefMock = { afterClosed: () => of(response) };

    mockServicioService.obtenerPorId.and.returnValue(of(servicio));
    mockDialog.open.and.returnValue(dialogRefMock as any);
    mockServicioService.obtenerTodos.and.returnValue(of([]));

    component.editarServicio(servicio.idServicio);
    tick();

    expect(mockServicioService.obtenerPorId).toHaveBeenCalledWith(servicio.idServicio);
    expect(mockSnackBar.open).toHaveBeenCalledWith('Actualizado', 'Cerrar', { duration: 3000 });
  }));

  it('debe activar o desactivar un servicio', fakeAsync(() => {
    const servicio = fakeServicios[1]; // inactivo
    const dialogRefMock = { afterClosed: () => of(true) };

    mockDialog.open.and.returnValue(dialogRefMock as any);
    mockServicioService.cambiarEstado.and.returnValue(of(void 0));
    mockServicioService.obtenerTodos.and.returnValue(of([]));

    component.cambiarVigenciaServicio(servicio);
    tick();

    expect(mockServicioService.cambiarEstado).toHaveBeenCalledWith(servicio.idServicio, 1);
    expect(mockSnackBar.open).toHaveBeenCalledWith('Servicio activar', 'Cerrar', { duration: 3000 });
  }));

  it('debe eliminar un servicio si se confirma', fakeAsync(() => {
    const servicio = fakeServicios[0];
    const dialogRefMock = { afterClosed: () => of(true) };

    mockDialog.open.and.returnValue(dialogRefMock as any);
    mockServicioService.eliminar.and.returnValue(of(void 0));
    mockServicioService.obtenerTodos.and.returnValue(of([]));

    component.eliminarServicio(servicio.idServicio);
    tick();

    expect(mockServicioService.eliminar).toHaveBeenCalledWith(servicio.idServicio);
    expect(mockSnackBar.open).toHaveBeenCalledWith('Servicio eliminado', 'Cerrar', { duration: 3000 });
  }));

  it('trackById debe retornar el id del servicio', () => {
    const id = component.trackById(0, { idServicio: 99 } as Servicio);
    expect(id).toBe(99);
  });
});
