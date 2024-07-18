import { Component, OnInit } from '@angular/core';
import { ResponseService } from './services/response.service';
import { Router } from '@angular/router';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'Ynodev';
  authenticated = false;
  user: any;
  currentUser: any;
  constructor(private http: ResponseService, private router: Router,private tokenService:TokenService) {

  

  }

  ngOnInit(): void{

    this.isUser();
    /*if (this.tokenService.isTokenExpired()) {
      this.router.navigate(['/login']);
      this.http.sessionclear();
    
    } else {
  
    }*/

  }

  isUser() {
    return this.http.sessionget('username');
  }

    logOut() {
      this.http.sessionclear();
      this.router.navigate(['/login']);
      window.location.reload();
  }


}
