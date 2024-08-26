import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { ApiUrlService } from 'src/app/services/api-url.service';
import { ResponseService } from 'src/app/services/response.service';

@Component({
  selector: 'app-etablissements',
  templateUrl: './etablissements.component.html',
  styleUrls: ['./etablissements.component.css']
})
export class EtablissementsComponent  implements OnInit{



  al: any;

  charge: Observable<any> = new Observable<any>();
  logo:any;
  addEtablissementForm: FormGroup = Object.create(null);
  entreprise: any;
  users: any[]=[];
  display: boolean = false;
  selectElement: any;
  maSelection: any[] = [];
  cols: any[] = [];
  modifierbtn: boolean =false;
  activatebtn: boolean = false;
  addPatientForm : FormGroup = Object.create(null);
  unactivatebtn: boolean = false;
  detailbtn: boolean = false;
  displayBasic: boolean = false;
  updatebtn: boolean = false;
  deletebtn: boolean = false;
  exportColumns: any[] = [];
  patient : any[]=[];
  loading = true;
   sexes: any[]=[];
   addUpdateForm: boolean=false;
  etablissement: any[]=[];
  updateDisplay: boolean = false;
  boolvalue: any []=[];
  constructor(private api:ApiUrlService,private h:HttpClient,private confirmationService: ConfirmationService, private http: ResponseService, private formBuilder: FormBuilder, private messageService: MessageService){

  }


  ngOnInit(): void {
    //this.getLogo();
    this.getEtablissement();
    

    this.addEtablissementForm = new FormGroup({
      'nomEtablissement': new FormControl(''),
      'numero': new FormControl(''),
      'email': new FormControl(''),
      'responsable': new FormControl(''),
      'statut':new FormControl(''),
      'ville': new FormControl(''),
      'date': new FormControl(''),
      'description': new FormControl(''),
    });

    this.cols = [
      {field: 'nomEtablissement', header: 'Etablissement', type: 'string', width: 270, isFroz: true},
      {field: 'responsable', header: 'Responsable', type: 'string', width: 270, isFroz: false},
       { field: 'email', header: 'Email', type: 'string', width: 270, isFroz: false },
       { field: 'ville', header: 'Ville', type: 'string', width: 270, isFroz: false },
       { field: 'numero', header: 'Téléphone', type: 'string', width: 270, isFroz: false },
        { field: 'statut', header: 'Status', type: 'boolean', width: 270, isFroz: false },
        {field: 'date', header: 'Créer le', type: 'jour', width: 270, isFroz: false},




    ];
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }


  onRowSelect(dat: any): void {

    console.log('Data : ', dat);
  
  
  this.selectElement = dat;
  this.maSelection = dat;
  console.log('mes elements selectionner', this.maSelection);
  this.manageActivateBtn();
  this.manageUnactivateBtn();
  this.manageDeleteBtn();
    this.manageUpdateBtn();
  
  
  }

  onRowUnselect(dat: any) {

  }
  getData(dat : any) : void {
  
  
  
  }
  showDialog() {
    this.display = true;
    this.getbolValue();
  }
  
  updateDialog() {
    this.addUpdateForm = true;

  }
  hideDialog(){
  
    this.display = false;
    this.addEtablissementForm.reset();
    this.addUpdateForm = false;
  
  }


  chargement(charge: Observable<any>): void {
    charge.subscribe(
      {
        next: (success) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Opérations succéss'
          })
          this.getEtablissement();

        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: error.error.message,
            detail: error.error.details,
          });

        },
        complete: () => {

        }
      }
    );
   }


        manageActivateBtn(){
          if(this.selectElement.length == 0 || this.selectElement.length > 1 ){
            this.activatebtn = false;
          } else{
            this.activatebtn = true;
          }
        }


        manageUnactivateBtn(){
          if(this.selectElement.length == 0 || this.selectElement.length > 1  ){
            this.unactivatebtn = false;
          } else {
            this.unactivatebtn =true;
          }
        }

      manageDeleteBtn(){
        if(this.selectElement.length == 0 || this.selectElement.length > 1){
          this.deletebtn = false
        } else {
          this.deletebtn =true;
        }
      }

       manageUpdateBtn(){
        if(this.selectElement.length == 0 || this.selectElement.length > 1){
          this.updatebtn = false;
        } else {
          this.updatebtn = true;
        }
       }

    manageDetailsBtn() {
           if(this.selectElement.length == 0 || this.selectElement.length > 1){
          this.detailbtn = false;
        } else {
          this.detailbtn = true;
        }

    }

    getEtablissement(){
      this.http.getElement(this.api.API_URI + "etablissement/list").subscribe({
        next: data => {
          if (data) {
            console.log("Mes établissement ", data.content);
            this.etablissement = data.content;
            this.loading = false;

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


      
      getbolValue(){
    
        this.boolvalue = [
          { val: 'OUI', 'ids': true },
          { val :  'NON', 'ids':false}
         ]
      }

    
      addEtablissement(){


        let addRequest= {
          nomEtablissement :this.addEtablissementForm.value.nomEtablissement,
          numero: this.addEtablissementForm.value.numero,
          email :this.addEtablissementForm.value.email,
          responsable :this.addEtablissementForm.value.responsable,
          ville: this.addEtablissementForm.value.ville,
          date: this.addEtablissementForm.value.date,
          description: this.addEtablissementForm.value.description,
          statut: this.addEtablissementForm.value.statut
        };
  
  
      
    
        this.http.postElement(this.api.API_URI + "etablissement/add",addRequest).subscribe({
    
          next: data =>{
    
            this.messageService.add({
              severity: 'success',
              summary: 'success',
              detail:"établissement ajouter avec succés",
              life: 3000
            });
   
            this.getEtablissement();
            this.addEtablissementForm.reset();
            this.hideDialog();
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
  
      updatetablissement() {
        let updateRequest= {
          nomEtablissement :this.selectElement[0].nomEtablissement,
          numero: this.addEtablissementForm.value.numero,
          email :this.addEtablissementForm.value.email,
          responsable :this.addEtablissementForm.value.responsable,
          ville: this.addEtablissementForm.value.ville,
          date: this.addEtablissementForm.value.date,
          description: this.addEtablissementForm.value.description,
          statutEntreprise: this.addEtablissementForm.value.statutEntreprise,
          etablissementId: this.selectElement[0].id,
        };
  
        this.http.putElement(this.api.API_URI + "etablissement/update",updateRequest).subscribe({
    
          next: data =>{
    
            this.messageService.add({
              severity: 'success',
              summary: 'success',
              detail:"Etablissement modifier avec succés",
              life: 3000
            });
            this.hideDialog();
   
            this.getEtablissement();
            this.addEtablissementForm.reset();
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
  
      confirmDelete() {
        throw new Error('Method not implemented.');
        }
        updateEtablissementView() {

        
          let dt = formatDate(this.selectElement[0]?.date, 'yyyy-MM-dd','en_US');
  
          this.addEtablissementForm.patchValue({
      
            'responsable' : this.selectElement[0].responsable,
            'nomEtablissement' : this.selectElement[0].nomEtablissement,
            'numero' : this.selectElement[0].numero,
            'statut': this.selectElement[0].statut,
            'ville': this.selectElement[0].ville,
            'pays': this.selectElement[0].pays,
            'description': this.selectElement[0].description,
            'email': this.selectElement[0].email,
            'date':dt
      
          })
          this.addEtablissementForm.get('nomEtablissement')?.disable();
          this.addUpdateForm = true;
          this.getbolValue();
        }

  


    get nomEtablissement(){
        return this.addEtablissementForm.controls['nomEtablissement'];
      }
       get numero(){
        return this.addEtablissementForm.controls['numero'];
     }
     get email(){
      return this.addEtablissementForm.controls['email'];
     } 
      
     get responsable(){
      return this.addEtablissementForm.controls['responsable'];
    }
    get ville(){
    return this.addEtablissementForm.controls['ville'];
    }
    
    get date(){
      return this.addEtablissementForm.controls['date'];
    }
    
    get statut(){
    return this.addEtablissementForm.controls['statut'];
    }
    get description(){
      return this.addEtablissementForm.controls['description'];
      }

}
