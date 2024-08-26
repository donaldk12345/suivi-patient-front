import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiUrlService } from 'src/app/services/api-url.service';
import { ResponseService } from 'src/app/services/response.service';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';
@Component({
  selector: 'app-etablissement',
  templateUrl: './etablissement.component.html',
  styleUrls: ['./etablissement.component.css']
})
export class EtablissementComponent implements OnInit{
val: any;

  logo:any;
  image!: Blob;
  imageURL:SafeUrl | undefined;
  updateEntrepriseForm: FormGroup = Object.create(null);
  entreprise: any;
  constructor(private api:ApiUrlService,private sanitizer: DomSanitizer,private h:HttpClient,private confirmationService: ConfirmationService, private http: ResponseService, private formBuilder: FormBuilder, private messageService: MessageService){

  }


  ngOnInit(): void {
    //this.getLogo();
    this.getEtablissement();
    this.val="Fonctionnelle";
      
    this.updateEntrepriseForm = new FormGroup({
      'nomEtablissement': new FormControl(''),
      'numero': new FormControl(''),
      'email': new FormControl(''),
      'responsable': new FormControl(''),
      'statut':new FormControl(''),
      'ville': new FormControl('')
    });
  }

  getEtablissement(){
    this.http.getElement(this.api.API_URI + "etablissement").subscribe({
      next: data => {
        if (data) {
       
          this.entreprise= data;
   

       
        
             this.updateEntrepriseForm.get('nomEtablissement')?.setValue(data?.nomEtablissement);
             this.updateEntrepriseForm.get('numero')?.setValue(data?.numero);
             this.updateEntrepriseForm.get('email')?.setValue(data?.email);
             this.updateEntrepriseForm.get('responsable')?.setValue(data?.responsable);
             this.updateEntrepriseForm.get('nomEtablissement')?.disable();
             this.updateEntrepriseForm.get('ville')?.setValue(data?.ville);
             this.updateEntrepriseForm.get('statut')?.disable();
          

        } else {
          
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

    updateEtabli() {
    
       
    let updateRequest= {
      nomEtablissement :this.updateEntrepriseForm.value.nomEtablissement,
      numero: this.updateEntrepriseForm.value.numero,
      email :this.updateEntrepriseForm.value.email,
      responsable :this.updateEntrepriseForm.value.responsable,
      ville: this.updateEntrepriseForm.value.ville
    };

    this.http.putElement(this.api.API_URI + "etablissement/update",updateRequest).subscribe({

      next: data =>{

        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail:"Informations modifier avec succés",
          life: 3000
        });


        this.getEtablissement();
        this.updateEntrepriseForm.reset();
      },
      error: error => {
        console.log('error!', error);

        this.messageService.add({
          severity: 'error',
          summary: error,
          detail: error.message,
          life: 3000
        });
    }
    })


      }

}
