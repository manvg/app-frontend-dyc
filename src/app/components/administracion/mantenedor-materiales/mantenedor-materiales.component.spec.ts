import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenedorMaterialesComponent } from './mantenedor-materiales.component';

describe('MantenedorMaterialesComponent', () => {
  let component: MantenedorMaterialesComponent;
  let fixture: ComponentFixture<MantenedorMaterialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MantenedorMaterialesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenedorMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
