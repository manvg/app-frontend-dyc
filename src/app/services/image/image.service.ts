import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
//import { environment } from '../../../environments/environment';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private urlBase = environment.imagenes.api;
  constructor(private http: HttpClient) { }

  uploadImage(key: string, file: File): Observable<string> {
    const url = `${this.urlBase}${environment.imagenes.endpoints.crear}`;
    const encodedKey = encodeURIComponent(key);
    const params = new HttpParams().set('key', encodedKey);

    const form = new FormData();
    form.append('file', file, file.name);

    return this.http.post(url, form, { params, responseType: 'text' }).pipe(map(url => url));
  }

}
