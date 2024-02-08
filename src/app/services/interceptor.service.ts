import { HTTP_INTERCEPTORS, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseService } from './response.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private http: ResponseService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = JSON.parse(this.http.getToken());
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    return next.handle(authReq).pipe(catchError(err=>{
      if ([401].includes(err.status)) {
        this.router.navigate(['/login']);
        this.http.sessionclear();
    }

    const error = (err && err.error && err.error.message) || err.statusText;
    console.error("intercept",err);
    return throwError(error);
    }))
    

  }

}
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
];
