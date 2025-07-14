import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoProducto } from '../../models/tipo-producto.model';
import { ResponseModel } from '../../models/response-model.model';
import { environment } from '../../../environments/environment';
//import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {
  private api = environment.tipoProductos.api;
  private endpoints = environment.tipoProductos.endpoints;

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<TipoProducto[]> {
    return this.http.get<TipoProducto[]>(`${this.api}${this.endpoints.obtenerTodos}`);
  }

  obtenerPorId(id: number): Observable<TipoProducto> {
    return this.http.get<TipoProducto>(`${this.api}${this.endpoints.obtenerPorId}${id}`);
  }

  crear(dto: TipoProducto): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.api}${this.endpoints.crear}`, dto);
  }

  actualizar(id: number, dto: TipoProducto): Observable<ResponseModel> {
    return this.http.put<ResponseModel>(`${this.api}${this.endpoints.actualizar}${id}`, dto);
  }

  cambiarEstado(id: number, activo: number): Observable<ResponseModel> {
    const params = new HttpParams().set('activo', activo.toString());
    return this.http.put<ResponseModel>(
      `${this.api}${this.endpoints.cambiarEstado}${id}/cambiar-estado`,
      null,
      { params }
    );
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}${this.endpoints.eliminar}${id}`);
  }
}
