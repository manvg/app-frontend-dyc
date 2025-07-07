import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Material } from '../../models/material.model';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private apiUrl = 'http://localhost:8081/api/materiales'

  constructor(private http: HttpClient) { }

  //get all
  obtenerTodos(): Observable<Material[]>{
    return this.http.get<Material[]>(this.apiUrl);
  }

  //get by id
  obtenerPorId(id: number): Observable<Material> {
    return this.http.get<Material>(`${this.apiUrl}/${id}`);
  }

  //post
  crear(material: Material): Observable<Material> {
    return this.http.post<Material>(this.apiUrl, material);
  }

  //put
  actualizar(id: number, material: Material): Observable<Material> {
    return this.http.put<Material>(`${this.apiUrl}/${id}`, material);
  }

  //cambiar estado
  cambiarEstado(id:number, activo:number): Observable<void> {
    const params = new HttpParams().set('activo', activo.toString());
    return this.http.put<void>(
      `${this.apiUrl}/${id}/cambiar-estado`,
      null,
      { params }
    );
  }

  //delete
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
