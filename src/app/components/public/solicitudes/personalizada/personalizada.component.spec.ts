import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizadaComponent } from './personalizada.component';

describe('PersonalizadaComponent', () => {
  let component: PersonalizadaComponent;
  let fixture: ComponentFixture<PersonalizadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalizadaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
