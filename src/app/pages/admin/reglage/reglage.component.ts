import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiUrlService } from 'src/app/services/api-url.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ResponseService } from 'src/app/services/response.service';

@Component({
  selector: 'app-reglage',
  templateUrl: './reglage.component.html',
  styleUrls: ['./reglage.component.css']
})
export class ReglageComponent implements OnInit{
loading: boolean=false;
verify:boolean | undefined;

  constructor(private auth:AuthenticationService,private api:ApiUrlService,private h:HttpClient,private confirmationService: ConfirmationService, private http: ResponseService, private formBuilder: FormBuilder, private messageService: MessageService,private router:Router){
    this.verify = this.auth.isLoggedIn();
  }

  ngOnInit(): void{

    //this.getLogo();
    //console.log('user', this.user);

  }

  downloadLogZip(){

    this.loading= true;

    this.h.get(this.api.API_URI + "dashboard/log",{ responseType: "blob" }).subscribe({
  
      next: data => {
        this.loading=false;
        if (data) {
          console.log(" data ", data);
          var result = "patient-management-log"; 
          let d = new Date();
          var date = d.getDate();
          var month = d.getMonth(); //Be careful! January is 0 not 1
          var year = d.getFullYear();
          var HMS = d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds();
          var dateString = date + "-" +(month + 1) + "-" + year;
          const filename =  result + "-" + dateString + "_"+ HMS + ".zip";
          var a = document.createElement("a");
          a.href = URL.createObjectURL(data);
               a.setAttribute("download", filename);
          a.click(); 
           
  
        }
    
      }
  
    })
  
  }

  
  confirmDownload() {



      this.confirmationService.confirm({
        message: 'Voulez vous télécharger les logs ?',
        icon: 'pi pi-info-circle',
        acceptLabel: 'Oui',
        rejectLabel: 'Nom',
        acceptButtonStyleClass: "p-button-info",
        rejectButtonStyleClass: "p-button-danger",
        accept: () => {
          this.downloadLogZip()
        }
      });

    
  }


}
