import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { series } from './data';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ResponseService } from 'src/app/services/response.service';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';
import { TokenService } from 'src/app/services/token.service';
import { ApiUrlService } from 'src/app/services/api-url.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from 'src/app/services/authentication.service';
Chart.register(...registerables);
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  //@ViewChild('chart') chart: ChartComponent | undefined;
  @ViewChild('MyChart') canvas: ElementRef | undefined;
  
   chart: any 
   public chart1: any;
   public chart2: any;
   public chart3: any;
   public chart4:any;
   public chart5:any;
  items: any;
  user: any;
  stats: any;
  elt:any;
  loading:boolean =false;
  role: any;
  username: any;
  isrefresh:boolean =false;
  Ploading:boolean = true;
  Rloading:boolean = true;
  stats1: any;
  stats2:any;
  stats3:any;
  stats4:any;
  stats5:any;
  cureent: any;
  private labeldata: any[] = [];
  private realdata: any[] = [];
  private labeldata1: any[] = [];
  private realdata1: any[] = [];
  private labeldata2: any[] = [];
  private labeldata3: any[] = [];
  private realdata2: any[] = [];
  private realdata3: any[] = [];
  private colordata: any[] = [];
  private colordata1: any[] = [];
  private colordata2: any[] = [];
  private colordata3: any[] = [];
  private colordata4:any[]=[];
  private realdata4:any[]=[];
  private labeldata4:any[]=[];
  verify: boolean;
  loading1:boolean =false;
  loading2:boolean =false;
  loading3:boolean =false;
  loading4:boolean =false;
  loading5:boolean=false;
  etablissement: any[]=[];
  patient: any[]=[];
  rendesvous: any[]=[];

  constructor(private ht:HttpClient,private authService:AuthenticationService,private api:ApiUrlService,private http: ResponseService, private router: Router,private messageService: MessageService,private tokenService: TokenService) {

    this.verify = this.authService.isLoggedIn();
  }

  colors =[ "#A5D152","#723E64","#E1CE9A","#926D27","#985717",
    "#FCD21C","#CCCCFF","#9683EC","#CECECE","#BF3030",
    "#462E01","#CDCD0D","#4E63CE","#8B6C42","#370028",
    "#F0E36B","#88421D","#77B5FE","#2E006C","#AE4A34"
  ]
  
  Randoom(taille: number): number {
    let tr: number = 0;
    if (taille != null && taille > 0) {
      tr = Math.floor(Math.random() * taille)
    }
    return tr;
  }


  ngOnInit(): void {

    

    console.log("le monde");
     
    console.log("token",this.tokenService.DecodeToken(JSON.stringify(this.http.sessionget('token'))));

    this.user = this.tokenService.DecodeToken(JSON.stringify(this.http.sessionget('token')));
    this.username=this.http.sessionget('username');
    this.getStatsItems();
    this.getStatsChart();
    this.getStatsChart2();
    this.getStatsChart4();
    this.getStatsChart5();
    this.getEtablissement();
    this.getPatient();
    this.getRendezvous();

  }



  getEtablissement(){
     


    this.http.getElement(this.api.API_URI + "etablissement/list").subscribe({
      next: data => {
          this.etablissement = data.content;
          
      },
      error: error => {
        
          console.error('There was an error!', error);
      }
  })
  }


  changeMode(val: any) {

    this.isrefresh = true;
   
    const selectEl = val.target.value;
    this.elt = val.target.value;
    console.log(" Value", selectEl);
     
    this.getStatsItems();
    this.stats=[]=[];
     this.realdata = []=[];
     this.labeldata =[]=[];
    this.getStatsChart();
    this.labeldata1=[] = [];
    this.realdata1=[] = [];
    this.getStatsChart2();
    this.labeldata2=[] = [];
    this.realdata2=[] = [];
    this.labeldata3=[] = [];
    this.realdata3=[] = [];
    this.getStatsChart4();
    this.labeldata4=[] = [];
    this.realdata4=[] = [];
    this.getStatsChart5();

    }

    refresh(){

      this.isrefresh = false;
      window.location.reload();

    }

  getStatsItems(){

    let parmasvalue = new HttpParams;

    parmasvalue =parmasvalue.append('etablissementId',this.elt);

     if(this.elt!=null){
      
      this.loading = true;
       
    this.http.getElementParams(this.api.API_URI + "dashboard/items",{params:parmasvalue}).subscribe({
      next: data => {
        if (data) {
         this.loading = false;
          this.stats= data;
          console.log("stats items", this.stats);
        } else {
          
        }
      }
    })
     }else{

       this.loading =true;
    this.http.getElement(this.api.API_URI + "dashboard/items").subscribe({
      next: data => {
        if (data) {
          this.loading = false;
          this.stats= data;
          console.log("stats 2", this.stats);
       
        } else {
          
        }
      }
    })
     }
  }



  getStatsChart(){

    let parmasvalue = new HttpParams;

    parmasvalue =parmasvalue.append('etablissementId',this.elt);

     if(this.elt!=null){

      console.log('elt',this.elt);

       this.loading1 = true;
       this.http.getElementParams(this.api.API_URI + "dashboard/items/consultation",{params:parmasvalue}).subscribe({
       next: data => {
        if (data) {
       
          this.stats1= data;
          console.log("stats chart params ", this.stats1);
            this.loading1 = false;

          if(this.stats1!=null){
            this.stats1.forEach((element:any) => {
        

             console.log("element",element);
        
              this.labeldata.push(element['date']);
              this.realdata.push(element['consultationSize']);
              this.colordata.push(this.colors[this.Randoom(this.colors.length)]);
    
              for(let i = 0; i<= this.labeldata.length; i++){
    
                 let date = new Date();
                 const pipe = new DatePipe('fr-FR')
              
              //console.log("date move", pipe.transform(this.labeldata[i]));
    
              }
              
            });

            this.chart.destroy();

            this.chart = new Chart("MyChart", {
              type: 'line', //this denotes tha type of chart
        
              data: {// values on X-Axis
                labels:this.labeldata, 
                 datasets: [
                  {
                    label: "consultation",
                    data: this.realdata,
                    backgroundColor: this.colordata
                  }
                
                ]
              },
              options: {
                aspectRatio:2.5
              }
              
            });
            //this.chart.destroy();
          }
        } else {
          
        }
      }
    })
     }else{
   
      this.loading1 = true;
       
    this.http.getElement(this.api.API_URI + "dashboard/items/consultation").subscribe({
      next: data => {
        if (data) {
       
          this.stats1= data;
          this.loading1 = false;
          console.log("stats 1",this.stats1);
          if(this.stats1!=null){
            this.stats1.forEach((element:any) => {

        
              const pipe = new DatePipe('fr-FR')
              this.labeldata.push(element['date']);
              this.realdata.push(element['consultationSize']);
              this.colordata.push(this.colors[this.Randoom(this.colors.length)])
    
              for(let i = 0; i<= this.labeldata.length; i++){
    
                 let date = new Date();
                 const pipe = new DatePipe('fr-FR')
              
              //console.log("date move", pipe.transform(this.labeldata[i]));
    
              }
              
            });

            this.chart = new Chart("MyChart", {
              type: 'line', //this denotes tha type of chart
        
              data: {// values on X-Axis
                labels:this.labeldata, 
                 datasets: [
                  {
                    label: "consultation",
                    data: this.realdata,
                    backgroundColor: this.colordata
                  }
                
                ]
              },
              options: {
                aspectRatio:2.5
              }
              
            });

            //this.chart.destroy();
          }
       
        } else {
          
        }
      }
    })
     }


  }


  getStatsChart2(){

    let parmasvalue = new HttpParams;

    parmasvalue =parmasvalue.append('etablissementId',this.elt);

     if(this.elt!=null){

      console.log('elt 2',this.elt);

       this.loading2= true;
       this.http.getElementParams(this.api.API_URI + "dashboard/items/consultation/etab",{params:parmasvalue}).subscribe({
       next: data => {
        if (data) {
       
          this.stats2= data;
          console.log("stats chart params 2 ", this.stats2);
    
           this.loading2 = false;
          if(this.stats2!=null){
            this.stats2.forEach((element:any) => {
        

             console.log("element",element);
        
              this.labeldata1.push(element['nomEtablissement']);
              this.realdata1.push(element['consultationSize']);
              this.colordata1.push(this.colors[this.Randoom(this.colors.length)]);
    
              for(let i = 0; i<= this.labeldata1.length; i++){
    
                 let date = new Date();
                 const pipe = new DatePipe('fr-FR')
              
              //console.log("date move", pipe.transform(this.labeldata[i]));
    
              }
              
            });

            this.chart1.destroy();

            this.chart1 = new Chart("MyChart1", {
              type: 'pie', //this denotes tha type of chart
        
              data: {// values on X-Axis
                labels:this.labeldata1, 
                 datasets: [
                  {
                    label: "consultation",
                    data: this.realdata1,
                    backgroundColor: this.colordata1
                  }
                
                ]
              },
              options: {
                aspectRatio:2.5
              }
              
            });
            //this.chart.destroy();
          }
        } else {
          
        }
      }
    })
     }else{

       this.loading2 = true;
    this.http.getElement(this.api.API_URI + "dashboard/items/consultation/etab").subscribe({
      next: data => {
        if (data) {
       
          this.stats2= data;
          this.loading2 = false;
          if(this.stats2!=null){
            this.stats2.forEach((element:any) => {

        
              const pipe = new DatePipe('fr-FR')
              this.labeldata1.push(element['nomEtablissement']);
              this.realdata1.push(element['consultationSize']);
              this.colordata1.push(this.colors[this.Randoom(this.colors.length)])
    
              for(let i = 0; i<= this.labeldata1.length; i++){
    
                 let date = new Date();
                 const pipe = new DatePipe('fr-FR')
              
              //console.log("date move", pipe.transform(this.labeldata[i]));
    
              }
              
            });

            this.chart1 = new Chart("MyChart1", {
              type: 'pie', //this denotes tha type of chart
        
              data: {// values on X-Axis
                labels:this.labeldata1, 
                 datasets: [
                  {
                    label: "consultation",
                    data: this.realdata1,
                    backgroundColor: this.colordata1
                  }
                
                ]
              },
              options: {
                aspectRatio:2.5
              }
              
            });

            //this.chart.destroy();
          }
       
        } else {
          
        }
      }
    })
     }


  }

  getStatsChart4(){

    let parmasvalue = new HttpParams;

    parmasvalue =parmasvalue.append('etablissementId',this.elt);

     if(this.elt!=null){

      console.log('elt 2',this.elt);

        this.loading4 = true;
       this.http.getElementParams(this.api.API_URI + "dashboard/items/rendezvous",{params:parmasvalue}).subscribe({
       next: data => {
        if (data) {
          this.loading4 = false;
          this.stats4= data;
          console.log("stats  4 ", this.stats4);
    

          if(this.stats4!=null){
            this.stats4.forEach((element:any) => {
        

             console.log("element 4",element);
        
              this.labeldata3.push(element['date']);
              this.realdata3.push(element['rendezVousSize']);
              this.colordata3.push(this.colors[this.Randoom(this.colors.length)]);
    
              for(let i = 0; i<= this.labeldata3.length; i++){
    
                 let date = new Date();
                 const pipe = new DatePipe('fr-FR')
              
              //console.log("date move", pipe.transform(this.labeldata[i]));
    
              }
              
            });

            this.chart3.destroy();

            this.chart3 = new Chart("MyChart3", {
              type: 'bar', //this denotes tha type of chart
        
              data: {// values on X-Axis
                labels:this.labeldata3, 
                 datasets: [
                  {
                    label: "rendez-vous",
                    data: this.realdata3,
                    backgroundColor: this.colordata3
                  }
                
                ]
              },
              options: {
                aspectRatio:2.5
              }
              
            });
            //this.chart.destroy();
          }
        } else {
          
        }
      }
    })
     }else{

    this.loading4 =true; 
    this.http.getElement(this.api.API_URI + "dashboard/items/rendezvous").subscribe({
      next: data => {
        if (data) {
       
          this.stats4= data;
          console.log("stats  4 ", this.stats4);
          this.loading4 =false;
          if(this.stats4!=null){
            this.stats4.forEach((element:any) => {

        
              const pipe = new DatePipe('fr-FR')
              this.labeldata3.push(element['date']);
              this.realdata3.push(element['rendezVousSize']);
              this.colordata3.push(this.colors[this.Randoom(this.colors.length)])
    
              for(let i = 0; i<= this.labeldata3.length; i++){
    
                 let date = new Date();
                 const pipe = new DatePipe('fr-FR')
              
              //console.log("date move", pipe.transform(this.labeldata[i]));
    
              }
              
            });

            this.chart3 = new Chart("MyChart3", {
              type: 'bar', //this denotes tha type of chart
        
              data: {// values on X-Axis
                labels:this.labeldata3, 
                 datasets: [
                  {
                    label: "rendez-vous",
                    data: this.realdata3,
                    backgroundColor: this.colordata3
                  }
                
                ]
              },
              options: {
                aspectRatio:2.5
              }
              
            });

            //this.chart.destroy();
          }
       
        } else {
          
        }
      }
    })
     }


  }

  getStatsChart5(){

    let parmasvalue = new HttpParams;

    parmasvalue =parmasvalue.append('etablissementId',this.elt);

     if(this.elt!=null){

      console.log('elt 2',this.elt);

        this.loading5 = true;
       this.http.getElementParams(this.api.API_URI + "dashboard/items/caisse",{params:parmasvalue}).subscribe({
       next: data => {
        if (data) {
          this.loading5 = false;
          this.stats5= data;
          console.log("stats  5 ", this.stats5);
    

          if(this.stats5!=null){
            this.stats5.forEach((element:any) => {
        

             console.log("element 5",element);
        
              this.labeldata4.push(element['date']);
              this.realdata4.push(element['caisseSize']);
              this.colordata4.push(this.colors[this.Randoom(this.colors.length)]);
    
              for(let i = 0; i<= this.labeldata4.length; i++){
    
                 let date = new Date();
                 const pipe = new DatePipe('fr-FR')
              
              //console.log("date move", pipe.transform(this.labeldata[i]));
    
              }
              
            });

            this.chart4.destroy();

            this.chart4 = new Chart("MyChart4", {
              type: 'bar', //this denotes tha type of chart
        
              data: {// values on X-Axis
                labels:this.labeldata4, 
                 datasets: [
                  {
                    label: "caisse",
                    data: this.realdata4,
                    backgroundColor: this.colordata4
                  }
                
                ]
              },
              options: {
                aspectRatio:2.5
              }
              
            });
            //this.chart.destroy();
          }
        } else {
          
        }
      }
    })
     }else{

    this.loading5 =true; 
    this.http.getElement(this.api.API_URI + "dashboard/items/caisse").subscribe({
      next: data => {
        if (data) {
       
          this.stats5= data;
          console.log("stats  5 ", this.stats5);
          this.loading5 =false;
          if(this.stats5!=null){
            this.stats5.forEach((element:any) => {

        
              const pipe = new DatePipe('fr-FR')
              this.labeldata4.push(element['date']);
              this.realdata4.push(element['caisseSize']);
              this.colordata4.push(this.colors[this.Randoom(this.colors.length)])
    
              for(let i = 0; i<= this.labeldata4.length; i++){
    
                 let date = new Date();
                 const pipe = new DatePipe('fr-FR')
              
              //console.log("date move", pipe.transform(this.labeldata[i]));
    
              }
              
            });

            this.chart4 = new Chart("MyChart4", {
              type: 'bar', //this denotes tha type of chart
        
              data: {// values on X-Axis
                labels:this.labeldata4, 
                 datasets: [
                  {
                    label: "caisse",
                    data: this.realdata4,
                    backgroundColor: this.colordata4
                  }
                
                ]
              },
              options: {
                aspectRatio:2.5
              }
              
            });

            //this.chart.destroy();
          }
       
        } else {
          
        }
      }
    })
     }


  }

  downloadPatientFile(){

    this.ht.get(this.api.API_URI + "dashboard/download/patient",{ responseType: "blob" }).subscribe({

      next: data => {
        if (data) {
          console.log(" data ", data);
          let d = new Date();
          var date = d.getDate();
          var month = d.getMonth(); //Be careful! January is 0 not 1
          var year = d.getFullYear();
          var HMS = d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds();
          var dateString = date + "-" +(month + 1) + "-" + year;
          const filename =  "patient" + "-" + dateString + "_"+ HMS + ".xlsx";
          var a = document.createElement("a");
          a.href = URL.createObjectURL(data);
               a.setAttribute("download", filename);
          a.click(); 
           
  
        }
      }
  
    })


      
  
  }


  getRendezvous(){
    this.http.getElement(this.api.API_URI + url.rendezvous).subscribe({
      next: data => {
        if (data) {
          console.log("Mes rendez vous ", data.content);
          this.rendesvous = data.content;
          this.Rloading = false;

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
  

  downloadRendevousFile(){

    this.ht.get(this.api.API_URI + "dashboard/download/rendezvous",{ responseType: "blob" }).subscribe({

      next: data => {
        if (data) {
          console.log(" data ", data);
          let d = new Date();
          var date = d.getDate();
          var month = d.getMonth(); //Be careful! January is 0 not 1
          var year = d.getFullYear();
          var HMS = d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds();
          var dateString = date + "-" +(month + 1) + "-" + year;
          const filename =  "rendez-vous" + "-" + dateString + "_"+ HMS + ".xlsx";
          var a = document.createElement("a");
          a.href = URL.createObjectURL(data);
               a.setAttribute("download", filename);
          a.click(); 
           
  
        }
      }
  
    })


      
  
  }


  
  getPatient(){
    this.http.getElement(this.api.API_URI + url.patient).subscribe({
      next: data => {
        if (data) {
          console.log("Mes patient ", data.content);
          this.patient = data.content;
          this.Ploading = false;

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
