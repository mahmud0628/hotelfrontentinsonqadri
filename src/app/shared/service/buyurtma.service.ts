import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Buyurtma } from 'src/app/shared/model/buyurtma';
@Injectable({
  providedIn: 'root'
})
export class BuyurtmaService {
api=environment.baseUrl + '/api/buyurtma';

  constructor(private http:HttpClient) { }

  getAll(page: any): Observable<any> {
    return this.http.get<any>(this.api, { params: page });
  }
  public create(buyurtmalar: Buyurtma): Observable<Buyurtma> {
    return this.http.post<Buyurtma>(this.api, buyurtmalar)
  }
  public update(buyurtmalar: Buyurtma): Observable<Buyurtma> {
    return this.http.put<Buyurtma>(this.api, buyurtmalar)
  }
  public deleteById(id:number): Observable<any> {
    return this.http.delete(this.api + '/' +id)
  }
}
