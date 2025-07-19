import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MantenedorMaterialesComponent } from './mantenedor-materiales.component';
import { MaterialService } from '../../../services/material/material.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { Material } from '../../../models/material.model';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

describe('MantenedorMaterialesComponent', () => {
  let component: MantenedorMaterialesComponent;
  let fixture: ComponentFixture<MantenedorMaterialesComponent>;

  let mockMaterialService: jasmine.SpyObj<MaterialService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    mockMaterialService = jasmine.createSpyObj('MaterialService', [
      'obtenerTodos',
      'obtenerPorId',
      'crear',
      'actualizar',
      'eliminar',
      'cambiarEstado'
    ]);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        MantenedorMaterialesComponent,
        NoopAnimationsModule,
        ConfirmDialogComponent // <--- IMPORTANTE: esto resuelve el error
      ],
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
    const materialesMock: Material[] = [{ idMaterial: 1, nombre: 'Madera', activo: 1 }];
    mockMaterialService.obtenerTodos.and.returnValue(of(materialesMock));

    component.cargarMateriales();

    expect(component.materiales).toEqual(materialesMock);
  });

});
