import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentData } from 'src/app/models/agent-data.model';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';
import { ApiUrlService } from '../api-url.service';
@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private http: HttpClient,private api:ApiUrlService) {

   }

   uploadFileData(file: File,consultationId:any): Observable<AgentData> {


    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('consultationId',consultationId)
    return this.http.post<AgentData>(this.api.API_URI + url.file_patient_import, formData);
  }
}
