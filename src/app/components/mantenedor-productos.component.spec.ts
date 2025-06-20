import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenedorProductosComponent } from './mantenedor-productos.component';

describe('MantenedorProductosComponent', () => {
  let component: MantenedorProductosComponent;
  let fixture: ComponentFixture<MantenedorProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MantenedorProductosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenedorProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
