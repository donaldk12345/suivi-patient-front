import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarOptions } from '@fullcalendar/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { ResponseService } from 'src/app/services/response.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';
import { dA } from '@fullcalendar/core/internal-common';
const API_URI= `${environment.BASE_URL}`
@Component({
  selector: 'app-rendezvous',
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent implements OnInit{
  element: any;
  rendesvous: any[]=[];

userPreview() {
throw new Error('Method not implemented.');
}

  charge: Observable<any> = new Observable<any>();
  users: any[]=[];
  display: boolean = false;
  calendarDialog: boolean = false;
  selectElement: any;
  maSelection: any[] = [];
  cols: any[] = [];
  modifierbtn: boolean =false;
  activatebtn: boolean = false;
  addShedulerForm : FormGroup = Object.create(null);
  unactivatebtn: boolean = false;
  detailbtn: boolean = false;
  displayBasic: boolean = false;
  updatebtn: boolean = false;
  deletebtn: boolean = false;
  exportColumns: any[] = [];
  patient : any[]=[];
  loading = true;
   sexes: any[]=[];
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
 
 constructor(private confirmationService: ConfirmationService, private http: ResponseService, private formBuilder: FormBuilder, private messageService: MessageService){
 
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

 }
 hideDialog(){
 
   this.display = false;
   this.addShedulerForm.reset();
   this.calendarDialog = false

 
 }
 handleClick(elt:any){

  //console.log("element",elt);
 }
 
 Events: any[] = [];
 val: any[] = [];
 eventColor = "#ffcc00";
 calendarWeekends = true;
 calendarOptions: CalendarOptions = {
   plugins: [dayGridPlugin, interactionPlugin],
   initialView: 'dayGridMonth',
   headerToolbar: {
     left: 'prev,next today',
     center: 'title',
     right: 'dayGridMonth,dayGridWeek,listMonth',
   },
   weekends: true,
   editable: true,
   selectable: true,
   selectMirror: true,
   dayMaxEvents: true,
 };

 onDateClick(res: any) {
  alert('Clicked on date : ' + res.dateStr);
}
 
   ngOnInit(): void {
 
     this.addShedulerForm = new FormGroup({
       'title':  new FormControl(''),
       'date': new FormControl(''),
       'nomPatienConsl': new FormControl(''),
       'villePatienConsl': new FormControl(''),
       'numeroPatienConsl': new FormControl(''),
       'patientId': new FormControl(''),
       'prenom': new FormControl(''),
       'email': new FormControl(''),
       'quartier': new FormControl(''),
       'numeroCni': new FormControl(''),
       'profesion': new FormControl(''),
       'date_naiss': new FormControl(''),
       'sexe': new FormControl(''),
       'isPatient': new FormControl('')
     });
 
     this.cols = [
       {field: 'title', header: 'Titre consultaion', type: 'string', width: 200, isFroz: true},
       {field: 'nomPatient', header: 'Nom', type: 'string', width: 200, isFroz: false},
       {field: 'prenomPatient', header: 'Prénom', type: 'string', width: 200, isFroz: false},
        { field: 'quartier', header: 'Quartier', type: 'string', width: 200, isFroz: false },
       { field: 'ville', header: 'Ville', type: 'string', width: 200, isFroz: false },
        { field: 'telephone', header: 'Téléphone', type: 'string', width: 200, isFroz: false },
        { field: 'isPatient', header: 'Etait patient', type: 'boolean', width: 200, isFroz: false },
        { field: 'statut', header: 'Etat du rendez vous', type: 'boolean', width: 200, isFroz: false },
        { field: 'profession', header: 'Profession', type: 'string', width: 200, isFroz: false },
        { field: 'sexPatient', header: 'Sexe', type: 'string', width: 200, isFroz: false },
        { field: 'dateNaiss', header: 'Date de naissance', type: 'jour', width: 200, isFroz: false },
         { field: 'username', header: 'Ajouter par', type: 'string', width: 200, isFroz: false },
         {field: 'date', header: 'Date rendez-vous', type: 'date', width: 200, isFroz: false},
 
 
 
 
     ];
     this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
    
      this.getbolValue();
      this.getRendezvous();
      this.sexPatient();
      this.getCalendar();
   }

   getCalendar(){
    setTimeout(() => {
      return this.http.getElement(API_URI + url.rendezvous)
        .subscribe(data => {
          this.Events.push("calendar",data);

          this.val = data.content.map((e:any) => ({title:e.title, start:e.date, backgroundColor: this.eventColor,color:e.color}));
          console.log("mont calendrier",this.val);
        });
    }, 2200);
    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        events: this.val,
        eventColor: '#378006',
        height: 700,
        dateClick: this.handleClick.bind(this.Events),
      };
    }, 2500);
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
           this.getRendezvous();
           this.getCalendar();
 
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

     getPatient(){
      this.http.getElement(API_URI + url.patient).subscribe({
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
        { val: 'OUI', 'ids': true },
        { val :  'NON', 'ids':false}
       ]
    }
 
     getRendezvous(){
       this.http.getElement(API_URI + url.rendezvous).subscribe({
         next: data => {
           if (data) {
             console.log("Mes rendez vous ", data.content);
             this.rendesvous = data.content;
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
 
       addRendezvous(){
         let addRequest= {
           title :this.addShedulerForm.value.title,
           date: this.addShedulerForm.value.date,
           color :this.getRandomColor(),
           villePatienConsl: this.addShedulerForm.value.villePatienConsl,
           numeroPatienConsl :this.addShedulerForm.value.numeroPatienConsl,
           patientId: this.addShedulerForm.value.patientId,
           nomPatienConsl :this.addShedulerForm.value.nomPatienConsl,
           isPatient: this.addShedulerForm.value.isPatient,
           prenom :this.addShedulerForm.value.prenom,
           numeroCni: this.addShedulerForm.value.numeroCni,
           profesion :this.addShedulerForm.value.profesion,
           quartier: this.addShedulerForm.value.quartier,
           email :this.addShedulerForm.value.email,
           date_naiss :this.addShedulerForm.value.date_naiss,
           sexe: this.addShedulerForm.value.sexe
 
         };

         //console.log("request",addRequest);
 
        this.charge =this.http.postElement(API_URI + url.rendezvous, addRequest);
         this.chargement(this.charge);
           this.addShedulerForm.reset();
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
 
 
 
           this.http.putElement(API_URI + url.patient, addRequest).subscribe({
 
             next: data =>{
 
               console.log("Request",addRequest);
               console.log("data",data);
               this.getRendezvous();
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
       this.http.deleteElement(API_URI + url.patient + '/' + id).subscribe(
         data =>{
 
           this.messageService.add({
             severity: 'success',
             summary: '',
             detail: 'patient supprimer avec succés !',
             life: 3000
           });
         this.getRendezvous();
 
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
