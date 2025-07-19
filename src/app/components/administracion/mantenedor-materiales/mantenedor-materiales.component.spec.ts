import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MantenedorMaterialesComponent } from './mantenedor-materiales.component';
import { MaterialService } from '../../../services/material/material.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { Material } from '../../../models/material.model';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MantenedorMaterialesComponent', () => {
  let component: MantenedorMaterialesComponent;
  let fixture: ComponentFixture<MantenedorMaterialesComponent>;
  let mockMaterialService: jasmine.SpyObj<MaterialService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  const mockMaterial: Material = {
    idMaterial: 1,
    nombre: 'Acrílico',
    activo: 1
  };

  beforeEach(async () => {
    mockMaterialService = jasmine.createSpyObj('MaterialService', [
      'obtenerTodos',
      'crear',
      'obtenerPorId',
      'actualizar',
      'cambiarEstado',
      'eliminar'
    ]);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [MantenedorMaterialesComponent, NoopAnimationsModule],
      providers: [
        { provide: MaterialService, useValue: mockMaterialService },
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MantenedorMaterialesComponent);
    component = fixture.componentInstance;
  });

  it('debe cargar materiales correctamente', () => {
    mockMaterialService.obtenerTodos.and.returnValue(of([mockMaterial]));
    fixture.detectChanges();
    expect(component.materiales?.length).toBe(1);
    expect(component.materiales![0].nombre).toBe('Acrílico');
  });

  it('debe manejar error al cargar materiales', () => {
    mockMaterialService.obtenerTodos.and.returnValue(throwError(() => new Error('Error de red')));
    fixture.detectChanges();
    expect(component.materiales).toEqual([]);
    expect(mockSnackBar.open).toHaveBeenCalledWith('Error al cargar materiales', 'Cerrar', {
      duration: 3500,
      panelClass: 'snack-error'
    });
  });

  it('debe crear un nuevo material si se cierra el diálogo con datos válidos', fakeAsync(() => {
    const dialogRefMock = {
      afterClosed: () => of(mockMaterial)
    } as any;
    mockDialog.open.and.returnValue(dialogRefMock);
    mockMaterialService.crear.and.returnValue(of(mockMaterial));
    mockMaterialService.obtenerTodos.and.returnValue(of([]));

    component.nuevoMaterial();
    tick();

    expect(mockMaterialService.crear).toHaveBeenCalledWith(mockMaterial);
    expect(mockSnackBar.open).toHaveBeenCalledWith('Material creado', 'Cerrar', { duration: 3000 });
  }));

  it('debe editar material correctamente', fakeAsync(() => {
    const dialogRefMock = { afterClosed: () => of(mockMaterial) } as any;
    mockDialog.open.and.returnValue(dialogRefMock);
    mockMaterialService.obtenerPorId.and.returnValue(of(mockMaterial));
    mockMaterialService.actualizar.and.returnValue(of(mockMaterial));
    mockMaterialService.obtenerTodos.and.returnValue(of([]));

    component.editarMaterial(1);
    tick();

    expect(mockMaterialService.actualizar).toHaveBeenCalledWith(1, mockMaterial);
    expect(mockSnackBar.open).toHaveBeenCalledWith('Material Actualizado', 'Cerrar', { duration: 3000 });
  }));

  it('debe cambiar estado del material si se confirma el diálogo', fakeAsync(() => {
    const dialogRefMock = { afterClosed: () => of(true) } as any;
    mockDialog.open.and.returnValue(dialogRefMock);
    mockMaterialService.cambiarEstado.and.returnValue(of(undefined as void));
    mockMaterialService.obtenerTodos.and.returnValue(of([]));

    component.cambiarVigenciaMaterial(mockMaterial);
    tick();

    expect(mockMaterialService.cambiarEstado).toHaveBeenCalledWith(1, 0);
    expect(mockSnackBar.open).toHaveBeenCalledWith('Material desactivado', 'Cerrar', { duration: 3000 });
  }));

  it('debe eliminar el material si se confirma', fakeAsync(() => {
    const dialogRefMock = { afterClosed: () => of(true) } as any;
    mockDialog.open.and.returnValue(dialogRefMock);
    mockMaterialService.eliminar.and.returnValue(of(undefined as void));
    mockMaterialService.obtenerTodos.and.returnValue(of([]));

    component.eliminarMaterial(1);
    tick();

    expect(mockMaterialService.eliminar).toHaveBeenCalledWith(1);
    expect(mockSnackBar.open).toHaveBeenCalledWith('MAterial eliminado', 'Cerrar', { duration: 3000 });
  }));
});
