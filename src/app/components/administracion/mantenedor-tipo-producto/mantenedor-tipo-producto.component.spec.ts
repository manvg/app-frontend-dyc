import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MantenedorTipoProductoComponent } from './mantenedor-tipo-producto.component';
import { TipoProductoService } from '../../../services/tipo-producto/tipo-producto.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { TipoProducto } from '../../../models/tipo-producto.model';
import { ResponseModel } from '../../../models/response-model.model';

describe('MantenedorTipoProductoComponent', () => {
  let component: MantenedorTipoProductoComponent;
  let fixture: ComponentFixture<MantenedorTipoProductoComponent>;
  let mockTipoProductoService: jasmine.SpyObj<TipoProductoService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  const mockTipos: TipoProducto[] = [
    { idTipoProducto: 1, nombre: 'Metal', urlImagen: '', activo: 1 },
    { idTipoProducto: 2, nombre: 'Madera', urlImagen: '', activo: 0 }
  ];

  beforeEach(async () => {
    mockTipoProductoService = jasmine.createSpyObj('TipoProductoService', [
      'obtenerTodos', 'obtenerPorId', 'cambiarEstado', 'eliminar'
    ]);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [MantenedorTipoProductoComponent],
      providers: [
        { provide: TipoProductoService, useValue: mockTipoProductoService },
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MantenedorTipoProductoComponent);
    component = fixture.componentInstance;
  });

  it('debe cargar los tipos de producto correctamente', () => {
    mockTipoProductoService.obtenerTodos.and.returnValue(of(mockTipos));
    component.cargarTiposProducto();
    expect(component.tiposProducto).toEqual(mockTipos);
  });

  it('debe manejar error al cargar tipos de producto', () => {
    mockTipoProductoService.obtenerTodos.and.returnValue(throwError(() => new Error('error')));
    component.cargarTiposProducto();
    expect(component.tiposProducto).toEqual([]);
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Error al cargar tipos de producto',
      'Cerrar',
      jasmine.any(Object)
    );
  });

  it('debe crear un nuevo tipo de producto si response es exitoso', fakeAsync(() => {
    const dialogRef = { afterClosed: () => of({ status: true, message: 'Creado' } as ResponseModel) };
    mockDialog.open.and.returnValue(dialogRef as any);
    mockTipoProductoService.obtenerTodos.and.returnValue(of([]));

    component.nuevoTipoProducto();
    tick();

    expect(mockDialog.open).toHaveBeenCalled();
    expect(mockSnackBar.open).toHaveBeenCalledWith('Creado', 'Cerrar', { duration: 3000 });
  }));

  it('debe editar un tipo de producto si response es exitoso', fakeAsync(() => {
    const tipo = mockTipos[0];
    const dialogRef = { afterClosed: () => of({ status: true, message: 'Actualizado' } as ResponseModel) };

    mockTipoProductoService.obtenerPorId.and.returnValue(of(tipo));
    mockDialog.open.and.returnValue(dialogRef as any);
    mockTipoProductoService.obtenerTodos.and.returnValue(of([]));

    component.editarTipoProducto(tipo.idTipoProducto);
    tick();

    expect(mockTipoProductoService.obtenerPorId).toHaveBeenCalledWith(tipo.idTipoProducto);
    expect(mockSnackBar.open).toHaveBeenCalledWith('Actualizado', 'Cerrar', { duration: 3000 });
  }));

  it('debe cambiar la vigencia del tipo de producto', fakeAsync(() => {
    const tipo = mockTipos[1]; // actualmente inactivo
    const dialogRef = { afterClosed: () => of(true) };

    mockDialog.open.and.returnValue(dialogRef as any);
    mockTipoProductoService.cambiarEstado.and.returnValue(of({ status: true, message: 'ok' }));
    mockTipoProductoService.obtenerTodos.and.returnValue(of([]));

    component.cambiarVigenciaTipoProducto(tipo);
    tick();

    expect(mockTipoProductoService.cambiarEstado).toHaveBeenCalledWith(tipo.idTipoProducto, 1);
    expect(mockSnackBar.open).toHaveBeenCalledWith('Tipo activado', 'Cerrar', { duration: 3000 });
  }));

  it('debe eliminar el tipo de producto si se confirma', fakeAsync(() => {
    const tipo = mockTipos[0];
    const dialogRef = { afterClosed: () => of(true) };

    mockDialog.open.and.returnValue(dialogRef as any);
    mockTipoProductoService.eliminar.and.returnValue(of(void 0));
    mockTipoProductoService.obtenerTodos.and.returnValue(of([]));

    component.eliminarTipoProducto(tipo.idTipoProducto);
    tick();

    expect(mockTipoProductoService.eliminar).toHaveBeenCalledWith(tipo.idTipoProducto);
    expect(mockSnackBar.open).toHaveBeenCalledWith('Tipo de producto eliminado', 'Cerrar', { duration: 3000 });
  }));

  it('trackById debe retornar el id del tipo de producto', () => {
    const result = component.trackById(0, { idTipoProducto: 123 } as TipoProducto);
    expect(result).toBe(123);
  });
});
