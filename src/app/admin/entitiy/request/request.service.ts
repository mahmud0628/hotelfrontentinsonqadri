import { HttpClient } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from 'src/app/shared/model/request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  api = environment.baseUrl + '/api/viloyat';
  constructor(public http:HttpClient) { }
  getAll(pageable:any):Observable<Request[]> { 
    return this.http.get<Request[]>(this.api, {params:pageable});
  }
  getAllTuman(pageable:any,id:number):Observable<Request[]> { 
    return this.http.get<Request[]>(this.api+"/request/tuman"+id,{params:pageable});
  }
  //pageable:any  cut off maybe don't work
  getOne(id:number):Observable<Request[]> { 
    return this.http.get<Request[]>(this.api+"/request"+id);
  }
  create(user: Request): Observable<Request> {
    return this.http.post<Request>(this.api, user);
  }
  update(user: Request): Observable<Request> {
    return this.http.put<Request>(this.api, user);
  }
  deleteById(id: number):Observable<any> {
    return this.http.get(this.api + "/status/" + id);
  }}