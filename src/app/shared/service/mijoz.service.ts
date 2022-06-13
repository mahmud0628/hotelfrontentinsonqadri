import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mijoz } from 'src/app/shared/model/mijoz';

@Injectable({
  providedIn: 'root'
})
export class MijozService {
api=environment.baseUrl + '/api/mijoz'
  constructor(private http:HttpClient) { }

  getAll(page: any): Observable<any> {
    return this.http.get<any>(this.api, { params: page });
  }
  public create(mijozlar: Mijoz): Observable<Mijoz> {
    return this.http.post<Mijoz>(this.api, mijozlar)
  }
  public update(mijozlar: Mijoz): Observable<Mijoz> {
    return this.http.put<Mijoz>(this.api, mijozlar)
  }
  public deleteById(id:number): Observable<any> {
    return this.http.delete(this.api + '/' + id)
  }
}
