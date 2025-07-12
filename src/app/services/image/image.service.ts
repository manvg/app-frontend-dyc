import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private base = "https://xa8hsg5wk6.execute-api.us-east-1.amazonaws.com/s3";

  constructor(private http: HttpClient) { }

  uploadImage(bucketName: string, key: string, file: File): Observable<string> {
    const url    = `${this.base}/${bucketName}/object`;
    const params = new HttpParams().set('key', key);
    const form   = new FormData();
    form.append('file', file, file.name);

    return this.http
      .post( url, form, {
        params,
        responseType: 'text'    // <<< EDIT: espera texto plano
      })
      .pipe(map(url => url));
  }
}