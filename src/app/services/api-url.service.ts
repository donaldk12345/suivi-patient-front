import { Injectable } from '@angular/core';
import { environment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlService {

  API_URI:any;

  mode:any;

 constructor() {

   this.mode = sessionStorage.getItem('mode');

   console.log("mode ",this.mode);


   if(environment.production){

     this.API_URI = this.mode!=null?this.mode:`${environment.PROD_BASE_URL}`;
   }else{
      this.API_URI = this.mode!=null?this.mode:`${environment.DEV_BASE_URL}`;
     
   }

   console.log("api details",this.API_URI);

    return this.API_URI;
  
  }

}
