import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudServicioComponent } from './solicitud-servicio.component';

describe('SolicitudServicioComponent', () => {
  let component: SolicitudServicioComponent;
  let fixture: ComponentFixture<SolicitudServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudServicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
