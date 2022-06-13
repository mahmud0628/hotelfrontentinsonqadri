import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bino } from '../model/bino';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class BinoService {
  api=environment.baseUrl + '/api/bino';

  constructor(private http:HttpClient) { }

  getAll(page: any): Observable<any> {
    return this.http.get<any>(this.api, { params: page });
  }
  public create(binolar: Bino): Observable<Bino> {
    return this.http.post<Bino>(this.api, binolar)
  }
  public update(binolar: Bino): Observable<Bino> {
    return this.http.put<Bino>(this.api, binolar)
  }
  public deleteById(id:number): Observable<any> {
    return this.http.delete(this.api + '/' +id)
  }

}


