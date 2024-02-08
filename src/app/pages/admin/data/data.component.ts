import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';
type AOA = any[][];
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {

  uploadedFiles: any[] = [];
  data: AOA = [[1, 2], [3, 4]];
  first = 0;
   view : boolean = false;

  rows = 10;
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
    constructor(private messageService: MessageService) {}

    onUpload(event:any) {
    
      const target: DataTransfer = <DataTransfer>(event.target);
      if (target.files.length !== 1) throw new Error('Cannot use multiple files');
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
      
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
  
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  
        this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
        this.view = true;
        console.log(this.data);
      };
      reader.readAsBinaryString(target.files[0]);

        this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    }


  reset() {
      this.first = 0;
  }

  pageChange(event:any) {
      this.first = event.first;
      this.rows = event.rows;
  }

  isLastPage(): boolean {
      return this.data ? this.first === this.data.length - this.rows : true;
  }

  isFirstPage(): boolean {
      return this.data ? this.first === 0 : true;
  }

}
