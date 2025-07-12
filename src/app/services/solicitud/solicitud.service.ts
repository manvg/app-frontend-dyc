import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Solicitud } from '../../models/solicitud.models';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private urlBase = 'https://xa8hsg5wk6.execute-api.us-east-1.amazonaws.com/solicitud';

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.urlBase}/all`);
  }

  obtenerActivos(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.urlBase}/all/activo`);
  }

  obtenerPorId(id: number): Observable<Solicitud> {
    return this.http.get<Solicitud>(`${this.urlBase}/${id}`);
  }

  crear(solicitud: Solicitud): Observable<Solicitud> {
    return this.http.post<Solicitud>(`${this.urlBase}`, solicitud);
  }

  crearSolicitudServicio(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.urlBase}`, formData);
  }

  actualizar(id: number, solicitud: Solicitud): Observable<Solicitud> {
    return this.http.put<Solicitud>(`${this.urlBase}/${id}`, solicitud);
  }

  cambiarEstado(id: number, activo: number): Observable<void> {
    return this.http.put<void>(`${this.urlBase}/${id}/cambiar-estado?activo=${activo}`, {});
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${id}`);
  }
}
