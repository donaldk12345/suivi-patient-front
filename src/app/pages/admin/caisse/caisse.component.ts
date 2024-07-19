import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { ApiUrlService } from 'src/app/services/api-url.service';
import { ResponseService } from 'src/app/services/response.service';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';
@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.css']
})
export class CaisseComponent implements OnInit{


  element: any;
  rendesvous: any[]=[];
  raisons: any[]=[];
  caisses: any[]=[];

userPreview() {
throw new Error('Method not implemented.');
}

  charge: Observable<any> = new Observable<any>();
  users: any[]=[];
  display: boolean = false;
  displayUpdate: boolean = false;
  calendarDialog: boolean = false;
  selectElement: any;
  maSelection: any[] = [];
  cols: any[] = [];
  modifierbtn: boolean =false;
  activatebtn: boolean = false;
  addShedulerForm : FormGroup = Object.create(null);
  addCaisseForm : FormGroup = Object.create(null);
  updateCaisseForm : FormGroup = Object.create(null);
  unactivatebtn: boolean = false;
  detailbtn: boolean = false;
  raiosn = new FormControl('', [Validators.required]);
  prix = new FormControl('', [Validators.required]);
  dateRasion = new FormControl('',[Validators.required]);
  displayBasic: boolean = false;
  updatebtn: boolean = false;
  deletebtn: boolean = false;
  exportColumns: any[] = [];
  patient : any[]=[];
  loading = true;
   sexes: any[]=[];
   datp:any;
   mont:any;
  boolvalue: any=[]=[];
  onRowSelect(dat: any): void {
 
   console.log('Data : ', dat);
 
 
 this.selectElement = dat;
 this.maSelection = dat;
 console.log('mes elements selectionner', this.maSelection);
 this.manageActivateBtn();
 this.manageUnactivateBtn();
 this.manageDeleteBtn();
   this.manageUpdateBtn();
   this.manageDetailsBtn();
 
 
 }
 
 constructor(private api:ApiUrlService,private confirmationService: ConfirmationService, private http: ResponseService, private formBuilder: FormBuilder, private messageService: MessageService){
 
 }
 onRowUnselect(dat: any) {
 
 }
 getData(dat : any) : void {
 
 
 
 }
 showDialog() {
   this.display = true;
   this.getPatient();
 }
 
 updateDialog() {

  this.displayUpdate = true;

 }
 hideDialog(){
 
   this.display = false;
   this.addCaisseForm.reset();
   this.calendarDialog = false;
   this.displayUpdate = false;

 
 }
 handleClick(elt:any){

  //console.log("element",elt);
 }
 

 
   ngOnInit(): void {
 
     this.addCaisseForm = new FormGroup({
       'titre':  new FormControl(''),
       'patientId': new FormControl(''),
       'raisons': new FormControl([this.raisons]),


     });

     this.updateCaisseForm = new FormGroup({
      'montant':  new FormControl(''),
      'reste':  new FormControl('0'),
      'mode':  new FormControl(''),
      'date':  new FormControl(''),
      'numero': new FormControl('')



    });
 
     this.cols = [
       {field: 'titre', header: 'Titre facture', type: 'string', width: 200, isFroz: true},
       {field: 'nomPatient', header: 'Nom', type: 'string', width: 200, isFroz: false},
       {field: 'prenom', header: 'Prénom', type: 'string', width: 200, isFroz: false},
        { field: 'numeroFacture', header: 'N°', type: 'string', width: 200, isFroz: false },
       { field: 'montantVerse', header: 'Montant', type: 'string', width: 200, isFroz: false },
       { field: 'total', header: 'Total', type: 'string', width: 200, isFroz: false },
       { field: 'isPaid', header: 'Est Payé', type: 'boolean', width: 200, isFroz: false },
        { field: 'mode', header: 'Mode', type: 'string', width: 200, isFroz: false },
        { field: 'reste', header: 'Reste', type: 'string', width: 200, isFroz: false },
        {field: 'dateReste', header: 'Date reste', type: 'date', width: 200, isFroz: false},
        {field: 'nomEtablissement', header: 'Etablissement', type: 'string', width: 200, isFroz: false},
         { field: 'username', header: 'Ajouter par', type: 'string', width: 200, isFroz: false },
         {field: 'date', header: 'Crée le ', type: 'date', width: 200, isFroz: false},
 
 
 
 
     ];
     this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
    
      this.getbolValue();
      this.getCaisse();
      this.sexPatient();
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
           this.getCaisse();
 
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
 
 
         /**
      * Gérer le bouton Activer
      */
         manageActivateBtn(){
           if(this.selectElement.length == 0 || this.selectElement.length > 1 ){
             this.activatebtn = false;
           } else{
             this.activatebtn = true;
           }
         }
 
           /**
          * Gérer le bouton Désactiver
          */
         manageUnactivateBtn(){
           if(this.selectElement.length == 0 || this.selectElement.length > 1  ){
             this.unactivatebtn = false;
           } else {
             this.unactivatebtn =true;
           }
         }
 
 
      /**
        * Gérer le bouton Supprimer
        */
       manageDeleteBtn(){
         if(this.selectElement.length == 0 || this.selectElement.length > 1){
           this.deletebtn = false
         } else {
           this.deletebtn =true;
         }
       }
 
       /**
        * Gérer le bouton Modifier
        */
        manageUpdateBtn(){
         if(this.selectElement.length == 0 || this.selectElement.length > 1){
           this.updatebtn = false;
         }else if(this.selectElement.length > 0  && this.selectElement[0].isPaid==true){
          this.updatebtn = false;
         }
         
         
         else {
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

     getPatient(){
      this.http.getElement(this.api.API_URI + url.patient).subscribe({
        next: data => {
          if (data) {
            console.log("Mes patient ", data.content);
            this.patient = data.content;
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
        { val: 'ESPECE', 'ids': 1 },
        { val :  'OM', 'ids':2}
       ]
    }

    onSearchChange(event:any){
      if(this.updateCaisseForm.get('reste')?.value > 0){
        
      }

     // console.log('event input:', event.target.value);
    }

    getReste():boolean{

      if(this.updateCaisseForm.get('reste')?.value > 0){

        this.mont = this.selectElement[0]?.reste; 

      this.datp = this.selectElement[0].total - this.selectElement[0]?.montantVerse - this.updateCaisseForm.get('montant')?.value;

      //this.updateCaisseForm.get('reste')?.setValue(dat);

        return true;
      }else{
        return false;
      }

    }
 
     getCaisse(){
       this.http.getElement(this.api.API_URI + url.caisseList).subscribe({
         next: data => {
           if (data) {
             console.log("Mes data ", data.content);
             this.caisses = data.content;
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

       onChange(event: any) {
        console.log('event :' + event.value);
        this.element = event.value;
         
        }

        showCandar(){
          this.calendarDialog = true;
        }

        getRandomColor() {
          var color = Math.floor(0x1000000 * Math.random()).toString(16);
          return '#' + ('000000' + color).slice(-6);
        }


        addRaisson(raiosn: any, prix: any, dateRasion:any) {
          const raisonData: any = {};
          raisonData.raiosn= raiosn.value;
          raisonData.prix = prix.value;
          raisonData.dateRasion = dateRasion.value;
          console.log(raisonData);
          this.raisons.push(raisonData);
          this.raiosn.reset();
          this.prix.reset();
          this.dateRasion.reset();
      
        }

        deleteRaison(raiosn: string) {

          this.raisons.forEach((r,index) => {
            if(r.raiosn == raiosn)
              this.raisons.splice(index,1);
          })
          this.raiosn.reset();
          this.prix.reset();
          this.dateRasion.reset();
       
          }
 
       addCaisse(){
         let addRequest= {
           titre :this.addCaisseForm.value.titre,
           patientId: this.addCaisseForm.value.patientId,
           raisons: this.raisons,
         };

         //console.log("request",addRequest);
 
        this.charge =this.http.postElement(this.api.API_URI + url.addCaisse, addRequest);
         this.chargement(this.charge);
           this.addCaisseForm.reset();
           this.hideDialog();
 
       }

 
       updateRendezvous(){
         let addRequest= {
           nom :this.addShedulerForm.value.nom,
           prenom: this.addShedulerForm.value.prenom,
           quartier :this.addShedulerForm.value.quartier,
           villePatienConsl: this.addShedulerForm.value.villePatienConsl,
           numeroPatienConsl :this.addShedulerForm.value.numeroPatienConsl,
           patientId: this.addShedulerForm.value.patientId,
           telephone :this.addShedulerForm.value.telephone,
           sexe: this.addShedulerForm.value.sexe,
           ville: this.addShedulerForm.value.ville,
           isPatient: this.addShedulerForm.value.isPatient
 
         };
 
 
 
           this.http.putElement(this.api.API_URI + url.patient, addRequest).subscribe({
 
             next: data =>{
 
               console.log("Request",addRequest);
               console.log("data",data);
  
               this.addShedulerForm.reset();
               this.hideDialog();
 
               this.messageService.add({
                 severity: 'success',
                 summary: 'success',
                 detail:" Opérations succés",
                 life: 3000
               });
 
 
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


       updateCaisse(){

        let addRequest= {
          montant :this.updateCaisseForm.value.montant,
          reste: this.updateCaisseForm.value.reste,
          mode :this.updateCaisseForm.value.mode,
          date: this.updateCaisseForm.value.date,
          numero :this.updateCaisseForm.value.numero,

        };

         
        this.charge =this.http.putElement(this.api.API_URI + url.updaeCaisse + this.selectElement[0].id, addRequest);
         this.chargement(this.charge);
           this.updateCaisseForm.reset();
           this.hideDialog();

       }
 
       updatePatientView() {
         let dt = formatDate(this.selectElement[0]?.patientId, 'yyyy-MM-dd','en_US');
                 this.addShedulerForm.patchValue({
               'nom': this.selectElement[0].nom,
               'prenom': this.selectElement[0].prenom,
               'numeroPatienConsl': this.selectElement[0].numeroPatienConsl,
               'ville': this.selectElement[0].ville,
               'quartier': this.selectElement[0].quartier,
               'sexe': this.selectElement[0].sexe,
               'isPatient': this.selectElement[0].isPatient,
               'telephone': this.selectElement[0].telephone,
               'villePatienConsl': this.selectElement[0].villePatienConsl,
              'patientId': dt
 
 
         })
 
        // this.addUpdateForm = true;
 
 
       }
       deletePatient(){
 
 
       let id = this.selectElement[0].id;
       this.http.deleteElement(this.api.API_URI + url.patient + '/' + id).subscribe(
         data =>{
 
           this.messageService.add({
             severity: 'success',
             summary: '',
             detail: 'patient supprimer avec succés !',
             life: 3000
           });

 
     }, error => {
        this.messageService.add({
             severity:'error',
             summary: error.error.message,
             detail: error.error.details,
             life: 3000
        });
 
     }
 
       );
 
       }
 
 
 
 
    confirmDelete() {
 
     if (this.selectElement && this.selectElement.length > 0) {
 
       console.log("Suppression des éléments");
 
       this.confirmationService.confirm({
         message: 'Voulez vous supprimer le patient ?',
         icon: 'pi pi-info-circle',
         acceptLabel: 'Oui',
         rejectLabel: 'Nom',
         acceptButtonStyleClass: "p-button-info",
         rejectButtonStyleClass: "p-button-danger",
         accept: () => {
           this.deletePatient()
         }
       });
 
     }
   }
       sexPatient() {
         this.sexes = [
           { nom: 'Masculin', 'id': 1 },
           { nom :  'Feminin', 'id':2}
          ]
       }
 

}
