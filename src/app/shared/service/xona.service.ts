import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { Xona } from '../model/xona';

@Injectable({
  providedIn: 'root'
})

export class XonaService {
 api=environment.baseUrl + "/api/xona";
  constructor(private http:HttpClient,private dialog:MatDialog) { }

  openConfirmDialog(msg : any){
    return this.dialog.open(
      DeleteDialogComponent,{
        width: "350px",
        height: "200px",
        data : {
          massage : msg
        }
      });
  }

  getAll(page: any): Observable<any> {
    return this.http.get<any>(this.api, { params: page });
  }
  public create(xonalar: Xona): Observable<Xona> {
    return this.http.post<Xona>(this.api, xonalar)
  }
  public update(xonalar: Xona): Observable<Xona> {
    return this.http.put<Xona>(this.api, xonalar)
  }
  public deleteById(id: number): Observable<any> {
    return this.http.delete(this.api + "/" + id)
  }
 


}
