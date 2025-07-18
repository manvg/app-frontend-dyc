import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PersonalizadaComponent } from './personalizada.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SolicitudService } from '../../../../services/solicitud/solicitud.service';
import { ImageService } from '../../../../services/image/image.service';
import { of, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Solicitud } from '../../../../models/solicitud.models';

describe('PersonalizadaComponent', () => {
  let component: PersonalizadaComponent;
  let fixture: ComponentFixture<PersonalizadaComponent>;
  let solicitudServiceSpy: jasmine.SpyObj<SolicitudService>;
  let imageServiceSpy: jasmine.SpyObj<ImageService>;

  beforeEach(async () => {
    solicitudServiceSpy = jasmine.createSpyObj('SolicitudService', ['crear']);
    imageServiceSpy = jasmine.createSpyObj('ImageService', ['uploadImage']);

    await TestBed.configureTestingModule({
      imports: [PersonalizadaComponent, ReactiveFormsModule, CommonModule],
      providers: [
        FormBuilder,
        { provide: SolicitudService, useValue: solicitudServiceSpy },
        { provide: ImageService, useValue: imageServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalizadaComponent);
    component = fixture.componentInstance;
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe invalidar el formulario si faltan campos requeridos', () => {
    component.form.setValue({
      nombre: '',
      apellidos: '',
      email: '',
      telefono: '',
      descripcion: '',
      cantidad: null,
      descripcionArchivo: '',
      archivo: null
    });

    expect(component.form.invalid).toBeTrue();
  });

  it('debe subir imagen y enviar solicitud personalizada con éxito', fakeAsync(async () => {
    const archivoMock = new File(['contenido'], 'archivo.jpg', { type: 'image/jpeg' });
    const urlMock = 'https://s3.amazonaws.com/mi-bucket/archivo.jpg';

    // Mocks
    imageServiceSpy.uploadImage.and.returnValue(of(urlMock));
    solicitudServiceSpy.crear.and.returnValue(of({
      idTipoSolicitud: 3,
      idEstadoSolicitud: 1,
      nombreCliente: 'Juan Pérez',
      correoCliente: 'juan@example.com',
      productos: [],
      imagenes: []
    } as Solicitud));

    component.form.setValue({
      nombre: 'Juan',
      apellidos: 'Pérez',
      email: 'juan@example.com',
      telefono: '123456789',
      descripcion: 'Quiero un producto especial',
      cantidad: 2,
      descripcionArchivo: 'Referencia visual',
      archivo: archivoMock
    });

    component.archivoSeleccionado = archivoMock;
    component.archivoNombre = archivoMock.name;

    await component.enviarSolicitud();
    tick();

    expect(imageServiceSpy.uploadImage).toHaveBeenCalled();
    expect(solicitudServiceSpy.crear).toHaveBeenCalled();
    expect(component.enviado).toBeTrue();
    expect(component.enviando).toBeFalse();
    expect(component.errorEnvio).toBeNull();
  }));

  it('debe manejar error al subir imagen', fakeAsync(async () => {
    const archivoMock = new File(['contenido'], 'archivo.jpg', { type: 'image/jpeg' });

    imageServiceSpy.uploadImage.and.returnValue(throwError(() => new Error('Fallo S3')));

    component.form.patchValue({
      nombre: 'Ana',
      apellidos: 'López',
      email: 'ana@example.com',
      telefono: '',
      descripcion: 'Con archivo',
      cantidad: 1,
      descripcionArchivo: 'Una referencia',
      archivo: archivoMock
    });

    component.archivoSeleccionado = archivoMock;
    component.archivoNombre = archivoMock.name;

    await component.enviarSolicitud();
    tick();

    expect(imageServiceSpy.uploadImage).toHaveBeenCalled();
    expect(component.errorEnvio).toContain('Error al subir el archivo');
    expect(component.enviando).toBeFalse();
  }));

  it('debe manejar error al enviar solicitud', fakeAsync(async () => {
    solicitudServiceSpy.crear.and.returnValue(throwError(() => new Error('Error al guardar')));

    component.form.patchValue({
      nombre: 'Luis',
      apellidos: 'Silva',
      email: 'luis@example.com',
      telefono: '999999999',
      descripcion: 'sin imagen',
      cantidad: 1,
      descripcionArchivo: '',
      archivo: null
    });

    await component.enviarSolicitud();
    tick();

    expect(solicitudServiceSpy.crear).toHaveBeenCalled();
    expect(component.errorEnvio).toContain('Error al enviar la solicitud');
    expect(component.enviando).toBeFalse();
  }));
});
