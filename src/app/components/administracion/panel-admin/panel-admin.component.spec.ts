import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelAdminComponent } from './panel-admin.component';
import { Router } from '@angular/router';

describe('PanelAdminComponent', () => {
  let component: PanelAdminComponent;
  let fixture: ComponentFixture<PanelAdminComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [PanelAdminComponent],
      providers: [{ provide: Router, useValue: mockRouter }]
    }).compileComponents();

    fixture = TestBed.createComponent(PanelAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe navegar a /mantenedor-productos', () => {
    component.irAMantenedorProductos();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/mantenedor-productos']);
  });

  it('debe navegar a /mantenedor-tipo-producto', () => {
    component.irAMantenedorTipos();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/mantenedor-tipo-producto']);
  });

  it('debe navegar a /visualizador-solicitudes', () => {
    component.irAVisualizadorSolicitudes();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/visualizador-solicitudes']);
  });

  it('debe navegar a /mantenedor-materiales', () => {
    component.irAMantenedorMateriales();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/mantenedor-materiales']);
  });

  it('debe navegar a /gestion-solicitudes', () => {
    component.irAGestionSolicitudes();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/gestion-solicitudes']);
  });

  it('debe navegar a /mantenedor-servicios', () => {
    component.irAMantenedorServicios();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/mantenedor-servicios']);
  });
});
