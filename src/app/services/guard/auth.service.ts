import { Injectable, OnInit } from '@angular/core';
import { ResponseService } from '../response.service';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  constructor(private http: ResponseService,private tokenService: TokenService) { }
  role: any;
  user:any;
  ngOnInit(): void{
   


  }

  isLogin(){

    return this.http.sessionget('token');
      
  }

  isRole(){
    this.user= this.tokenService.DecodeToken(JSON.stringify(this.http.sessionget('token')));
    this.role= this.user.role[0]
    console.log("hi",this.role);
    return this.role;
  }


}
