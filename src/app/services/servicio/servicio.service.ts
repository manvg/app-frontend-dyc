import { Injectable } from '@angular/core';
// import { environment } from '../../../environments/environment';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicio } from '../../models/servicio.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private api = environment.servicios.api;
  private endpoints = environment.servicios.endpoints;

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.api}${this.endpoints.obtenerTodos}`);
  }

  obtenerActivos(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.api}${this.endpoints.obtenerActivos}`);
  }

  obtenerPorId(id: number): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.api}${this.endpoints.obtenerPorId}${id}`);
  }

  crear(servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(`${this.api}${this.endpoints.crear}`, servicio);
  }

  actualizar(id: number, servicio: Servicio): Observable<Servicio> {
    return this.http.put<Servicio>(`${this.api}${this.endpoints.actualizar}${id}`, servicio);
  }

  cambiarEstado(id: number, activo: number): Observable<void> {
    return this.http.put<void>(
      `${this.api}${this.endpoints.cambiarEstado}${id}/cambiar-estado?activo=${activo}`,
      {}
    );
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}${this.endpoints.eliminar}${id}`);
  }

}
