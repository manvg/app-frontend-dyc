import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private isProd = window.location.hostname !== 'localhost';
  private prodUrl = 'https://xa8hsg5wk6.execute-api.us-east-1.amazonaws.com/producto';
  private devUrl = 'https://xa8hsg5wk6.execute-api.us-east-1.amazonaws.com/producto';//'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<Producto[]> {
    const url = this.isProd ? `${this.prodUrl}/all` : `${this.devUrl}/all`;
    return this.http.get<Producto[]>(url);
  }

  obtenerActivos(): Observable<Producto[]> {
    const url = this.isProd ? `${this.prodUrl}/all/activo` : `${this.devUrl}/activos`;
    return this.http.get<Producto[]>(url);
  }

  obtenerPorId(id: number): Observable<Producto> {
    const url = this.isProd ? `${this.prodUrl}/${id}` : `${this.devUrl}/${id}`;
    return this.http.get<Producto>(url);
  }

  crear(producto: Producto): Observable<Producto> {
    const url = this.isProd ? `${this.prodUrl}` : `${this.devUrl}`;
    return this.http.post<Producto>(url, producto);
  }

  actualizar(id: number, producto: Producto): Observable<Producto> {
    const url = this.isProd ? `${this.prodUrl}/${id}` : `${this.devUrl}/${id}`;
    return this.http.put<Producto>(url, producto);
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
