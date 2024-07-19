import { formatDate } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { ApiUrlService } from 'src/app/services/api-url.service';
import { ResponseService } from 'src/app/services/response.service';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';
@Component({
  selector: 'app-preinscription',
  templateUrl: './preinscription.component.html',
  styleUrls: ['./preinscription.component.css']
})
export class PreinscriptionComponent implements OnInit{


  consultation:any[]=[];
  charge: Observable<any> = new Observable<any>();
 users: any[]=[];
 display: boolean = false;
 selectElement: any;
 maSelection: any[] = [];
 file!: File;
 displayImport:boolean = false;
 displayFilter = false;
 cols: any[] = [];
 patien = new Map();
 modifierbtn: boolean =false;
 isRefresh:boolean=false
 uploadbtn: boolean =false;
 genratebtn: boolean =false;
 activatebtn: boolean = false;
 addPrescriptionForm : FormGroup = Object.create(null);
 updatePrescriptionForm : FormGroup = Object.create(null);
 unactivatebtn: boolean = false;
 detailbtn: boolean = false;
 displayBasic: boolean = false;
 detalDialog: boolean = false;
 pdfDialog:boolean = false;
 updatebtn: boolean = false;
 deletebtn: boolean = false;
 showpdf:boolean=false;
 mediicamentForm : FormGroup = Object.create(null);
 nomIntegral = new FormControl('', [Validators.required]);
 dosage = new FormControl('', [Validators.required]);
 voieAdministration=  new FormControl('',[Validators.required]);
 dureeTraitement=  new FormControl('',[Validators.required]);
 arretMedicament=  new FormControl('',[Validators.required]);
 indicationMedicament=  new FormControl('',[Validators.required]);
 antecedents: any[]=[];
 medicaments: any[]=[];
 mdsa: any[]=[];
 hoptitaux:any[]=[];
 hopitalAutres:any[]=[];
 habitudes:any[]=[];
 pdfSrc:any;
 httpData: any;
 pdfURL: any;
 dateNaisse:any;
 suggestions:any[] | undefined;
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
  suggestionsd: any;
  patientName:any[]=[];
  paysList: any[]=[];
  country: any[]=[];
  countryName: any[]=[];
  boolvalue: any[]=[];
  hopital: any;
  medicament: any;
  habitude: any;
  prescriptions: any[]=[];
  mds: any;
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
  this.manageUploadBtn();
  this.manageGeneratePdfBtn();


}

constructor(private api:ApiUrlService,private ht:HttpClient,private confirmationService: ConfirmationService, private http: ResponseService, private formBuilder: FormBuilder, private messageService: MessageService){

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
  this.addUpdateForm = true;

}

uploadDialog() {
  this.displayImport = true;
}

filterDialog() {
  this.displayFilter = true;
  this.isRefresh = true;
}
hideDialog(){

  this.display = false;
  this.addPrescriptionForm.reset();
  this.addUpdateForm = false;
  this.detalDialog = false;
  this.displayImport = false
  this.consultationOne = [];
  this.displayImport= false;
  this.displayFilter = false;
  this.pdfDialog=false;

}

  ngOnInit(): void {

    this.cols = [
      {field: 'title', header: 'Nom prescription', type: 'string', width: 200, isFroz: true},
      {field: 'raison', header: 'Raison', type: 'string', width: 200, isFroz: false},
      {field: 'nomPatient', header: 'Nom patient', type: 'string', width: 200, isFroz: false},
      {field: 'prenomPatient', header: 'Prénom', type: 'string', width: 200, isFroz: false},
       { field: 'quartier', header: 'Quartier', type: 'string', width: 200, isFroz: false },
      { field: 'ville', header: 'Ville', type: 'string', width: 200, isFroz: false },
      { field: 'code', header: 'Code', type: 'string', width: 200, isFroz: false },
       { field: 'telephone', header: 'Téléphone', type: 'string', width: 200, isFroz: false },
       { field: 'profession', header: 'Profession', type: 'string', width: 200, isFroz: false },
       { field: 'sexPatient', header: 'Sexe', type: 'string', width: 200, isFroz: false },
       { field: 'datePrescription', header: 'Date prescription', type: 'jour', width: 200, isFroz: false },
        { field: 'username', header: 'Ajouter par', type: 'string', width: 200, isFroz: false },
        {field: 'dateValidite', header: 'Date validité', type: 'date', width: 200, isFroz: false},




    ];
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
   
    
    this.addPrescriptionForm= new FormGroup({
      'title':  new FormControl('', [Validators.required]),
      'validite': new FormControl('', [Validators.required]),
      'raison': new FormControl('', [Validators.required]),
      'codeConsulation': new FormControl('', [Validators.required]),
      'patientId': new FormControl('', [Validators.required]),
      'medicament': new FormControl([this.medicaments]),
      
    });

    
    this.getPrescription();

    
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

     manageGeneratePdfBtn(){
      if(this.selectElement.length == 0 || this.selectElement.length > 1){
        this.genratebtn = false;
      } else {
        this.genratebtn = true;
      }
     }


         /**
     * Gérer le bouton Modifier
     */
         manageUploadBtn(){
          if(this.selectElement.length == 0 || this.selectElement.length > 1){
            this.uploadbtn = false;
          } else {
            this.uploadbtn = true;
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
  this.http.getElement(this.api.API_URI + url.patient).subscribe({
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


  addMedicament(nomIntegral:any,dosage:any,voieAdministration:any,dureeTraitement:any,arretMedicament:any,indicationMedicament:any){
    const medicament:any = {};
    medicament.nomIntegral = nomIntegral.value;
    medicament.dosage = dosage.value;
    medicament.voieAdministration = voieAdministration.value;
    medicament.dureeTraitement = dureeTraitement.value;
    medicament.arretMedicament = arretMedicament.value;
    medicament.indicationMedicament = indicationMedicament.value;
    console.log(medicament);
    this.medicaments.push(medicament);
    this.nomIntegral.reset();
    this.dosage.reset();
    this.voieAdministration.reset();
    this.dureeTraitement.reset();
    this.arretMedicament.reset();
    this.indicationMedicament.reset();

    
  }


  addPrescription(){

    
    let addConsultationRequest= {
      title: this.addPrescriptionForm.value.title,
      validite: this.addPrescriptionForm.value.validite,
      raison: this.addPrescriptionForm.value.raison,
      codeConsulation: this.addPrescriptionForm.value.codeConsulation,
      patientId: this.addPrescriptionForm.value.patientId,
      medicament: this.medicaments,



    };

    console.log("Mes données envoyé", addConsultationRequest);
    this.charge =this.http.postElement(this.api.API_URI + url.prescription, addConsultationRequest);
    this.chargement(this.charge);
      this.addPrescriptionForm.reset();
      this.hideDialog();



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
          this.getPrescription();

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
  getPrescription() {
    this.http.getElement(this.api.API_URI + url.prescription).subscribe({
      next: data => {
        if (data) {
          console.log("Mes prescriptions ", data.content);
          this.prescriptions = data.content;
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

  getMedicamentprescris() {
    this.http.getElement(this.api.API_URI + url.prescription_md + this.selectElement[0].id ).subscribe({
      next: data => {
        if (data) {
          console.log("Mes mds ", data);
          this.mds = data;

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

  getGenerateReportPdf() {
    let parmasvalue = new HttpParams;
    parmasvalue =parmasvalue.append('prescriptionId',this.selectElement[0].id);

    this.http.getElementParams(this.api.API_URI + url.report_generated,{params:parmasvalue}).subscribe({
      next: data => {

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Opérations succéss'
          })
      },
      error: error => {
        console.log('error!', error);

        this.messageService.add({
          severity: 'error',
          summary: "Erreur",
          detail: "Le fichier a déjà été générer",
          life: 3000
        });
    }
    })
  }


  
  
  

  updatePreview(){
    this.getPatient();
    this.getMedicamentprescris();
    let dt = formatDate(this.selectElement[0]?.dateValidite, 'yyyy-MM-dd','en_US');
    this.addPrescriptionForm.patchValue({
  'title': this.selectElement[0].title,
  'raison': this.selectElement[0].raison,
  'codeConsulation': this.selectElement[0].code,
  'patientId': this.selectElement[0].patientId,
 'validite': dt


})
this.mdsa.push(this.mds);
console.log("push",this.mdsa);

this.addUpdateForm = true;
  }

  getPdf(){

    this.pdfDialog = true;

    this.previewPdf();

  }

  previewPdf(){

    let id = this.selectElement[0].id;

  this.ht.get(this.api.API_URI+ url.prescription_report + id , { responseType: "blob" }).subscribe(data => {
    this.httpData = data;
    var file = new Blob([data], { type: "application/pdf" });
    this.pdfSrc = URL.createObjectURL(file);
    console.log("data => ", this.httpData);
    console.log(" file url => ", this.pdfSrc);
  });
  }

  downloadReport() {
    throw new Error('Method not implemented.');
    }
    

    confirmDelete() {
    throw new Error('Method not implemented.');
    }
    deleteAntecedent(arg0: any) {
    throw new Error('Method not implemented.');
    }
}
