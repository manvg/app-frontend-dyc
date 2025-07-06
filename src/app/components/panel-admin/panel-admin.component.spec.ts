import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelAdminComponent } from './panel-admin.component';
import { Router } from '@angular/router';

describe('PanelAdminComponent', () => {
  let component: PanelAdminComponent;
  let fixture: ComponentFixture<PanelAdminComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [PanelAdminComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PanelAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar el nombre del usuario', () => {
    component.usuario = 'Carlos';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Carlos');
  });

  it('debe navegar a /mantenedor-productos al hacer click', () => {
    const card = fixture.nativeElement.querySelectorAll('.panel-admin-card')[0];
    card.click();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/mantenedor-productos']);
  });

  it('debe navegar a /mantenedor-tipos-productos al hacer click', () => {
    const card = fixture.nativeElement.querySelectorAll('.panel-admin-card')[1];
    card.click();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/mantenedor-tipos-productos']);
  });

  it('debe navegar a /visualizador-solicitudes al hacer click', () => {
    const card = fixture.nativeElement.querySelectorAll('.panel-admin-card')[2];
    card.click();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/visualizador-solicitudes']);
  });

  it('debe redirigir al login al hacer logout', () => {
    const hrefSpy = spyOnProperty(window.location, 'href', 'set');
    const logoutBtn = fixture.nativeElement.querySelector('.logout-btn');
    logoutBtn.click();
    expect(hrefSpy).toHaveBeenCalledWith('/login');
  });

});
