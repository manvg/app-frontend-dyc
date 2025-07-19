import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { titulo: 'Confirmar acción', mensaje: '¿Estás seguro?' }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cerrar el diálogo con "true" al confirmar', () => {
    component.confirmar();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('debería cerrar el diálogo con "false" al cancelar', () => {
    component.cancelar();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });

  it('debería recibir los datos del diálogo correctamente', () => {
    expect(component.data.titulo).toBe('Confirmar acción');
    expect(component.data.mensaje).toBe('¿Estás seguro?');
  });
});
