import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioTipoProductoComponent } from './formulario-tipo-producto.component';

describe('FormularioTipoProductoComponent', () => {
  let component: FormularioTipoProductoComponent;
  let fixture: ComponentFixture<FormularioTipoProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioTipoProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioTipoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
