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
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit{

 charge: Observable<any> = new Observable<any>();
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
}

updateDialog() {
  this.addUpdateForm = true;
}
hideDialog(){

  this.display = false;
  this.addPatientForm.reset();
  this.addUpdateForm = false;

}

  ngOnInit(): void {

    this.addPatientForm = new FormGroup({
      'nom':  new FormControl('', [Validators.required]),
      'prenom': new FormControl('', [Validators.required]),
      'quartier': new FormControl('', [Validators.required]),
      'numeroCni': new FormControl('', [Validators.required]),
      'profesion': new FormControl('', [Validators.required]),
      'date_naiss': new FormControl('', [Validators.required]),
      'telephone': new FormControl('', [Validators.required]),
      'email': new FormControl('',),
      'sexe': new FormControl('', [Validators.required]),
      'ville': new FormControl('', [Validators.required]),
    });

    this.cols = [
      {field: 'nom', header: 'Nom', type: 'string', width: 200, isFroz: true},
      {field: 'prenom', header: 'Prénom', type: 'string', width: 200, isFroz: false},
       { field: 'quariter', header: 'Quartier', type: 'string', width: 200, isFroz: false },
      { field: 'ville', header: 'Ville', type: 'string', width: 200, isFroz: false },
       { field: 'telephone', header: 'Téléphone', type: 'string', width: 200, isFroz: false },
       { field: 'email', header: 'Email', type: 'string', width: 200, isFroz: false },
       { field: 'profession', header: 'Profession', type: 'string', width: 200, isFroz: false },
       { field: 'numeroCni', header: 'CNI', type: 'string', width: 200, isFroz: false },
       { field: 'sexe', header: 'Sexe', type: 'string', width: 200, isFroz: false },
       { field: 'dateNaissance', header: 'Date de naissance', type: 'jour', width: 200, isFroz: false },
        { field: 'username', header: 'Ajouter par', type: 'string', width: 200, isFroz: false },
        {field: 'createAt', header: 'Créer le', type: 'jour', width: 200, isFroz: false},




    ];
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
    this.getPatient();
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
          this.getPatient();

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

      addPatientData(){
        let addRequest= {
          nom :this.addPatientForm.value.nom,
          prenom: this.addPatientForm.value.prenom,
          quartier :this.addPatientForm.value.quartier,
          numeroCni: this.addPatientForm.value.numeroCni,
          profesion :this.addPatientForm.value.profesion,
          date_naiss: this.addPatientForm.value.date_naiss,
          telephone :this.addPatientForm.value.telephone,
          sexe: this.addPatientForm.value.sexe,
          ville: this.addPatientForm.value.ville,
          email: this.addPatientForm.value.email

        };

        this.charge =this.http.postElement(this.api.API_URI + url.patient, addRequest);
        this.chargement(this.charge);
          this.addPatientForm.reset();
          this.hideDialog();

      }

      updatePatientData(){
        let addRequest= {
          nom :this.addPatientForm.value.nom,
          prenom: this.addPatientForm.value.prenom,
          quartier :this.addPatientForm.value.quartier,
          numeroCni: this.addPatientForm.value.numeroCni,
          profesion :this.addPatientForm.value.profesion,
          date_naiss: this.addPatientForm.value.date_naiss,
          telephone :this.addPatientForm.value.telephone,
          sexe: this.addPatientForm.value.sexe,
          ville: this.addPatientForm.value.ville,
          email: this.addPatientForm.value.email,
          patientId: this.selectElement[0].id

        };



          this.http.putElement(this.api.API_URI + url.patient, addRequest).subscribe({

            next: data =>{

              console.log("Request",addRequest);
              console.log("data",data);
              this.getPatient();
              this.addPatientForm.reset();
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
        let dt = formatDate(this.selectElement[0]?.date_naiss, 'yyyy-MM-dd','en_US');
                this.addPatientForm.patchValue({
              'nom': this.selectElement[0].nom,
              'prenom': this.selectElement[0].prenom,
              'profesion': this.selectElement[0].profesion,
              'ville': this.selectElement[0].ville,
              'quartier': this.selectElement[0].quartier,
              'sexe': this.selectElement[0].sexe,
              'email': this.selectElement[0].email,
              'telephone': this.selectElement[0].telephone,
              'numeroCni': this.selectElement[0].numeroCni,
             'date_naiss': dt


        })

        this.addUpdateForm = true;


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
        this.getPatient();

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

      get nom() {

        return this.addPatientForm.controls['nom'];
     }

     get prenom(){
        return this.addPatientForm.controls['prenom'];
     }
       get quartier() {

        return this.addPatientForm.controls['quartier'];
     }

     get numeroCni(){
        return this.addPatientForm.controls['numeroCni'];
     }
       get profesion() {

        return this.addPatientForm.controls['profesion'];
     }

     get date_naiss(){
        return this.addPatientForm.controls['date_naiss'];
     }
       get telephone() {

        return this.addPatientForm.controls['telephone'];
     }

     get sexe(){
        return this.addPatientForm.controls['sexe'];
     }

       get ville() {

        return this.addPatientForm.controls['ville'];
     }

}
