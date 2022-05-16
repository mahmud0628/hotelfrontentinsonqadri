import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable, ReplaySubject } from 'rxjs';
import { User } from '../shared/model/user';
import { environment } from 'src/environments/environment';
import { JwtUtil } from './jwt.util';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userIdentity: User | null = null;
  private authenticationState = new ReplaySubject<User | null>(1);
  private userCache$?: Observable<User | null>;
  private baseApi = environment.baseUrl + "/api/account";
  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtUtil: JwtUtil
  ) { }


  save(user: User): Observable<{}> {
    return this.http.put(this.baseApi+"/update", user);
  }


  savePassword(user: User): Observable<{}> {
    return this.http.put(this.baseApi + "/password", user);
  }

 




  authenticate(identity: User | null): void {
    this.userIdentity = identity;
    this.authenticationState.next(this.userIdentity);
  }

  hasAnyAuthority(lavozimlar: string[] | string): boolean {
    let roles;
    if (!this.userIdentity) {
       roles = this.jwtUtil.getRoles();
      if(!roles  || Array.isArray(roles) && !roles[0])
        return false;
    } else {
      roles = this.userIdentity.roles;
    }
    console.log(roles);
    
    if (!Array.isArray(lavozimlar)) {
      lavozimlar = [lavozimlar];
    }
    if(!roles) return false; 
    return roles.some((lavozim: string) => lavozimlar.includes(lavozim));
  }

  identity(force?: boolean): Observable<User | null> {
  

    if (!this.userCache$ || force || !this.isAuthenticated()) {
     
      this.userCache$ = this.fetch();
      this.userCache$.subscribe((res) => {
          this.authenticate(res);
          return res;        
      });

    }
    return this.userCache$;
  }

  isAuthenticated(): boolean {
    return this.userIdentity !== null;
  }

  getAuthenticationState(): Observable<User | null> {
    return this.authenticationState.asObservable();
  }
  // getImageUrl(): string {
  //   return this.userIdentity?.imageUrl ?? '';
  // }
  private fetch(): Observable<User> {
    return this.http.get<User>(this.baseApi);
  }

}
