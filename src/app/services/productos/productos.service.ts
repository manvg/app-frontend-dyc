import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../../models/producto.model';
//import { environment } from '../../../environments/environment';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private api = environment.productos.api;
  private endpoints = environment.productos.endpoints;

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.api}${this.endpoints.obtenerTodos}`);
  }

  obtenerActivos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.api}${this.endpoints.obtenerActivos}`);
  }

  obtenerPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.api}${this.endpoints.obtenerPorId}${id}`);
  }

  crear(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.api}${this.endpoints.crear}`, producto);
  }

  actualizar(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.api}${this.endpoints.actualizar}${id}`, producto);
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
