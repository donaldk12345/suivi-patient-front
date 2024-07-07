import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ResponseService } from 'src/app/services/response.service';
import { dA } from '@fullcalendar/core/internal-common';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';
const API_URI= `${environment.BASE_URL}`
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
  selectElement: any;
  maSelection: any[] = [];
  reports: any[]=[];
  loading = true;
  exportColumns: any[] = [];
  cols: any[] = [];
ngOnInit(): void {
 
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



}

constructor(private confirmationService: ConfirmationService, private http: ResponseService, private formBuilder: FormBuilder, private messageService: MessageService){

}
onRowUnselect(dat: any) {

}
getData(dat : any) : void {



}

manageDownloadBtn(){
  if(this.selectElement.length == 0 || this.selectElement.length > 1){
    this.downloadbtn = false;
  } else {
    this.downloadbtn = true;
  }
 }

 manageSendMailBtn(){
  if(this.selectElement.length == 0 || this.selectElement.length > 1){
    this.mailbtn = false;
  } else {
    this.mailbtn = true;
  }
 }


 
 getReport(){
  this.http.getElement(API_URI + url.report_prescription_list).subscribe({
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

downloadReport() {

  this.http.getElement(API_URI + url.report_download + this.selectElement[0].id).subscribe({
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

}
