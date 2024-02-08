import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ResponseService } from 'src/app/services/response.service';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';
const API_URI= `${environment.BASE_URL}`
@Component({
  selector: 'app-donneeagent',
  templateUrl: './donneeagent.component.html',
  styleUrls: ['./donneeagent.component.css']
})
export class DonneeagentComponent implements OnInit{
  donnees: any[]=[];
  selectElement: any;
  display: boolean = false;
  addDataAgentForm: FormGroup = Object.create(null);
  agents: any[]=[];
  equipes: any[]=[];
  myEquipeId: any;
  constructor(private http: ResponseService,private messageService: MessageService) {

  }
  donneesFrozen: boolean = false;

  ngOnInit(): void {
    this.getDonneesAgents();
    this.getAgent();
    this.getEquipes();

    this.addDataAgentForm = new FormGroup({
      'nom': new FormControl('LMT', [Validators.required]),
      'agentId': new FormControl('', [Validators.required]),
      'loginTime': new FormControl('', [Validators.required]),
      'readyTime': new FormControl('', [Validators.required]),
      'offlineTime': new FormControl('', [Validators.required]),
      'handleTine': new FormControl('', [Validators.required]),
      'holdTime': new FormControl('', [Validators.required]),
      'acwtime': new FormControl('', [Validators.required]),
      'offered': new FormControl('', [Validators.required]),
      'answered': new FormControl('', [Validators.required]),
      'aht': new FormControl('', [Validators.required]),
      'agentOccupancy': new FormControl('', [Validators.required])

    })
  }

  onRowSelect(dat : any) : void {
    console.log('Data : ', dat);
    this.selectElement = dat;
   
  }
  
  getData(dat : any) : void {
  
    console.log('Ma selection', dat);
  
  }


  showDialog(){

    this.display = true;

  }

  hideDialog(){

    this.display = false;
    this.addDataAgentForm.reset();
  
  }

  
  getAgent(){

    return this.http.getElement(API_URI + url.agent_list).subscribe({
      next: data => {
        if (data) {
          console.log("Mes agents ", data);
          this.agents = data;
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

  getDonneesAgents(){
    this.http.getElement(API_URI + url.donne_agent_list).subscribe({
      next: data => {
        if (data) {
          console.log("Mes donnees ", data);
          this.donnees = data;
  
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

    myEvent(event:any){

      console.log("event",event.value);

      return this.http.getElement(API_URI + url.agent_findOne + event.value).subscribe({

        next: data =>{

            this.myEquipeId = data.equipe.id;
            console.log("equipe id", this.myEquipeId);
        }
      })
    }

    addAgentData(){

      let addDataRequest= {
        nom: this.addDataAgentForm.value.nom,
        agentId: this.addDataAgentForm.value.agentId,
        Id: this.addDataAgentForm.value.agentId,
        equipeId: this.myEquipeId,
        loginTime: this.addDataAgentForm.value.loginTime,
        readyTime: this.addDataAgentForm.value.readyTime,
        offlineTime: this.addDataAgentForm.value.offlineTime,
        handleTine: this.addDataAgentForm.value.handleTine,
        holdTime: this.addDataAgentForm.value.holdTime,
        acwtime: this.addDataAgentForm.value.acwtime,
        offered: this.addDataAgentForm.value.offered,
        answered: this.addDataAgentForm.value.answered,
        aht: this.addDataAgentForm.value.aht,
        agentOccupancy: this.addDataAgentForm.value.agentOccupancy,
      };


      this.http.postElement(API_URI + url.donnee_agent_add,addDataRequest).subscribe({
  
        next: data =>{
    
          console.log("data",data);
    
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail:"données agent ajouter avec succés",
            life: 3000
          });
    
          this.getAgent();
          this.addDataAgentForm.reset();
          this.hideDialog();
          this.getDonneesAgents();
         
    
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

    get nom(){
      return this.addDataAgentForm.controls['nom'];
    }
    get agentId(){
      return this.addDataAgentForm.controls['agentId'];
    }
    get loginTime(){
      return this.addDataAgentForm.controls['loginTime'];
    }
    get readyTime(){
      return this.addDataAgentForm.controls['readyTime'];
    }
    get offlineTime(){
      return this.addDataAgentForm.controls['offlineTime'];
    }
    get handleTine(){
      return this.addDataAgentForm.controls['handleTine'];
    }

    get holdTime(){
      return this.addDataAgentForm.controls['holdTime'];
    }
    get acwtime(){
      return this.addDataAgentForm.controls['acwtime'];
    }
    get offered(){
      return this.addDataAgentForm.controls['offered'];
    }
    get answered(){
      return this.addDataAgentForm.controls['answered'];
    }
    get aht(){
      return this.addDataAgentForm.controls['aht'];
    }
    get agentOccupancy(){
      return this.addDataAgentForm.controls['agentOccupancy'];
    }


}
