import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FilterService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AgentData } from 'src/app/models/agent-data.model';
import { AgentService } from 'src/app/services/dataimport/agent.service';
import { ResponseService } from 'src/app/services/response.service';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';
const API_URI= `${environment.BASE_URL}`
@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent  implements OnInit{
  agents: any[]=[];
  display: boolean = false;
  display1: boolean = false;
  displayImport:boolean = false;
  searchDialog:boolean = false;
  equipeset: boolean = false;
  selectElement: any;
  disabled:boolean = true;
  @ViewChild('dt') dt: Table | undefined;
  equipes: any[]=[];
  file!: File;
  fileDetails!: AgentData;
  fileUris: Array<string> = [];
   isRefresh:boolean=false
  searchForm: FormGroup = Object.create(null);
  addArgentForm: FormGroup = Object.create(null);
  loading: boolean = true;
  setAgentForm: FormGroup = Object.create(null);

  constructor(private http: ResponseService,private messageService: MessageService,private agentService:AgentService,private filterService: FilterService) {

  }

  ngOnInit(): void {
     this.getAgent();
     this.getEquipes();
    this.searchForm = new FormGroup({
      'keys': new FormControl('')
    });

    this.setAgentForm = new FormGroup({
      'equipeId': new FormControl('', [Validators.required])
    })

    this.addArgentForm = new FormGroup({
      'nom': new FormControl('', [Validators.required]),
      'code': new FormControl('', [Validators.required]),
      'equipeId': new FormControl('', [Validators.required])
    })
  }

  onRowSelect(dat : any) : void {
    console.log('Data : ', dat);
    this.selectElement = dat;
    this.selectDisable();
    this.agentContent();
   
  }


  getStatusSeverity(status:boolean) {
    switch (status) {
        case false:
            return 'danger';

        case  true :
            return 'success';
    }
}
  
  
  getData(dat : any) : void {
  
    console.log('Ma selection', dat);
  
  }
  showDialog(){

    this.display = true;

  }

  hideDialog(){

    this.display = false;
    this.equipeset = false;
    this.displayImport = false;
    this.searchForm.reset();
    this.searchDialog = false;
    this.addArgentForm.reset();
  
  }

  agentSearch(){
     this.searchDialog =  true;
  }
  showDialogSet(){
     this.equipeset = true;
  }
  agentImportDialog(){
   this.displayImport= true;
  }

  agentPreview(){

  }

  onUpload(event: any){
    this.file = event.target.files.item(0);
    console.log(event.target.files[0])

  }

 /* {
    headers: {
   
      'Content-Type': 'multipart/form-data',
      'X-Requested-With': 'XMLHttpRequest'
    }
  }*/

  uploadAgent(){

   /* const formParams: FormData = new FormData();
    formParams.append('file', this.fileForm.value.file);
    
    console.log("file", formParams);*/


    this.agentService.uploadAgentData(this.file).subscribe({

      next: data =>{
        this.fileDetails = data;
        console.log("file data",data);
  
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail:"Agent impoter avec succés",
          life: 3000
        });
        this.hideDialog();
        this.getAgent();
  
      },
      error: error => {
        console.log('error!', error.details);
  
        this.messageService.add({
          severity: 'error',
          summary: error,
          life: 3000
        });
    }
    })

  }

  getAgent(){

    return this.http.getElement(API_URI + url.agent_list).subscribe({
      next: data => {
        if (data) {
          console.log("Mes agents ", data);
          this.agents = data;
          this.isRefresh= false;
          this.loading = false;
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


  associerAgent(){

    let associerRequest= {
      equipeId: this.setAgentForm.value.equipeId,
      agentId: this.selectElement.data.id
    };
  
    this.http.postElement(API_URI + url.agent_setEquipe,associerRequest).subscribe({
  
      next: data =>{
  
        console.log("data",data);
  
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail:"Agent associer avec succés",
          life: 3000
        });
  
        this.getAgent();
        this.setAgentForm.reset();
        this.hideDialog();
        this.agentContent();
       
  
      },
      error: error => {
        console.log('error!', error.details);
  
        this.messageService.add({
          severity: 'error',
          summary: error,
          detail: error,
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
          this.loading = false;
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
  selectDisable():boolean{
         
    if(this.selectElement.data.id>=1){
      return this.disabled = !this.disabled;
    }
    else{
     return this.disabled = true;
    }
   
  }

  agentContent():boolean{

    if(this.selectElement.data.status==true){

      return this.disabled = true;
    }else{

      return false;
    }
  }

  agentSearchApi(){

    let parmasvalue = new HttpParams;

      parmasvalue =parmasvalue.append('keys', this.searchForm.get('keys')?.value);

     return this.http.getElementParams(API_URI + url.agent_filter, {params:parmasvalue}).subscribe({
      next: data => {
        if (data) {
          console.log("Mes agent search ", data);
          this.agents = data;
          this.hideDialog();
          this.isRefresh = true;
          this.loading = false;
  
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

   addAgent(){
    
    let addAgentRequest= {
      nom: this.addArgentForm.value.nom,
      code: this.addArgentForm.value.code,
      equipeId: this.addArgentForm.value.equipeId,
    };
  
    this.http.postElement(API_URI + url.agent_add,addAgentRequest).subscribe({
  
      next: data =>{
  
        console.log("data",data);
  
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail:"Agent ajouter avec succés",
          life: 3000
        });
  
        this.getAgent();
        this.setAgentForm.reset();
        this.hideDialog();
        this.addArgentForm.reset();
       
  
      },
      error: error => {
        console.log('error!', error.details);
  
        this.messageService.add({
          severity: 'error',
          summary: error,
          detail: error,
          life: 3000
        });
    }
    })
   }


 /* get file(){
    return this.fileForm.controls['file'];
  }*/

  get equipeId(){
    return this.setAgentForm.controls['equipeId'];
  }

  get nom(){
    return this.addArgentForm.controls['nom'];
  }
  get code(){
    return this.addArgentForm.controls['code'];
  }

  get myEquipeId(){
    return this.addArgentForm.controls['equipeId'];
  }
}
