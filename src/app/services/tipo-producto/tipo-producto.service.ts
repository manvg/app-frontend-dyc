import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoProducto } from '../../models/tipo-producto.model';
import { ResponseModel } from '../../models/response-model.model';
@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {
  private apiUrl = 'https://xa8hsg5wk6.execute-api.us-east-1.amazonaws.com/producto/tipo';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<TipoProducto[]> {
    return this.http.get<TipoProducto[]>(`${this.apiUrl}/all`);
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
