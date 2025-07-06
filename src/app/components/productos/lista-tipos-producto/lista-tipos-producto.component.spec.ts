import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTiposProductoComponent  } from './lista-tipos-producto.component';

describe('ListaTiposProductoComponent ', () => {
  let component: ListaTiposProductoComponent ;
  let fixture: ComponentFixture<ListaTiposProductoComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTiposProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTiposProductoComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
