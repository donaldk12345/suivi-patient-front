import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ResponseService } from 'src/app/services/response.service';
import { dA } from '@fullcalendar/core/internal-common';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';
import { ApiUrlService } from 'src/app/services/api-url.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit{





sendEmail() {
throw new Error('Method not implemented.');
}


  downloadbtn: boolean = false;
  mailbtn: boolean = false;
  displayFilter: boolean=false;
  selectElement: any;
  maSelection: any[] = [];
  types: any[]=[];
  reports: any[]=[];
  recip:any[]=[];
  loading = false;
  exportColumns: any[] = [];
  cols: any[] = [];
  httpData: any;
  pdfURL: any;
  filterForm: FormGroup = Object.create(null);
  sendFileForm: FormGroup = Object.create(null);
  pdfSrc:any;
  previewbtn:boolean =false;
  pdfDialog:boolean = false;
  typefile:any;
  isrefresh: boolean=false;
  ids: any[]=[];
  myRecip:any[]=[];
  conctactOk: any[]=[];
  deletebtn: boolean = false;
  groupfile:any;
  displaySendFiles:boolean =false;
  mesIds: any[]=[];
  sharebtn: boolean = false;
  isView: boolean=false;
ngOnInit(): void {

  this.filterForm = new FormGroup({
    'reportType': new FormControl(''),
    'code': new FormControl(''),
  });

  this.sendFileForm = new FormGroup({
    'object': new FormControl('',[Validators.required]),
    'recipient': new FormControl([],[Validators.required]),
    'ids': new FormControl([],[Validators.required])
  });

 
  this.cols = [
    {field: 'name', header: 'Nom', type: 'string', width: 200, isFroz: true},
    {field: 'code', header: 'Code', type: 'string', width: 200, isFroz: false},
    {field: 'reportType', header: 'Type', type: 'string', width: 200, isFroz: false},
    {field: 'nomEtablissement', header: 'Etablissement', type: 'string', width: 200, isFroz: false},
    {field: 'createdAt', header: 'Créer le', type: 'date', width: 200, isFroz: false}

  ];
  this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));

  this.getReport();
}


onRowSelect(dat: any): void {



this.selectElement = dat;
this.maSelection = dat;

  this.manageDownloadBtn();
  this.manageSendMailBtn();
  this.managePreviewBtn();
  this.manageShareBtn();



}

constructor(private ht:HttpClient,private api:ApiUrlService,private confirmationService: ConfirmationService, private http: ResponseService, private formBuilder: FormBuilder, private messageService: MessageService){

}
onRowUnselect(dat: any) {

}
getData(dat : any) : void {



}

hidePdf(){
  this.pdfDialog= false;
}

showSendDialog(){

  this.displaySendFiles = true;
}
showFilterDialog() {
  this.displayFilter = true;

  this.reportType();
  }
manageDownloadBtn(){
  if(this.selectElement.length == 0 || this.selectElement.length > 1){
    this.downloadbtn = false;
  } else {
    this.downloadbtn = true;
  }
 }

 managePreviewBtn(){
  if(this.selectElement.length == 0){
    this.previewbtn = false;
  }
  else {
    
    this.previewbtn = true;
    
  }
 }
 manageSendMailBtn(){
  if(this.selectElement.length == 0 || this.selectElement.length > 1){
    this.mailbtn = false;
  } else {
    this.mailbtn = true;
  }
 }


 
 manageShareBtn(){
  if(this.selectElement.length == 0){
       this.sharebtn = false;
       }else if(this.selectElement.length >= 1){
         this.sharebtn = true;
          
         for(var i=0; i<this.selectElement.length; i++){
            this.ids.push(this.selectElement[i].id);
         }

         const noDuplicates = this.ids.reduce(
           (accumulator, value) =>
             accumulator.includes(value) ? accumulator : [...accumulator, value],
           []
         );

         this.mesIds = noDuplicates;

         console.log("ids",this.mesIds);

       }   
       else {
      this.sharebtn = true;
       }
   }


 
 getReport(){
  this.http.getElement(this.api.API_URI + url.report_prescription_list).subscribe({
    next: data => {
      if (data) {
        console.log("Mes report ", data.content);
        this.reports = data;
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


  getReportFilterList(){

    let parmasReportTypevalue = new HttpParams;
    let parmasReportTypeIvalue = new HttpParams;
    let parmasReportCodevalue = new HttpParams;
    let reportType=this.filterForm.get('reportType')?.value;
    let code=this.filterForm.get('code')?.value;

    parmasReportTypevalue = parmasReportTypevalue.append('reportType',reportType).append('code',code);
    parmasReportTypeIvalue = parmasReportTypeIvalue.append('reportType',reportType);
    parmasReportCodevalue = parmasReportCodevalue.append('code',code);

    this.isrefresh=true;
    if(reportType!=null  && code!=null){

      console.log("1");
      
      this.http.getElementParams(this.api.API_URI + "prescription/report/list",{params:parmasReportTypevalue}).subscribe({
        next: data => {
            this.reports = data;

            console.log("data filter",data);
            this.hideDialog();
            this.filterForm.reset();
           
        },
        error: error => {
         
        }
    })
    }else if(reportType!=null && code==null){

      console.log("2");
            
      this.http.getElementParams(this.api.API_URI + "prescription/report/list",{params:parmasReportTypeIvalue}).subscribe({
        next: data => {
            this.reports = data;

            console.log("data filter",data);
            this.hideDialog();
            this.filterForm.reset();
           
        },
        error: error => {
          
            
        }
    })


    }else if(code!=null && reportType==null){

      
      console.log("3");
      this.http.getElementParams(this.api.API_URI + "prescription/report/list",{params:parmasReportCodevalue}).subscribe({
        next: data => {
            this.reports = data;

            console.log("data filter",data);
            this.hideDialog();
            this.filterForm.reset();
           
        },
        error: error => {
          
        }
    })

  }
  }

downloadReport() {

  this.http.getElement(this.api.API_URI + url.report_download + this.selectElement[0].id).subscribe({
    next: data => {
      if (data) {

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


downloadFile(){

  this.ht.get(this.api.API_URI + "report/preview" + "/" + this.selectElement[0].id,{ responseType: "blob" }).subscribe({

    next: data => {
      if (data) {
        console.log(" data ", data);
        var fileName = this.selectElement[0].name; 
        var result = fileName.split(".").pop(); 
        let d = new Date();
        var date = d.getDate();
        var month = d.getMonth(); //Be careful! January is 0 not 1
        var year = d.getFullYear();
        var HMS = d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds();
        var dateString = date + "-" +(month + 1) + "-" + year;
       
     if(result=="pdf"){

          const filename =  fileName ;
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


getPdf(){

  this.pdfDialog = true;

  this.previewFile();

}



reportType() {
  this.types = [
    { nom: 'Prescription', 'id': 1 },
    { nom :  'Facturation', 'id':2},
    { nom: 'Consultation', 'id': 3 }
   ]
}

previewFile(){
  let id = this.selectElement[0].id;
  this.isView =true;
  this.ht.get(this.api.API_URI+ "report/preview" + "/" + id , { responseType: "blob" }).subscribe(data => {
      this.isView =false;
      this.httpData = data;
      var file = new Blob([data], { type: "application/pdf" });
      this.pdfSrc = URL.createObjectURL(file);
      console.log("data => ", this.httpData);
      console.log(" file url => ", this.pdfSrc);
    

  });

}

confirmDelete() {
  
  if (this.selectElement && this.selectElement.length > 0) {

    console.log("Suppression des éléments");

    this.confirmationService.confirm({
      message: 'Voulez vous supprimer le  fichier ?',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Oui',
      rejectLabel: 'Nom',
      acceptButtonStyleClass: "p-button-info",
      rejectButtonStyleClass: "p-button-danger",
      accept: () => {
        this.deleteFile()
      }
    });

  }
}


deleteFile() {
let id = this.selectElement[0].id;

this.http.deleteElement(this.api.API_URI + "fileData/delete/" + id).subscribe({

  next: data =>{

    this.messageService.add({
      severity: 'success',
      summary: 'success',
      detail:"Fichier supprimer avec succés",
      life: 3000
    });

    this.hideDialog();

  },
  error: error => {
    console.log('error!', error);

    this.messageService.add({
      severity: 'error',
      summary: error,
      detail: error,
      life: 3000
    });
}
})

}
  hideDialog() {
    this.displayFilter = false;
    this.filterForm.reset();
   this.displaySendFiles = false;
   this.sendFileForm.reset();
  }

  refresh(){
    this.isrefresh = false;
    this.getReport();
    this.filterForm.reset();
  }


  
  sendFilesEmail(){

    /*const arr = this.text.pipe(
      map((text) => {
        const vals = text.length ? text.trim().split('\n') : []
        return vals
      }),
    );*/


    //console.log("list",arr);


  
     const ro = this.sendFileForm.value.recipient
     this.recip.push(ro);
     this.recip.map((val)=>{
         const vals = val.length ? val.trim().split('\n'): "";
         this.myRecip = vals;
         console.log("val ok",vals);
     })
     //console.log("recipient",this.recip);

   console.log("recip",this.conctactOk);
         
        if(this.conctactOk.length>0){

          let addRequest= {
            object :this.sendFileForm.value.object,
            recipient: this.conctactOk,
            ids: this.mesIds
          };

          console.log("request",addRequest);

          this.loading = true;
      
         this.http.postElement(this.api.API_URI + "file/report/send",addRequest).subscribe({
      
            next: data =>{
              this.loading = true;
              this.messageService.add({
                severity: 'success',
                summary: 'success',
                detail:"Fichier (s) envoyé (s) avec succés",
                life: 3000
              });
              
              this.hideDialog();
      
            },
            error: error => {
              this.loading = false;
              console.log('error!', error);
      
              this.messageService.add({
                severity: 'error',
                summary: error,
                detail: error,
                life: 3000
              });
          }
          })
      
        }else if(this.myRecip.length>0){

          let addRequest= {
            object :this.sendFileForm.value.object,
            recipient: this.myRecip,
            ids: this.mesIds
          };

          console.log("request",addRequest);

          this.loading = true;
      
         this.http.postElement(this.api.API_URI + "file/report/send",addRequest).subscribe({
      
            next: data =>{
              this.loading = true;
              this.messageService.add({
                severity: 'success',
                summary: 'success',
                detail:"Fichier (s) envoyé (s) avec succés",
                life: 3000
              });
              
              this.hideDialog();
      
            },
            error: error => {
              this.loading = false;
              console.log('error!', error);
      
              this.messageService.add({
                severity: 'error',
                summary: error,
                detail: error,
                life: 3000
              });
          }
          })


        }else{
         
        }

   

  }

  get object(){
    return this.sendFileForm.controls['object'];
  }
  get recipient(){
    return this.sendFileForm.controls['recipient'];
  }

}
