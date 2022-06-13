import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tulov } from '../model/tulov';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TulovService {
 api = environment.baseUrl + '/api/tulov';
  constructor(private http:HttpClient) { }
  getAll(page: any): Observable<any> {
    return this.http.get<any>(this.api, { params: page });
  }
  public create(tulovlar: Tulov): Observable<Tulov> {
    return this.http.post<Tulov>(this.api, tulovlar)
  }
  public update(tulovlar: Tulov): Observable<Tulov> {
    return this.http.put<Tulov>(this.api, tulovlar)
  }
  public deleteById(id:number): Observable<any> {
    return this.http.delete(this.api + '/' + id)
  }
}
