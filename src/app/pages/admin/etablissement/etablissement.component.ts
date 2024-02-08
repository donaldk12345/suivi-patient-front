import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ResponseService } from 'src/app/services/response.service';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';
const API_URI= `${environment.BASE_URL}`
@Component({
  selector: 'app-etablissement',
  templateUrl: './etablissement.component.html',
  styleUrls: ['./etablissement.component.css']
})
export class EtablissementComponent implements OnInit{
  logo:any;
  image!: Blob;
  imageURL:SafeUrl | undefined
  constructor(private sanitizer: DomSanitizer,private h:HttpClient,private confirmationService: ConfirmationService, private http: ResponseService, private formBuilder: FormBuilder, private messageService: MessageService){

  }


  ngOnInit(): void {
    this.getLogo();
  }

  getLogo(){
    return this.h.get(API_URI + url.logo,{ responseType: 'blob' }).subscribe(data=>{


      this.logo = data;
      this.imageURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.logo))
      console.log("logo",this.imageURL);


     });

    }

}
