import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolicitudBitacora } from '../../models/solicitud-bitacora';
//import { environment } from '../../../environments/environment';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SolicitudBitacoraService {

  private apiUrl = environment.bitacoras.api;
  private endpoints = environment.bitacoras.endpoints;

  constructor(private http: HttpClient) {}

  obtenerPorSolicitud(idSolicitud: number): Observable<SolicitudBitacora[]> {
    return this.http.get<SolicitudBitacora[]>(`${this.apiUrl}${this.endpoints.obtenerPorId}${idSolicitud}`);
  }

  crear(bitacora: SolicitudBitacora): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}${this.endpoints.crear}`, bitacora
    );
  }

  actualizar(idBitacora: number, bitacora: SolicitudBitacora): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${this.endpoints.actualizar}${idBitacora}`, bitacora);
  }

  eliminar(idBitacora: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${this.endpoints.eliminar}${idBitacora}`);
  }
}
