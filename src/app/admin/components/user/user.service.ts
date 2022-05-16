import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/model/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
api=environment.baseUrl+"/api/users"
  constructor(private http:HttpClient) { }
  getAll():Observable<any>{
    return this.http.get<any>(this.api+"/all");
  }


  public create(userlar: User): Observable<User> {
    return this.http.post<User>(this.api, userlar);
  }
  public update(userlar: User): Observable<User> {
    return this.http.put<User>(this.api, userlar);
  }
  public deleteById(id: number): Observable<any> {
    return this.http.delete(this.api + "/" + id);
  }
  
}
