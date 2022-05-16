import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Subjects } from 'src/app/shared/model/subjects';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
 api = environment.baseUrl + "/api/mahalla/subject";
  constructor(public http:HttpClient) { }
  getAll():Observable<Subjects[]> { 
    return this.http.get<Subjects[]>(this.api);
  }
  create(subyekt: Subjects): Observable<Subjects>  {
    return this.http.post<Subjects>(this.api, subyekt);
  }
  update(user: Subjects): Observable<Subjects> {
    return this.http.put<Subjects>(this.api, user);
  }
  deleteById(id: number):Observable<any> {
    return this.http.get(this.api + id);
  }
  getOne(id:number):Observable<Subjects>{
  return this.http.get<Subjects>(this.api+id);    
}
}