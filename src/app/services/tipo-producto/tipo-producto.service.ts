import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoProducto } from '../../models/tipo-producto.model';
import { ResponseModel } from '../../models/response-model.model';
@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {
  private apiUrl = 'http://localhost:8080/api/productos/tipos';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<TipoProducto[]> {
    return this.http.get<TipoProducto[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<TipoProducto> {
    return this.http.get<TipoProducto>(`${this.apiUrl}/${id}`);
  }

  crear(dto: TipoProducto): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.apiUrl, dto);
  }

  actualizar(id: number, dto: TipoProducto): Observable<ResponseModel> {
    return this.http.put<ResponseModel>(`${this.apiUrl}/${id}`, dto);
  }

  cambiarEstado(id: number, activo: number): Observable<ResponseModel> {
    const params = new HttpParams().set('activo', activo.toString());
    return this.http.put<ResponseModel>(`${this.apiUrl}/${id}/cambiar-estado`, null, { params });
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
