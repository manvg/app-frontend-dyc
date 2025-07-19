import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { PersonalizadaComponent } from './personalizada.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SolicitudService } from '../../../../services/solicitud/solicitud.service';
import { ImageService } from '../../../../services/image/image.service';
import { of, throwError, Subject, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
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
      imports: [PersonalizadaComponent, ReactiveFormsModule],
      providers: [
        { provide: SolicitudService, useValue: solicitudServiceSpy },
        { provide: ImageService, useValue: imageServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: {}, params: of({}), queryParams: of({}) } },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('formulario debe ser inválido si está vacío', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('formulario debe ser válido con datos correctos', () => {
    component.form.patchValue({
      nombre: 'Juan',
      apellidos: 'Pérez',
      email: 'juan@mail.com',
      telefono: '123456789',
      descripcion: 'Solicitud personalizada',
      cantidad: 2
    });
    expect(component.form.valid).toBeTrue();
  });

  it('debe seleccionar un archivo y actualizar variables', () => {
    const file = new File(['contenido'], 'test.png', { type: 'image/png' });
    const event = {
      target: { files: [file] }
    } as unknown as Event;

    component.onArchivoChange(event);
    expect(component.archivoSeleccionado).toBe(file);
    expect(component.archivoNombre).toBe('test.png');
    expect(component.form.value.archivo).toBe(file);
  });

  it('debe obtener la extensión del archivo correctamente', () => {
    expect(component.getExtension('foto.png')).toBe('png');
    expect(component.getExtension('archivo.tar.gz')).toBe('gz');
    expect(component.getExtension('sin_extension')).toBe('');
  });

  it('no debe enviar si el formulario es inválido', fakeAsync(() => {
    spyOn(component.form, 'markAllAsTouched');
    component.enviarSolicitud();
    expect(component.form.markAllAsTouched).toHaveBeenCalled();
    expect(component.enviando).toBeFalse();
  }));

  it('debe enviar la solicitud con archivo correctamente', fakeAsync(() => {
    component.form.patchValue({
      nombre: 'Juan',
      apellidos: 'Pérez',
      email: 'juan@mail.com',
      telefono: '12345678',
      descripcion: 'Descripción',
      cantidad: 2,
      descripcionArchivo: 'Imagen de ejemplo'
    });

    // Agrega este log para ver el estado del form en la consola de Karma
    console.log('¿Form válido?', component.form.valid);

    const file = new File(['contenido'], 'archivo.jpg', { type: 'image/jpeg' });
    component.archivoSeleccionado = file;
    component.archivoNombre = file.name;

    imageServiceSpy.uploadImage.and.returnValue(of('http://fake-url/archivo.jpg'));
    const crearSubject = new Subject<Solicitud>();
    solicitudServiceSpy.crear.and.returnValue(crearSubject.asObservable());

    component.enviarSolicitud();

    // Avanza el flujo asíncrono
    tick();

    // Ahora sí, tras tick(), debería haberse llamado crear
    expect(imageServiceSpy.uploadImage).toHaveBeenCalled();
    expect(solicitudServiceSpy.crear).toHaveBeenCalled();

    // Simula respuesta exitosa para limpiar "enviando"
    crearSubject.next({} as Solicitud);
    crearSubject.complete();
    tick();

    expect(component.enviando).toBeFalse();
    flush();
  }));



  it('debe manejar error al enviar la solicitud (servicio)', fakeAsync(() => {
    component.form.patchValue({
      nombre: 'Juan',
      apellidos: 'Pérez',
      email: 'juan@mail.com',
      telefono: '12345678',
      descripcion: 'Desc',
      cantidad: 1
    });

    imageServiceSpy.uploadImage.and.returnValue(of());
    solicitudServiceSpy.crear.and.returnValue(throwError(() => new Error('Fallo al crear solicitud')) as Observable<Solicitud>);

    component.enviarSolicitud();
    tick();

    expect(component.errorEnvio).toContain('Error al enviar la solicitud');
    expect(component.enviando).toBeFalse();
    flush();
  }));

  it('debe manejar error al subir archivo', fakeAsync(() => {
    component.form.patchValue({
      nombre: 'Juan',
      apellidos: 'Pérez',
      email: 'juan@mail.com',
      telefono: '12345678',
      descripcion: 'Desc',
      cantidad: 1,
      descripcionArchivo: 'desc'
    });

    const file = new File(['contenido'], 'foto.png', { type: 'image/png' });
    component.archivoSeleccionado = file;
    component.archivoNombre = file.name;

    imageServiceSpy.uploadImage.and.returnValue(throwError(() => new Error('Fallo upload')) as Observable<string>);

    component.enviarSolicitud();
    tick();

    expect(component.errorEnvio).toContain('Error al subir el archivo');
    expect(component.enviando).toBeFalse();
    flush();
  }));

  it('campoInvalido debe funcionar correctamente', () => {
    const control = component.form.get('nombre');
    control?.markAsTouched();
    control?.setValue('');
    expect(component.campoInvalido('nombre')).toBeTrue();
  });

  it('emailErrors y cantidadErrors deben retornar null si no hay errores', () => {
    component.form.get('email')?.markAsTouched();
    component.form.get('email')?.setValue('valid@mail.com');
    component.form.get('cantidad')?.markAsTouched();
    component.form.get('cantidad')?.setValue(3);

    expect(component.emailErrors).toBeNull();
    expect(component.cantidadErrors).toBeNull();
  });

  it('emailErrors y cantidadErrors deben detectar errores', () => {
    component.form.get('email')?.markAsTouched();
    component.form.get('email')?.setValue('correo_invalido');
    component.form.get('cantidad')?.markAsTouched();
    component.form.get('cantidad')?.setValue(0);

    expect(component.emailErrors).not.toBeNull();
    expect(component.cantidadErrors).not.toBeNull();
  });
});
