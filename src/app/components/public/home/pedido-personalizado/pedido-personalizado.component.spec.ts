import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidoPersonalizadoComponent } from './pedido-personalizado.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('PedidoPersonalizadoComponent', () => {
  let component: PedidoPersonalizadoComponent;
  let fixture: ComponentFixture<PedidoPersonalizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoPersonalizadoComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {},
            params: of({}),
            queryParams: of({}),
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PedidoPersonalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
