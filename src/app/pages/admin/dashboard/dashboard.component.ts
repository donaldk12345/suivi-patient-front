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
import { HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
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
  items: any;
  user: any;
  stats: any;
  elt:any;
  loading:boolean =false;
  role: any;
  username: any;

  stats1: any;
  stats2:any;
  stats3:any;
  stats4:any;
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

  loading1:boolean =false;
  loading2:boolean =false;
  loading3:boolean =false;
  loading4:boolean =false;

  constructor(private api:ApiUrlService,private http: ResponseService, private router: Router,private messageService: MessageService,private tokenService: TokenService) {


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

  }



  getStatsItems(){

    let parmasvalue = new HttpParams;

    parmasvalue =parmasvalue.append('entrepriseId',this.elt);

     if(this.elt!=null){
      
      this.loading = true;
       
    this.http.getElementParams(this.api.API_URI + "dashboard/items",{params:parmasvalue}).subscribe({
      next: data => {
        if (data) {
         this.loading = false;
          this.stats= data;
          console.log("stats", this.stats);
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
              this.realdata3.push(element['nom']);
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
              this.realdata3.push(element['nom']);
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




 
}
