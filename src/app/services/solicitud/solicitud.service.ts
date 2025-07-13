import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Solicitud } from '../../models/solicitud.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private api = environment.solicitudes.api;
  private endpoints = environment.solicitudes.endpoints;

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.api}${this.endpoints.obtenerTodos}`);
  }

  obtenerActivos(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.api}${this.endpoints.obtenerTodos}/activos`);
  }

  obtenerPorId(id: number): Observable<Solicitud> {
    return this.http.get<Solicitud>(`${this.api}${this.endpoints.obtenerTodos}/${id}`);
  }

  crear(solicitud: Solicitud): Observable<Solicitud> {
    return this.http.post<Solicitud>(`${this.api}${this.endpoints.obtenerTodos}`, solicitud);
  }

  crearSolicitudServicio(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.api}${this.endpoints.obtenerTodos}`, formData);
  }

  actualizar(id: number, solicitud: Solicitud): Observable<Solicitud> {
    return this.http.put<Solicitud>(`${this.api}${this.endpoints.obtenerTodos}/${id}`, solicitud);
  }

  cambiarEstado(id: number, activo: number): Observable<void> {
    return this.http.put<void>(
      `${this.api}${this.endpoints.obtenerTodos}/${id}/cambiar-estado?activo=${activo}`, {}
    );
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}${this.endpoints.obtenerTodos}/${id}`);
  }
}
