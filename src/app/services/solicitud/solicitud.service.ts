import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Solicitud } from '../../models/solicitud.models';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private isProd = window.location.hostname !== 'localhost';
  private prodUrl = 'https://xa8hsg5wk6.execute-api.us-east-1.amazonaws.com/solicitud';
  private devUrl = 'https://xa8hsg5wk6.execute-api.us-east-1.amazonaws.com/solicitud';//'http://localhost:8082/api/solicitudes';

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<Solicitud[]> {
    const url = this.isProd ? `${this.prodUrl}/all` : `${this.devUrl}`;
    return this.http.get<Solicitud[]>(url);
  }

  obtenerActivos(): Observable<Solicitud[]> {
    const url = this.isProd ? `${this.prodUrl}/all/activo` : `${this.devUrl}/activos`;
    return this.http.get<Solicitud[]>(url);
  }

  obtenerPorId(id: number): Observable<Solicitud> {
    const url = this.isProd ? `${this.prodUrl}/${id}` : `${this.devUrl}/${id}`;
    return this.http.get<Solicitud>(url);
  }

  crear(solicitud: Solicitud): Observable<Solicitud> {
    const url = this.isProd ? `${this.prodUrl}` : `${this.devUrl}`;
    return this.http.post<Solicitud>(url, solicitud);
  }

  actualizar(id: number, solicitud: Solicitud): Observable<Solicitud> {
    const url = this.isProd ? `${this.prodUrl}/${id}` : `${this.devUrl}/${id}`;
    return this.http.put<Solicitud>(url, solicitud);
  }

  cambiarEstado(id: number, activo: number): Observable<void> {
    const url = this.isProd
      ? `${this.prodUrl}/${id}/cambiar-estado?activo=${activo}`
      : `${this.devUrl}/${id}/cambiar-estado?activo=${activo}`;
    return this.http.put<void>(url, {});
  }

  eliminar(id: number): Observable<void> {
    const url = this.isProd ? `${this.prodUrl}/${id}` : `${this.devUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
