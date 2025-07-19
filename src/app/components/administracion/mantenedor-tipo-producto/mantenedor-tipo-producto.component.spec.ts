import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MantenedorTipoProductoComponent } from './mantenedor-tipo-producto.component';
import { TipoProductoService } from '../../../services/tipo-producto/tipo-producto.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { TipoProducto } from '../../../models/tipo-producto.model';
import { ResponseModel } from '../../../models/response-model.model';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MantenedorTipoProductoComponent', () => {
  let component: MantenedorTipoProductoComponent;
  let fixture: ComponentFixture<MantenedorTipoProductoComponent>;
  let mockTipoProductoService: jasmine.SpyObj<TipoProductoService>;

  const mockTipos: TipoProducto[] = [
    { idTipoProducto: 1, nombre: 'Metal', urlImagen: '', activo: 1 },
    { idTipoProducto: 2, nombre: 'Madera', urlImagen: '', activo: 0 }
  ];

  beforeEach(async () => {
    mockTipoProductoService = jasmine.createSpyObj('TipoProductoService', [
      'obtenerTodos', 'obtenerPorId', 'cambiarEstado', 'eliminar'
    ]);

    await TestBed.configureTestingModule({
      imports: [MantenedorTipoProductoComponent, NoopAnimationsModule],
      providers: [
        { provide: TipoProductoService, useValue: mockTipoProductoService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MantenedorTipoProductoComponent);
    component = fixture.componentInstance;

    // ¡Clave! mock MatDialog.open y MatSnackBar.open en el prototipo real
    spyOn(MatDialog.prototype, 'open').and.callFake(() => {
      return {
        afterClosed: () => of({ status: true, message: 'Creado' } as ResponseModel)
      } as any;
    });
    spyOn(MatSnackBar.prototype, 'open');
  });

  it('debe cargar los tipos de producto correctamente', () => {
    mockTipoProductoService.obtenerTodos.and.returnValue(of(mockTipos));
    component.cargarTiposProducto();
    expect(component.tiposProducto).toEqual(mockTipos);
  });

  it('debe manejar error al cargar tipos de producto', fakeAsync(() => {
    mockTipoProductoService.obtenerTodos.and.returnValue(throwError(() => new Error('API error')));
    (MatSnackBar.prototype.open as jasmine.Spy).calls.reset();

    component.cargarTiposProducto();
    tick();
    fixture.detectChanges();

    expect(component.tiposProducto).toEqual([]);
    expect(MatSnackBar.prototype.open).toHaveBeenCalledWith(
      'Error al cargar tipos de producto',
      'Cerrar',
      { duration: 3500, panelClass: 'snack-error' }
    );
  }));

  it('debe crear un nuevo tipo de producto si response es exitoso', fakeAsync(() => {
    mockTipoProductoService.obtenerTodos.and.returnValue(of([]));

    component.nuevoTipoProducto();
    tick();

    expect(MatDialog.prototype.open).toHaveBeenCalled();
    expect(MatSnackBar.prototype.open).toHaveBeenCalledWith('Creado', 'Cerrar', { duration: 3000 });
  }));

  it('debe editar un tipo de producto si response es exitoso', fakeAsync(() => {
    const tipo = mockTipos[0];
    const dialogRef = { afterClosed: () => of({ status: true, message: 'Actualizado' } as ResponseModel) };

    mockTipoProductoService.obtenerPorId.and.returnValue(of(tipo));
    (MatDialog.prototype.open as jasmine.Spy).and.returnValue(dialogRef as any);
    mockTipoProductoService.obtenerTodos.and.returnValue(of([]));

    component.editarTipoProducto(tipo.idTipoProducto);
    tick();

    expect(mockTipoProductoService.obtenerPorId).toHaveBeenCalledWith(tipo.idTipoProducto);
    expect(MatSnackBar.prototype.open).toHaveBeenCalledWith('Actualizado', 'Cerrar', { duration: 3000 });
  }));

});
