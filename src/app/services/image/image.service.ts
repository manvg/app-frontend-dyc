import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private base = environment.imagenes.api;

  constructor(private http: HttpClient) { }

  uploadImage(bucketName: string, key: string, file: File): Observable<string> {
    const url    = `${this.base}/${bucketName}/object`;
    const params = new HttpParams().set('key', key);
    const form   = new FormData();
    form.append('file', file, file.name);

    return this.http
      .post(url, form, {
        params,
        responseType: 'text'
      })
      .pipe(map(url => url));
  }
}
