import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { DeleteDialogComponent } from 'src/app/shared/dialogs/delete-dialog/delete-dialog.component';
import { Xodim } from 'src/app/shared/model/xodim';

@Injectable({
  providedIn: 'root'
})
export class HodimService {

  api = environment.baseUrl + "/api/mahalla/hodim";
   
  constructor(private http: HttpClient) { }



  getAll(): Observable<any> {
    return this.http.get<any>(this.api);
  }

  public create(xodimlar: Xodim): Observable<Xodim> {
    return this.http.post<Xodim>(this.api, xodimlar);
  }
  public update(xodimlar: Xodim): Observable<Xodim> {
    return this.http.put<Xodim>(this.api, xodimlar);
  }
  public deleteById(id: number): Observable<any> {
    return this.http.delete(this.api + "/" + id);
  }
}
