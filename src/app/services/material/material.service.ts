import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Material } from '../../models/material.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private api = environment.materiales.api;
  private endpoints = environment.materiales.endpoints;

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.api}${this.endpoints.obtenerTodos}`);
  }

  obtenerPorId(id: number): Observable<Material> {
    return this.http.get<Material>(`${this.api}${this.endpoints.obtenerTodos}/${id}`);
  }

  crear(material: Material): Observable<Material> {
    return this.http.post<Material>(`${this.api}${this.endpoints.obtenerTodos}`, material);
  }

  actualizar(id: number, material: Material): Observable<Material> {
    return this.http.put<Material>(`${this.api}${this.endpoints.obtenerTodos}/${id}`, material);
  }

  cambiarEstado(id: number, activo: number): Observable<void> {
    const params = new HttpParams().set('activo', activo.toString());
    return this.http.put<void>(
      `${this.api}${this.endpoints.obtenerTodos}/${id}/cambiar-estado`,
      null,
      { params }
    );
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}${this.endpoints.obtenerTodos}/${id}`);
  }

}
