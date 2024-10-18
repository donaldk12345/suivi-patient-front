
import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import { ResponseService } from './response.service';
import { Router } from '@angular/router';
import { ApiUrlService } from './api-url.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isRo: any;
  val: any;
  code: any;
  constructor(private http:ResponseService,
    private router: Router,private api:ApiUrlService) {  
    }


  destroy(){


    this.http.postElement( this.api.API_URI + "auth/logout",null).subscribe({

    next: data => {
        
    },
    error: error => {

        console.log('There was an error!', error);
    }
    })

  }
  logout(){
     this.destroy();
     setInterval(() => {
      this.redirectLogout(); 

      }, 1000);
    
  }
  
  
  redirectLogout(){
    sessionStorage.clear();
    this.router.navigate(['/signin']);
  }

  redirectLogin(){
    setInterval(() => {
      this.redirectReset(); 
      //location.reload();
      }, 3000);
  }

  redirectReset(){
    this.router.navigate(['/signin']);
  }

  
  DecodeToken(token: string): string {
    return jwt_decode(token);
    }

  public isLoggedIn(): boolean {
    this.isRo =this.DecodeToken(this.http.sessionget('token'));
    if (this.isRo.role=="ADMIN") {
      return true;
    }
    return false;
  }

  public isManAdm():boolean{

    this.isRo =this.DecodeToken(this.http.sessionget('token'));
    if (this.isRo.role=="ADMIN" || this.isRo.role=='MANAGER') {
      return true;
    }
    return false;

  }

  isConnect():boolean{
    this.code = this.http.sessionget("verify");
     this.val = this.http.sessionget("token");
     if(this.val && this.code==null){
      return true;
     }else{
      return false;
     }
  }

  isVerifyCode():boolean{
    this.code = this.http.sessionget("verify");
    if(this.code==true){
     this.router.navigate(['/verify-code']); 
     return true;


    }else if(this.code==null && this.isConnect()==true){
         
      this.router.navigate(['/admin/dashboard']);
      return false;

    }else{

      this.router.navigate(['/signin'])
      return false;
    }
  }

  isVerifyGuard():boolean{
    this.code = this.http.sessionget("verify");
    if(this.code){
      return true;
    }else{
      return false;
    }
  }
  isConnectExpired(){
    this.code = this.http.sessionget("verify");

  }

  isRole(){
    const token = this.http.sessionget('token');
      
      const result = this.DecodeToken(token);
     return  result;
  }


}
