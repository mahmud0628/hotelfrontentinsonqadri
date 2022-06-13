import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Xodim } from '../model/xodim';

@Injectable({
  providedIn: 'root'
})
export class XodimService {
 api=environment.baseUrl + '/api/xodim';
 
  constructor(private http: HttpClient) { }
  
  getAll(page: any): Observable<any> {
    return this.http.get<any>(this.api, { params: page });
  }
  public create(xodimlar: Xodim): Observable<Xodim> {
    return this.http.post<Xodim>(this.api, xodimlar)
  }
  public update(xodimlar: Xodim): Observable<Xodim> {
    return this.http.put<Xodim>(this.api, xodimlar)
  }
  public deleteById(id:number): Observable<any> {
    return this.http.delete(this.api + '/' + id)
  }

}
