import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiUrlService } from 'src/app/services/api-url.service';
import { ResponseService } from 'src/app/services/response.service';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  user: any;
  username: String = '';
  currentUser: any;
  logo:any;
  image!: Blob;
  imageURL:SafeUrl | undefined

  constructor(private api:ApiUrlService,private sanitizer: DomSanitizer,private h:HttpClient,private confirmationService: ConfirmationService, private http: ResponseService, private formBuilder: FormBuilder, private messageService: MessageService,private router:Router){

  }

  ngOnInit(): void{

    this.isUser();
    this.me();
    this.getLogo();
    //console.log('user', this.user);

  }

  isUser() {
    return this.http.sessionget('username');
  }

    logOut() {
      this.http.sessionclear();
      this.router.navigate(['/login']);

  }

  me(){
    this.http.getElement(this.api.API_URI + url.me).subscribe({
      next: data => {
        if (data) {

          this.user= data;
          console.log("me ", this.username);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Reésultat',
            detail: data.message,
            life: 3000
          });
        }
      }
    })
  }

  getLogo(){
    return this.h.get(this.api.API_URI + url.logo,{ responseType: 'blob' }).subscribe(data=>{


      this.logo = data;
      this.imageURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.logo))
      console.log("logo",this.imageURL);


     });

    }


}
