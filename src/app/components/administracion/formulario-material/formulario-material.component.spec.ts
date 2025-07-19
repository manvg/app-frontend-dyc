import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioMaterialComponent } from './formulario-material.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Material } from '../../../models/material.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

describe('FormularioMaterialComponent', () => {
  let component: FormularioMaterialComponent;
  let fixture: ComponentFixture<FormularioMaterialComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<FormularioMaterialComponent>>;

  const materialMock: Material = {
    idMaterial: 1,
    nombre: 'Madera',
    activo: 1
  };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        FormularioMaterialComponent,
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: materialMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el material con los datos inyectados', () => {
    expect(component.material).toEqual(materialMock);
  });

  it('debe cerrar el diálogo con el material al guardar()', () => {
    component.material.nombre = 'Nuevo nombre';
    component.guardar();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(component.material);
  });

  it('debe cerrar el diálogo con null al cancelar()', () => {
    component.cancelar();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(null);
  });
});
