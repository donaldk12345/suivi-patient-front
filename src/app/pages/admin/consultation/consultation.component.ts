import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { ResponseService } from 'src/app/services/response.service';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';
const API_URI= `${environment.BASE_URL}`
@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit{

  consultation:any[]=[];
  charge: Observable<any> = new Observable<any>();
 users: any[]=[];
 display: boolean = false;
 selectElement: any;
 maSelection: any[] = [];
 cols: any[] = [];
 patien = new Map();
 modifierbtn: boolean =false;
 activatebtn: boolean = false;
 addConsultationForm : FormGroup = Object.create(null);
 unactivatebtn: boolean = false;
 detailbtn: boolean = false;
 displayBasic: boolean = false;
 detalDialog: boolean = false;
 pdfDialog:boolean = false;
 updatebtn: boolean = false;
 deletebtn: boolean = false;
 showpdf:boolean=false;
 nom = new FormControl('', [Validators.required]);
 descirption = new FormControl('', [Validators.required]);
 type = new FormControl('', [Validators.required]);
 date = new FormControl('',[Validators.required]);
 antecedents: any[]=[];
 pdfSrc:any;
 httpData: any;
 pdfURL: any;
 exportColumns: any[] = [];
 patient : any[]=[];
 loading = false;
  sexes: any[]=[];
  addUpdateForm: boolean=false;
  consultations: any[]=[];
  patientID: any;
  consultationOne: any;
  age: number | undefined;
  anteced: any;
  fichiers: any;
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
  this.manageShowPdf();


}

constructor(private ht:HttpClient,private confirmationService: ConfirmationService, private http: ResponseService, private formBuilder: FormBuilder, private messageService: MessageService){

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
  this.addConsultationForm.reset();
  this.addUpdateForm = false;
  this.detalDialog = false;
  this.consultationOne = [];
  this.pdfDialog = false;

}
  ngOnInit(): void {




    this.addConsultationForm= new FormGroup({
      'nom':  new FormControl('', [Validators.required]),
      'probleme': new FormControl('', [Validators.required]),
      'startDate': new FormControl('', [Validators.required]),
      'evolution': new FormControl('', [Validators.required]),
      'symptomeAssocier': new FormControl('', [Validators.required]),
      'facteurs': new FormControl('', [Validators.required]),
      'allergies': new FormControl('', [Validators.required]),
      'maladiesChronique': new FormControl('', [Validators.required]),
      'patientId': new FormControl('', [Validators.required]),
      'antecedent': new FormControl([this.antecedents])
    });

this.getPatient();
this.getConsultation();
    this.cols = [
      {field: 'nom', header: 'Nom', type: 'string', width: 200, isFroz: true},
      {field: 'probleme', header: 'Problème', type: 'string', width: 200, isFroz: false},
       { field: 'quartier', header: 'Quartier', type: 'string', width: 200, isFroz: false },
      { field: 'evolution', header: 'Evolution', type: 'string', width: 200, isFroz: false },
       { field: 'facteurs', header: 'Facteurs', type: 'string', width: 200, isFroz: false },
       { field: 'maladiesChronique', header: 'Maladies chroniques', type: 'string', width: 200, isFroz: false },
       { field: 'nomPatient', header: 'Nom du patient', type: 'string', width: 200, isFroz: false },
       {field: 'debut', header: 'De de début de la maladie', type: 'jour', width: 200, isFroz: false},
        { field: 'username', header: 'Ajouter par', type: 'string', width: 200, isFroz: false },
        {field: 'createAt', header: 'Créer le', type: 'jour', width: 200, isFroz: false},




    ];
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
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


  manageShowPdf() {
    if(this.selectElement.length == 0 || this.selectElement.length > 1){
   this.showpdf = false;
 } else {
   this.showpdf = true;
 }

}

  getPatient(){
    this.http.getElement(API_URI + url.patient).subscribe({
      next: data => {
        if (data) {

          this.patient = data.content;

          /*this.patient.forEach(elt=>{
             this.patien.set(elt.id,elt.nom);

             console.log("Mes patient ", this.patien);
          })*/

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

    previewPdf(){

      let slug = this.selectElement[0].slug;

    this.ht.get(API_URI+ url.consul_report + slug , { responseType: "blob" }).subscribe(data => {
      this.httpData = data;
      var file = new Blob([data], { type: "application/pdf" });
      this.pdfSrc = URL.createObjectURL(file);
      console.log("data => ", this.httpData);
      console.log(" file url => ", this.pdfSrc);
    });
    }

    getConsultation(){
      this.http.getElement(API_URI + url.consultation).subscribe({
        next: data => {
          if (data) {

            this.consultations = data.content;
            console.log("Mes consultation ", this.consultations);
            /*this.patient.forEach(elt=>{
               this.patien.set(elt.id,elt.nom);

               console.log("Mes patient ", this.patien);
            })*/

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

      getAntecedent(){

        let id = this.selectElement[0].id;

        this.http.getElement(API_URI + url.antecedent + '/' + id).subscribe({
          next: data => {
            if (data) {

              this.anteced = data.content;
              console.log("Mes antecedent ", this.anteced);
              /*this.patient.forEach(elt=>{
                 this.patien.set(elt.id,elt.nom);

                 console.log("Mes patient ", this.patien);
              })*/

              let madate = this.anteced.date;

              let newDate = new Date(madate);


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


        getfichierpatient() {

          let id= this.selectElement[0].id;

          console.log('mon id', id);

          this.http.getElement(API_URI + url.fichier_patient + id).subscribe({

            next: data => {
              if (data) {
                console.log("Mes fichies ", data);

                this.fichiers = data;

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


        deleteFichier(id:number){

                confirm("Voulez vous supprimer le fichier ?");
          this.http.deleteElement(API_URI + url.delete_file + id).subscribe(
            data =>{
              this.getfichierpatient();

              this.messageService.add({
                severity: 'success',
                summary: '',
                detail: 'fichier supprimer avec succés !',
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



        downloadFichierPatient(name:string){

          this.ht.get(API_URI + url.fichier_download + name,{ responseType: "blob" }).subscribe({

            next: data => {
              if (data) {
                console.log(" data ", data);
                var result = name.split(".").pop();

                if(result=="xlsx"){

                const filename =  name + "_" + ".xlsx";
                var a = document.createElement("a");
                a.href = URL.createObjectURL(data);
                     a.setAttribute("download", filename);
                a.click();


                }else if(result=="docx"){
                  const filename =  name + "_" + ".docx";

                  var a = document.createElement("a");
                  a.href = URL.createObjectURL(data);
                       a.setAttribute("download", filename);
                  a.click();

                }else{
                  console.log("rien");
                }





              }
            }

          })

        }


      getConsultationById() {

        let slug = this.selectElement[0].slug;

        console.log('mon slug', slug);

        this.http.getElement(API_URI + url.consultation + '/' + slug).subscribe({

          next: data => {
            if (data) {
              console.log("Mon patient ", data);
              let d = new Date();



              this.detalDialog = true;
              this.consultationOne = data;
              let dt = this.consultationOne.dateNaiss;
              let newDate = new Date(dt);
              this.age = d.getFullYear() - newDate.getFullYear();
              console.log("age", this.age);

              console.log("patient one",this.consultationOne);
              this.getAntecedent();
              this.getfichierpatient();

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

      getPdf(){

        this.pdfDialog = true;

        this.previewPdf();

      }

      downloadReport(){
        let patient = this.selectElement[0].nomPatient;
        let slug = this.selectElement[0].slug;
        let date = new Date();
        this.ht.get(API_URI+ url.consul_report + slug, { responseType: "blob" }).subscribe(data => {
          const filename =  patient + "_" + date.getFullYear() +"_" + ".pdf";
              var a = document.createElement("a");
        a.href = URL.createObjectURL(data);
             a.setAttribute("download", filename);
        a.click();
        this.pdfDialog = false;
      });

      }

  addAntecedent(nom: any, descirption: any, type: any, date:any) {
    const antecedent: any = {};
    antecedent.nom= nom.value;
    antecedent.descirption = descirption.value;
    antecedent.type = type.value;
    antecedent.date = date.value;
    console.log(antecedent);
    this.antecedents.push(antecedent);
    this.nom.reset();
    this.descirption.reset();
    this.date.reset();
    this.type.reset();

  }

  deleteAntecedent(nom: string) {
    this.antecedents.forEach((antecedent,index) => {
      if(antecedent.nom == nom)
        this.antecedents.splice(index,1);
    })
    this.nom.reset();
    this.descirption.reset();
    this.date.reset();
    this.type.reset();
  }

  addConsultation(){

    let addConsultationRequest= {
      nom: this.addConsultationForm.value.nom,
      probleme: this.addConsultationForm.value.probleme,
      startDate: this.addConsultationForm.value.startDate,
      evolution: this.addConsultationForm.value.evolution,
      symptomeAssocier: this.addConsultationForm.value.symptomeAssocier,
      facteurs: this.addConsultationForm.value.facteurs,
      allergies: this.addConsultationForm.value.allergies,
      maladiesChronique: this.addConsultationForm.value.maladiesChronique,
      patientId: this.addConsultationForm.value.patientId,
      antecedent: this.antecedents

    };

    this.charge =this.http.postElement(API_URI + url.consultation, addConsultationRequest);
    this.chargement(this.charge);
      this.addConsultationForm.reset();
      this.hideDialog();


    console.log("Mes données envoyé", addConsultationRequest);
  }

  updateConsultationView(){

  }

  detailConsultationView(){
    this.detalDialog = true;

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
          this.deleteConsultation()
        }
      });

    }
  }
  deleteConsultation() {
    throw new Error('Method not implemented.');
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
          this.getConsultation();

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




}
