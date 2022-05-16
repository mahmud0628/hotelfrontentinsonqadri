import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, Observable, throwError } from "rxjs";
import { JwtUtil } from "../core/jwt.util";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    constructor(public jwtUtil: JwtUtil, private _snackBar: MatSnackBar){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.jwtUtil.getToken();
        let boshqaReq = req;
        if(token){
            boshqaReq= req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + token)
              });      
        }
                
        return next.handle(boshqaReq).pipe(
      catchError((error) => {
          let message = "Xatolik ro'y berdi!";
        if (error && error.error && error.error.message) {
          message = error.error.message;           
        }
        if(message == 'INVALID_CREDENTIALS'){
            message = "Login yoki parol xato"
        }
        console.log(message);
        
        this._snackBar.open(message, 'X', {
          duration: 4000,
          verticalPosition: 'bottom',
        });
        return throwError(error.message);
      }));;
    }

}