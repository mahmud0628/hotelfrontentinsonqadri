import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageDownloadService {
  api = environment.baseUrl + '/api/file';
  constructor(public http: HttpClient) { }
  getById(falyId: number): Observable<any> {
    return this.http.get<any>(this.api + "/" + falyId)
  }
  getAll(sort: any): Observable<any> {
    return this.http.get<any>(this.api, { params: { 'sort': sort } });
  }
  download(fileName: string | undefined): Observable<Blob> {
    return  this.http.get(this.api +fileName,  { responseType: 'blob' });
  }

}
