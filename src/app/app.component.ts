import { Component, OnInit } from '@angular/core';
import { ResponseService } from './services/response.service';
import { Router } from '@angular/router';
import { TokenService } from './services/token.service';
import { ApiUrlService } from './services/api-url.service';

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
  constructor(private http: ResponseService, private router: Router,private tokenService:TokenService,private api:ApiUrlService) {

  

  }

  ngOnInit(): void{

    console.log("Hello world !");

    this.isUser();
    /*if (this.tokenService.isTokenExpired()) {
      this.router.navigate(['/login']);
      this.http.sessionclear();
    
    } else {
  
    }*/

    setTimeout(()=>{
      if(this.http.sessionget('username')!=null){
        this.http.getElement(this.api.API_URI + "rendezvous/notif").subscribe({
          next: data => {
             console.log("job...")
          }
        })
      }
    },1000);

  

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
