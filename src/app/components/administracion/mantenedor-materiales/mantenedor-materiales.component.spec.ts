// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MantenedorMaterialesComponent } from './mantenedor-materiales.component';
// import { MaterialService } from '../../../services/material/material.service';
// import { MatDialog } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { of, throwError } from 'rxjs';
// import { Material } from '../../../models/material.model';
// import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
// import { FormularioMaterialComponent } from '../formulario-material/formulario-material.component';
// import { ResponseModel } from '../../../models/response-model.model';

// describe('MantenedorMaterialesComponent', () => {
//   let component: MantenedorMaterialesComponent;
//   let fixture: ComponentFixture<MantenedorMaterialesComponent>;

//   let mockMaterialService: jasmine.SpyObj<MaterialService>;
//   let mockDialog: jasmine.SpyObj<MatDialog>;
//   let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

//   beforeEach(async () => {
//     mockMaterialService = jasmine.createSpyObj('MaterialService', [
//       'obtenerTodos',
//       'obtenerPorId',
//       'crear',
//       'actualizar',
//       'eliminar',
//       'cambiarEstado'
//     ]);
//     mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
//     mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

//     await TestBed.configureTestingModule({
//       imports: [MantenedorMaterialesComponent],
//       providers: [
//         { provide: MaterialService, useValue: mockMaterialService },
//         { provide: MatDialog, useValue: mockDialog },
//         { provide: MatSnackBar, useValue: mockSnackBar }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(MantenedorMaterialesComponent);
//     component = fixture.componentInstance;
//   });

//   it('debe cargar materiales correctamente', () => {
//     const materialesMock: Material[] = [{ idMaterial: 1, nombre: 'Madera', activo: 1 }];
//     mockMaterialService.obtenerTodos.and.returnValue(of(materialesMock));

//     component.cargarMateriales();

//     expect(component.materiales).toEqual(materialesMock);
//   });

//   it('debe manejar error al cargar materiales', () => {
//     mockMaterialService.obtenerTodos.and.returnValue(throwError(() => new Error('Error en la API')));

//     component.cargarMateriales();

//     expect(component.materiales).toEqual([]);
//     expect(mockSnackBar.open).toHaveBeenCalledWith(
//       'Error al cargar materiales',
//       'Cerrar',
//       { duration: 3500, panelClass: 'snack-error' }
//     );
//   });

//   it('debe activar/desactivar un material', () => {
//     const materialMock: Material = { idMaterial: 1, nombre: 'Madera', activo: 1 };
//     const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true), close: null });
//     mockDialog.open.and.returnValue(dialogRefSpyObj);
//     mockMaterialService.cambiarEstado.and.returnValue(of(undefined as void));
//     mockMaterialService.obtenerTodos.and.returnValue(of([]));

//     component.cambiarVigenciaMaterial(materialMock);

//     expect(mockMaterialService.cambiarEstado).toHaveBeenCalledWith(1, 0);
//     expect(mockSnackBar.open).toHaveBeenCalledWith('Material desactivado', 'Cerrar', { duration: 3000 });
//   });

//   it('debe eliminar un material', () => {
//     const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true), close: null });
//     mockDialog.open.and.returnValue(dialogRefSpyObj);
//     mockMaterialService.eliminar.and.returnValue(of(undefined as void));
//     mockMaterialService.obtenerTodos.and.returnValue(of([]));

//     component.eliminarMaterial(1);

//     expect(mockMaterialService.eliminar).toHaveBeenCalledWith(1);
//     expect(mockSnackBar.open).toHaveBeenCalledWith('Material eliminado', 'Cerrar', { duration: 3000 });
//   });

//   it('trackById debe retornar el id del material', () => {
//     const material: Material = { idMaterial: 5, nombre: 'Cartón', activo: 1 };
//     expect(component.trackById(0, material)).toBe(5);
//   });
// });
