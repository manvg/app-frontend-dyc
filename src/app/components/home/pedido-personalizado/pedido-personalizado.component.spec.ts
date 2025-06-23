import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoPersonalizadoComponent } from './pedido-personalizado.component';

describe('PedidoPersonalizadoComponent', () => {
  let component: PedidoPersonalizadoComponent;
  let fixture: ComponentFixture<PedidoPersonalizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoPersonalizadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoPersonalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
