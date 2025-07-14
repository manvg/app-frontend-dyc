import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenedorServiciosComponent } from './mantenedor-servicios.component';

describe('MantenedorServiciosComponent', () => {
  let component: MantenedorServiciosComponent;
  let fixture: ComponentFixture<MantenedorServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MantenedorServiciosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenedorServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
