import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ResponseService } from 'src/app/services/response.service';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';
const API_URI= `${environment.BASE_URL}`
@Component({
  selector: 'app-gestionequipe',
  templateUrl: './gestionequipe.component.html',
  styleUrls: ['./gestionequipe.component.css']
})
export class GestionequipeComponent  implements OnInit{

  display: boolean = false;
  display1: boolean = false;
  equipeDisplay: boolean = false;
  selectElement: any;
  disabled:boolean = true;
  equipes: any[]=[];
  equipeForm: FormGroup = Object.create(null);

  users: any[]=[]
  constructor(private http: ResponseService,private messageService: MessageService,private ht: HttpClient) {

  }
  ngOnInit(): void {

    this.getUsers();
    this.getEquipes();
    
    this.equipeForm = new FormGroup({
      'nom': new FormControl('',[Validators.required]),
      'userId': new FormControl('',[Validators.required]),
    });
  }


  showDialog() {
    this.display = true;
}

onRowSelect(dat : any) : void {
  console.log('Data : ', dat);
  this.selectElement = dat;
  this.selectDisable();
 
}

getData(dat : any) : void {

  console.log('Ma selection', dat);

}

hideDialog(){

  this.display = false;
  this.equipeDisplay = false;
  this.equipeForm.reset();

}
showEquipeDialog(){

  this.equipeDisplay = true;
}

getUsers(){
  this.http.getElement(API_URI + url.list_users).subscribe({
    next: data => {
      if (data) {
        console.log("Mes users ", data);
        this.users = data;

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

  downloadExcell(){
    const filename = "agents_data.xlsx"
  this.ht.get(API_URI + url.excel,{responseType: 'blob'}).subscribe(data=>{
    var a = document.createElement("a");
      a.href = URL.createObjectURL(data);
      a.setAttribute("download", filename);
      a.click();
    console.log("blob",data);
    
  })
    }

equipePreview(){
  this.equipeForm.patchValue({

    'nom' : this.selectElement.data.nomEquipe,
    'userId': this.selectElement.data.userId

  })
  this.showEquipeDialog();

}

createEquipe(){

  let addEquipeRequest= {
    nom :this.equipeForm.value.nom,
    userId: this.equipeForm.value.userId
  };

  this.http.postElement(API_URI + url.equipe_add,addEquipeRequest).subscribe({

    next: data =>{

      this.equipes = data;

      console.log("equipes",this.equipes);

      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail:"Equipe ajouter avec succés",
        life: 3000
      });

      this.getEquipes();
      this.equipeForm.reset();
      this.hideDialog();

    },
    error: error => {
      console.log('error!', error.details);

      this.messageService.add({
        severity: 'error',
        summary: 'Forbidden',
        detail: 'you are not authorized !',
        life: 3000
      });
  }
  })

}

getEquipes(){

  return this.http.getElement(API_URI + url.equipe_list).subscribe({
    next: data => {
      if (data) {
        console.log("Mes equipes ", data);
        this.equipes = data;

      } else {
        this.messageService.add({
          severity: 'error',
          summary: data.error,
          detail: data.message,
          life: 3000
        });
      }
    }
  })

}

updateEquipe(){

  let updateEquipeRequest= {
    nom :this.equipeForm.value.nom,
    userId: this.equipeForm.value.userId,
    createdAt: this.selectElement.data.createdAt,
    id: this.selectElement.data.id
  };

  this.http.putElement(API_URI + url.equipe_update,updateEquipeRequest).subscribe({

    next: data =>{

      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail:"Equipe modifier avec succés",
        life: 3000
      });

      this.getEquipes();
      this.equipeForm.reset();
      this.hideDialog();

    },
    error: error => {
      console.log('error!', error.details);

      this.messageService.add({
        severity: 'error',
        summary: error,
        detail:error,
        life: 3000
      });
  }
  })

}

get nom(){
  return this.equipeForm.controls['nom'];
}

get userId(){
  return this.equipeForm.controls['userId'];
}

selectDisable(){
         
  if(this.selectElement.data.id>=1){
    this.disabled = !this.disabled;
  }
  else{
    this.disabled = true;
  }
 
}
}
