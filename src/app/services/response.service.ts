import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject,Injectable, PLATFORM_ID } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';
@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor(private http: HttpClient,@Inject(PLATFORM_ID) private platformId: Object) {

   }

   postElement(url: string, data: any): Observable<any> {
   return this.http.post(url, data);
  }


  postMultipartForm(url: string, data:any, headers:any): Observable<any>{

    return this.http.post(url,data,headers)
  }
  deleteElement(url: string): Observable<any> {
    return this.http.delete(url);
  }
  putElement(url: string,data:any): Observable<any>{

    return this.http.put(url,data);

  }

    getElement(url: string): Observable<any> {

   return this.http.get(url);
  }

    getElementParams(url:string,params:any): Observable<any>{

      return this.http.get(url,params);
    }

    sessionsetJson(variable: string, valeur: any): void {
    let js: string;
    js = JSON.stringify(valeur);
    sessionStorage.setItem(variable, js);
  }


  sessionclear(): void {
    sessionStorage.clear();
  }

  sessionget(variable: string): String | any {
    if(isPlatformBrowser(this.platformId)){
    return sessionStorage.getItem(variable);
    }

    return;

  }
    sessionremove(variable: string): void {
    sessionStorage['remove'](variable);
  }



  sessionset(variable: string, valeur: string): void {
    if(isPlatformBrowser(this.platformId)){
      sessionStorage.setItem(variable, valeur);
    }
  }

  getToken(): String |any{
    return this.sessionget('token');
  }

  getUserName(): String |any{
    return this.sessionget('username');
  }


  getUser(): any {
    return this.sessionget('user');
  }

}


