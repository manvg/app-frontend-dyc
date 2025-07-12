import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private urlBase = 'https://xa8hsg5wk6.execute-api.us-east-1.amazonaws.com/producto';

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.urlBase}/all`);
  }

  obtenerActivos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.urlBase}/all/activo`);
  }

  obtenerPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.urlBase}/${id}`);
  }

  crear(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.urlBase, producto);
  }

  actualizar(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.urlBase}/${id}`, producto);
  }

  cambiarEstado(id: number, activo: number): Observable<void> {
    return this.http.put<void>(`${this.urlBase}/${id}/cambiar-estado?activo=${activo}`, {});
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${id}`);
  }
}
