import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MantenedorTipoProductoComponent } from './mantenedor-tipo-producto.component';

describe('MantenedorTipoProductoComponent', () => {
  let component: MantenedorTipoProductoComponent;
  let fixture: ComponentFixture<MantenedorTipoProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MantenedorTipoProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenedorTipoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
