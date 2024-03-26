import { formatDate } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { AgentService } from 'src/app/services/dataimport/agent.service';
import { ResponseService } from 'src/app/services/response.service';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';
import * as jsonData from '../../../../assets/pays.json';
const API_URI= `${environment.BASE_URL}`
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
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
 file!: File;
 displayImport:boolean = false;
 displayFilter = false;
 cols: any[] = [];
 patien = new Map();
 modifierbtn: boolean =false;
 isRefresh:boolean=false
 uploadbtn: boolean =false;
 activatebtn: boolean = false;
 addConsultationForm : FormGroup = Object.create(null);
 filterForm : FormGroup = Object.create(null);
 unactivatebtn: boolean = false;
 detailbtn: boolean = false;
 displayBasic: boolean = false;
 detalDialog: boolean = false;
 pdfDialog:boolean = false;
 updatebtn: boolean = false;
 deletebtn: boolean = false;
 showpdf:boolean=false;
 mediicamentForm : FormGroup = Object.create(null);
 nom = new FormControl('', [Validators.required]);
 descirption = new FormControl('', [Validators.required]);
 type = new FormControl('', [Validators.required]);
 date = new FormControl('',[Validators.required]);
 nomMedicament =  new FormControl('',[Validators.required]);
 dateMedica=  new FormControl('',[Validators.required]);
 nomHopital=  new FormControl('',[Validators.required]);
 dateHopital=  new FormControl('',[Validators.required]);
 addresse=  new FormControl('',[Validators.required]);
 nomDocteur=  new FormControl('',[Validators.required]);
 pays=  new FormControl('',[Validators.required]);
 ville=  new FormControl('',[Validators.required]);

 alimentation=  new FormControl('',[Validators.required]);
 tabac=  new FormControl('',[Validators.required]);
 alcool=  new FormControl('',[Validators.required]);
 sport=  new FormControl('',[Validators.required]);
 dateHabitude=  new FormControl('',[Validators.required]);
 antecedents: any[]=[];
 medicaments: any[]=[];
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
  this.manageUploadBtn();


}

constructor(private service:AgentService,private ht:HttpClient,private confirmationService: ConfirmationService, private http: ResponseService, private formBuilder: FormBuilder, private messageService: MessageService){

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

uploadDialog() {
  this.displayImport = true;
}

filterDialog() {
  this.displayFilter = true;
  this.isRefresh = true;
}
hideDialog(){

  this.display = false;
  this.addConsultationForm.reset();
  this.addUpdateForm = false;
  this.detalDialog = false;
  this.displayImport = false
  this.consultationOne = [];
  this.displayImport= false;
  this.displayFilter = false;
  this.pdfDialog=false;
  this.filterForm.reset();

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
      'antecedent': new FormControl([this.antecedents]),
      'medicament': new FormControl([this.medicaments]),
      'hopitalAutres': new FormControl([this.hoptitaux]),
      'habitudes': new FormControl([this.habitudes])
    });

    this.filterForm = new FormGroup({
      'nom':  new FormControl('',),

    })



this.getPatient();
this.getConsultation();
this.getPatientFilterName();
this.getbolValue();

this.getPays();

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

    getPatientFilterName(){
      this.http.getElement(API_URI + url.patientName).subscribe({
        next: data => {
          if (data) {
  
            this.patientName = data;
            console.log("Mes filter ", this.patientName);
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

    search(event: AutoCompleteCompleteEvent){
      
      let filtered: any[] = [];
      let query = event.query;

      //this.patientName.filter

      for (let i = 0; i < (this.patientName as any[]).length; i++) {
          let country = (this.patientName as any[])[i];
          
              filtered.push(country.nom);
        
      }
      console.log("search",this.patient);

      this.suggestionsd = filtered;
    

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

    refresh(){
       this.isRefresh = false;
       this.getfilter();
    }

    getStatusSeverity(status:boolean) {
      switch (status) {
          case false:
              return 'danger';
  
          case  true :
              return 'success';
      }
  }
    getConsultationFilter(){
      
      let parmasvalue = new HttpParams;

      parmasvalue =parmasvalue.append('nom', this.filterForm.get('nom')?.value);

      this.http.getElementParams(API_URI + url.consultation,{params:parmasvalue}).subscribe({
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

      getConsultation(){
      
        let parmasvalue = new HttpParams;
  
        parmasvalue =parmasvalue.append('nom', this.filterForm.get('nom')?.value);
  
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
      getfilter(){
    
  
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

        getHopital(){

          let id = this.selectElement[0].id;
  
          this.http.getElement(API_URI + url.hopital_lst + id).subscribe({
            next: data => {
              if (data) {
  
                this.hopital = data.content;
                console.log("Mes hoptaux ", this.anteced);
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

          getMedicament(){

            let id = this.selectElement[0].id;
    
            this.http.getElement(API_URI + url.medicament_list + id).subscribe({
              next: data => {
                if (data) {
    
                  this.medicament = data.content;
                  console.log("Mes medicament ", this.medicament);
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


        
            getHabitudes(){

              let id = this.selectElement[0].id;
      
              this.http.getElement(API_URI + url.habitudes + id).subscribe({
                next: data => {
                  if (data) {
      
                    this.habitude = data.content;
                    console.log("Mes habitudes ", this.habitude);
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



  onUpload(event: any){
    this.file = event.target.files.item(0);
    console.log(event.target.files[0])

  }

  uploadFilePatient(){
    let id= this.selectElement[0].id;

    this.service.uploadFileData(this.file,id).subscribe({

      next: data =>{

        console.log("file data",data);

        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail:"Fichier impoter avec succés",
          life: 3000
        });
        this.displayImport = false;
        this.getfichierpatient();

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
             this.dateNaisse = newDate;
              this.age = d.getFullYear() - newDate.getFullYear();
              console.log("age", this.age);

              console.log("patient one",this.consultationOne);
              this.getAntecedent();
              this.getfichierpatient();
              this.getHopital();
              this.getMedicament();
              this.getHabitudes();

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

  addMedicament(nomMedicament:any,dateMedica:any){
    const medicament:any = {};
    medicament.nomMedicament = nomMedicament.value;
    medicament.dateMedica = dateMedica.value;
    console.log(medicament);
    this.medicaments.push(medicament);
    this.nomMedicament.reset();
    this.dateMedica.reset();

    
  }

  deleteMedicament(nomMedicament: string) {
    this.medicaments.forEach((medicament,index) => {
      if(medicament.nomMedicament == nomMedicament)
        this.medicaments.splice(index,1);
    })
    this.nomMedicament.reset();
    this.dateMedica.reset();
  
  }

  addHopital(addresse:any,dateHopital:any,nomHopital:any,nomDocteur:any,pays:any,ville:any){
    const hopitalAutres:any = {};
    hopitalAutres.addresse = addresse.value;
    hopitalAutres.dateHopital = dateHopital.value;
    hopitalAutres.nomHopital = nomHopital.value;
    hopitalAutres.nomDocteur = nomDocteur.value;
    hopitalAutres.pays = pays.value;
    hopitalAutres.ville = ville.value;
    console.log(hopitalAutres);
    this.hoptitaux.push(hopitalAutres);
    this.addresse.reset();
    this.dateHopital.reset();
    this.nomDocteur.reset();
    this.nomHopital.reset();
    this.pays.reset();
    this.ville.reset();


  }

  deletehopital(nomHopital: string){
    this.hoptitaux.forEach((hopital,index) => {
      if(hopital.nomHopital == nomHopital)
        this.hoptitaux.splice(index,1);
    })
    this.addresse.reset();
    this.dateHopital.reset();
    this.nomDocteur.reset();
    this.nomHopital.reset();
    this.pays.reset();
    this.ville.reset();
  }

  addHabitude(alimentation:any,tabac:any,alcool:any,sport:any,dateHabitude:any){
    const habitude :any = {};
    habitude.alimentation = alimentation.value;
    habitude.tabac = tabac.value;
    habitude.alcool = alcool.value;
    habitude.sport = sport.value;
    habitude.dateHabitude = dateHabitude.value;
    console.log(habitude);
    this.habitudes.push(habitude);
    this.alimentation.reset();
    this.tabac.reset();
    this.alcool.reset();
    this.sport.reset();
    this.dateHabitude.reset();
  }

  deleteHabitude(alimentation:any){
    this.habitudes.forEach((habitude,index) => {
      if(habitude.alimentation == alimentation)
        this.habitudes.splice(index,1);
    })
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
      antecedent: this.antecedents,
      medicament: this.medicaments,
      hopitalAutres: this.hoptitaux,
      habitudes: this.habitudes


    };

    this.charge =this.http.postElement(API_URI + url.consultation, addConsultationRequest);
    this.chargement(this.charge);
      this.addConsultationForm.reset();
      this.hideDialog();


    console.log("Mes données envoyé", addConsultationRequest);
  }


  getbolValue(){
    this.boolvalue = [
      { val: 'OUI', 'id': true },
      { val :  'NON', 'id':false}
     ]

  }


  getPays() {
       /*this.http.getElement('../../../../assets/pays.json').subscribe({

        next: data =>{
          console.log("pays",data[0].country);
          this.country = data;

          this.country.forEach(elt=>{
            //console.log("element",elt.country);
            this.countryName.push(elt.country);
            //console.log("country",this.countryName);
          })
        }
       })
*/
this.countryName = [
  {
    nom: "Afghanistan"
},
{
    nom: "Albania"
},
{
    nom: "Algeria"
},
{
    nom: "American Samoa"
},
{
    nom: "Andorra"
},
{
    nom: "Angola"
},
{
    nom: "Anguilla"
},
{
    nom: "Antarctica"
},
{
    nom: "Antigua and Barbuda"
},
{
    nom: "Argentina"
},
{
    nom: "Armenia"
},
{
    nom: "Aruba"
},
{
    nom: "Australia"
},
{
    nom: "Austria"
},
{
    nom: "Azerbaijan"
},
{
    nom: "Bahamas"
},
{
    nom: "Bahrain"
},
{
    nom: "Bangladesh"
},
{
    nom: "Barbados"
},
{
    nom: "Belarus"
},
{
    nom: "Belgium"
},
{
    nom: "Belize"
},
{
    nom: "Benin"
},
{
    nom: "Bermuda"
},
{
    nom: "Bhutan"
},
{
    nom: "Bolivia"
},
{
    nom: "Bosnia and Herzegovina"
},
{
    nom: "Botswana"
},
{
    nom: "Bouvet Island"
},
{
    nom: "Brazil"
},
{
    nom: "British Indian Ocean Territory"
},
{
    nom: "Brunei"
},
{
    nom: "Bulgaria"
},
{
    nom: "Burkina Faso"
},
{
    nom: "Burundi"
},
{
    nom: "Cambodia"
},
{
    nom: "Cameroon"
},
{
    nom: "Canada"
},
{
    nom: "Cape Verde"
},
{
    nom: "Cayman Islands"
},
{
    nom: "Central African Republic"
},
{
    nom: "Chad"
},
{
    nom: "Chile"
},
{
    nom: "China"
},
{
    nom: "Christmas Island"
},
{
    nom: "Cocos (Keeling) Islands"
},
{
    nom: "Colombia"
},
{
    nom: "Comoros"
},
{
    nom: "Congo"
},
{
    nom: "The Democratic Republic of Congo"
},
{
    nom: "Cook Islands"
},
{
    nom: "Costa Rica"
},
{
    nom: "Ivory Coast"
},
{
    nom: "Croatia"
},
{
    nom: "Cuba"
},
{
    nom: "Cyprus"
},
{
    nom: "Czech Republic"
},
{
    nom: "Denmark"
},
{
    nom: "Djibouti"
},
{
    nom: "Dominica"
},
{
    nom: "Dominican Republic"
},
{
    nom: "East Timor"
},
{
    nom: "Ecuador"
},
{
    nom: "Egypt"
},
{
    nom: "England"
},
{
    nom: "El Salvador"
},
{
    nom: "Equatorial Guinea"
},
{
    nom: "Eritrea"
},
{
    nom: "Estonia"
},
{
    nom: "Ethiopia"
},
{
    nom: "Falkland Islands"
},
{
    nom: "Faroe Islands"
},
{
    nom: "Fiji Islands"
},
{
    nom: "Finland"
},
{
    nom: "France"
},
{
    nom: "French Guiana"
},
{
    nom: "French Polynesia"
},
{
    nom: "French Southern territories"
},
{
    nom: "Gabon"
},
{
    nom: "Gambia"
},
{
    nom: "Georgia"
},
{
    nom: "Germany"
},
{
    nom: "Ghana"
},
{
    nom: "Gibraltar"
},
{
    nom: "Greece"
},
{
    nom: "Greenland"
},
{
    nom: "Grenada"
},
{
    nom: "Guadeloupe"
},
{
    nom: "Guam"
},
{
    nom: "Guatemala"
},
{
    nom: "Guernsey"
},
{
    nom: "Guinea"
},
{
    nom: "Guinea-Bissau"
},
{
    nom: "Guyana"
},
{
    nom: "Haiti"
},
{
    nom: "Heard Island and McDonald Islands"
},
{
    nom: "Holy See (Vatican City State)"
},
{
    nom: "Honduras"
},
{
    nom: "Hong Kong"
},
{
    nom: "Hungary"
},
{
    nom: "Iceland"
},
{
    nom: "India"
},
{
    nom: "Indonesia"
},
{
    nom: "Iran"
},
{
    nom: "Iraq"
},
{
    nom: "Ireland"
},
{
    nom: "Israel"
},
{
    nom: "Isle of Man"
},
{
    nom: "Italy"
},
{
    nom: "Jamaica"
},
{
    nom: "Japan"
},
{
    nom: "Jersey"
},
{
    nom: "Jordan"
},
{
    nom: "Kazakhstan"
},
{
    nom: "Kenya"
},
{
    nom: "Kiribati"
},
{
    nom: "Kuwait"
},
{
    nom: "Kyrgyzstan"
},
{
    nom: "Laos"
},
{
    nom: "Latvia"
},
{
    nom: "Lebanon"
},
{
    nom: "Lesotho"
},
{
    nom: "Liberia"
},
{
    nom: "Libyan Arab Jamahiriya"
},
{
    nom: "Liechtenstein"
},
{
    nom: "Lithuania"
},
{
    nom: "Luxembourg"
},
{
    nom: "Macao"
},
{
    nom: "North Macedonia"
},
{
    nom: "Madagascar"
},
{
    nom: "Malawi"
},
{
    nom: "Malaysia"
},
{
    nom: "Maldives"
},
{
    nom: "Mali"
},
{
    nom: "Malta"
},
{
    nom: "Marshall Islands"
},
{
    nom: "Martinique"
},
{
    nom: "Mauritania"
},
{
    nom: "Mauritius"
},
{
    nom: "Mayotte"
},
{
    nom: "Mexico"
},
{
    nom: "Micronesia, Federated States of"
},
{
    nom: "Moldova"
},
{
    nom: "Monaco"
},
{
    nom: "Mongolia"
},
{
    nom: "Montserrat"
},
{
    nom: "Montenegro"
},
{
    nom: "Morocco"
},
{
    nom: "Mozambique"
},
{
    nom: "Myanmar"
},
{
    nom: "Namibia"
},
{
    nom: "Nauru"
},
{
    nom: "Nepal"
},
{
    nom: "Netherlands"
},
{
    nom: "Netherlands Antilles"
},
{
    nom: "New Caledonia"
},
{
    nom: "New Zealand"
},
{
    nom: "Nicaragua"
},
{
    nom: "Niger"
},
{
    nom: "Nigeria"
},
{
    nom: "Niue"
},
{
    nom: "Norfolk Island"
},
{
    nom: "North Korea"
},
{
    nom: "Northern Ireland"
},
{
    nom: "Northern Mariana Islands"
},
{
    nom: "Norway"
},
{
    nom: "Oman"
},
{
    nom: "Pakistan"
},
{
    nom: "Palau"
},
{
    nom: "Palestine"
},
{
    nom: "Panama"
},
{
    nom: "Papua New Guinea"
},
{
    nom: "Paraguay"
},
{
    nom: "Peru"
},
{
    nom: "Philippines"
},
{
    nom: "Pitcairn"
},
{
    nom: "Poland"
},
{
    nom: "Portugal"
},
{
    nom: "Puerto Rico"
},
{
    nom: "Qatar"
},
{
    nom: "Reunion"
},
{
    nom: "Romania"
},
{
    nom: "Russia"
},
{
    nom: "Rwanda"
},
{
    nom: "Saint Helena"
},
{
    nom: "Saint Kitts and Nevis"
},
{
    nom: "Saint Lucia"
},
{
    nom: "Saint Pierre and Miquelon"
},
{
    nom: "Saint Vincent and the Grenadines"
},
{
    nom: "Samoa"
},
{
    nom: "San Marino"
},
{
    nom: "Sao Tome and Principe"
},
{
    nom: "Saudi Arabia"
},
{
    nom: "Scotland"
},
{
    nom: "Senegal"
},
{
    nom: "Serbia"
},
{
    nom: "Seychelles"
},
{
    nom: "Sierra Leone"
},
{
    nom: "Singapore"
},
{
    nom: "Slovakia"
},
{
    nom: "Slovenia"
},
{
    nom: "Solomon Islands"
},
{
    nom: "Somalia"
},
{
    nom: "South Africa"
},
{
    nom: "South Georgia and the South Sandwich Islands"
},
{
    nom: "South Korea"
},
{
    nom: "South Sudan"
},
{
    nom: "Spain"
},
{
    nom: "Sri Lanka"
},
{
    nom: "Sudan"
},
{
    nom: "Suriname"
},
{
    nom: "Svalbard and Jan Mayen"
},
{
    nom: "Swaziland"
},
{
    nom: "Sweden"
},
{
    nom: "Switzerland"
},
{
    nom: "Syria"
},
{
    nom: "Tajikistan"
},
{
    nom: "Tanzania"
},
{
    nom: "Thailand"
},
{
    nom: "Timor-Leste"
},
{
    nom: "Togo"
},
{
    nom: "Tokelau"
},
{
    nom: "Tonga"
},
{
    nom: "Trinidad and Tobago"
},
{
    nom: "Tunisia"
},
{
    nom: "Turkey"
},
{
    nom: "Turkmenistan"
},
{
    nom: "Turks and Caicos Islands"
},
{
    nom: "Tuvalu"
},
{
    nom: "Uganda"
},
{
    nom: "Ukraine"
},
{
    nom: "United Arab Emirates"
},
{
    nom: "United Kingdom"
},
{
    nom: "United States"
},
{
    nom: "United States Minor Outlying Islands"
},
{
    nom: "Uruguay"
},
{
    nom: "Uzbekistan"
},
{
    nom: "Vanuatu"
},
{
    nom: "Venezuela"
},
{
    nom: "Vietnam"
},
{
    nom: "Virgin Islands, British"
},
{
    nom: "Virgin Islands, U.S."
},
{
    nom: "Wales"
},
{
    nom: "Wallis and Futuna"
},
{
    nom: "Western Sahara"
},
{
    nom: "Yemen"
},
{
    nom: "Zambia"
},
{
    nom: "Zimbabwe"
}
 ]

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
