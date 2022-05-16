import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from 'src/app/core/account.service';
import { JwtUtil } from 'src/app/core/jwt.util';
import { User } from 'src/app/shared/model/user';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  api = environment.baseUrl+"/api/account";

  constructor(public jwtUtil: JwtUtil, public http: HttpClient, public accountService: AccountService) { }

  login(loginParol: any): Observable<any> {
    return this.http.post<any>(this.api+"/signin" , loginParol).pipe(
      map(success =>{
        this.jwtUtil.save(success.token, loginParol.rememberMe);
        this.accountService.identity(true);
        return true;
      })
    );
  }  

  register(user:User):Observable<any>{
    return this.http.post<any>(this.api+"/signup",user);
  }
  
  logout(): void {
    this.jwtUtil.clear();
    this.accountService.authenticate(null);
  }
}
