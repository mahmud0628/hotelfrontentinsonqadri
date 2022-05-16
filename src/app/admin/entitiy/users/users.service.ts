import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Types } from 'src/app/shared/model/types';
import { User } from 'src/app/shared/model/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
api = environment.baseUrl + '/api/account';
  constructor(public http:HttpClient) { }
  getAll():Observable<any> { 
    return this.http.get<any>(this.api+"/all");
  }
  getUser():Observable<any> { 
    return this.http.get<any>(this.api);
  }
  update(user: User): Observable<User> {
    return this.http.put<User>(this.api+"/edit", user);
  }
  deleteById(id: number): Observable<any> {
    return this.http.get(this.api + "/status/" + id);
  }
}
