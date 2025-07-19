import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;

  const mockData = {
    titulo: 'Confirmar acción',
    mensaje: '¿Estás seguro que deseas continuar?'
  };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent, CommonModule, MatButtonModule, MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: mockData }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cerrar el diálogo con true al confirmar', () => {
    component.confirmar();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('debe cerrar el diálogo con false al cancelar', () => {
    component.cancelar();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });

  it('debe recibir datos desde MAT_DIALOG_DATA', () => {
    expect(component.data.titulo).toBe('Confirmar acción');
    expect(component.data.mensaje).toBe('¿Estás seguro que deseas continuar?');
  });
});
