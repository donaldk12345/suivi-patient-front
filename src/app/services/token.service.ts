import { HttpClient } from '@angular/common/http';
import {Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import jwt_decode from "jwt-decode";
import { ResponseService } from './response.service';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  user: any;

  constructor( private http: HttpClient,
    private route: Router,
    private messageService: MessageService,@Inject(PLATFORM_ID) private platformId: Object,private httpService: ResponseService) { }


  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem('jwt');
    window.sessionStorage.setItem('jwt', JSON.stringify(user));
  }



  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem('jwt');
    if (user) {
      return true;
    }

    return false;
  }

  DecodeToken(token: string): string {
    return jwt_decode(token);
    }


    isTokenExpired() {

      this.user= this.DecodeToken(JSON.stringify(this.httpService.sessionget('token')));

      const expiry = this.user.exp;

      console.log("expired",this.user.exp);
      return expiry * 1000 > Date.now();
    }


}


