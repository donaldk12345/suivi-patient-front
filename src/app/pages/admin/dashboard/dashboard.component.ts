import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { series } from './data';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ResponseService } from 'src/app/services/response.service';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';
import { TokenService } from 'src/app/services/token.service';
Chart.register(...registerables);
const API_URI= `${environment.BASE_URL}`
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  //@ViewChild('chart') chart: ChartComponent | undefined;
  @ViewChild('MyChart') canvas: ElementRef | undefined;
  
   chart: any 
  items: any;
  user: any;
  role: any;

  constructor(private http: ResponseService, private router: Router,private messageService: MessageService,private tokenService: TokenService) {


  }


  ngOnInit(): void {

    

    console.log("le monde");
     
    console.log("token",this.tokenService.DecodeToken(JSON.stringify(this.http.sessionget('token'))));

    this.user = this.tokenService.DecodeToken(JSON.stringify(this.http.sessionget('token')));

    this.loadData();
    this.totalItems();

  }


  colors = ["#A5D152", "#723E64", "#E1CE9A", "#926D27", "#985717",
  "#FCD21C", "#CCCCFF", "#9683EC", "#CECECE", "#BF3030",
  "#462E01", "#CDCD0D", "#4E63CE", "#8B6C42", "#370028",
  "#F0E36B", "#88421D", "#77B5FE", "#2E006C", "#AE4A34"
]


Randoom(taille: number): number {
  let tr: number = 0;
  if (taille != null && taille > 0) {
    tr = Math.floor(Math.random() * taille)
  }
  return tr;
}

 loadData(){

  let i = 1;
  console.log(i);
 }

 createChart(){

  this.chart = new Chart("MyChart", {
    type: 'bar', //this denotes tha type of chart

    data: {// values on X-Axis
      labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
               '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ],
       datasets: [
        {
          label: "Sales",
          data: ['467','576', '572', '79', '92',
               '574', '573', '576'],
          backgroundColor: 'blue'
        },
        {
          label: "Profit",
          data: ['542', '542', '536', '327', '17',
                 '0.00', '538', '541'],
          backgroundColor: 'limegreen'
        }
      ]
    },
    options: {
      aspectRatio:2.5
    }

  });
}
  columnChartOptions = {
    animationEnabled: true,
    title: {
      text: 'Suivi 1',
    },
    data: [
      {
        // Change type to "doughnut", "line", "splineArea", etc.
        type: 'column',
        dataPoints: [
          { label: 'apple', y: 10 },
          { label: 'orange', y: 15 },
          { label: 'banana', y: 25 },
          { label: 'mango', y: 30 },
          { label: 'grape', y: 28 },
          { label: 'ope', y: 31 },
          { label: 'lorem', y: 12 },
          { label: 'dat', y: 13 },
          { label: 'man', y: 7 },
          { label: 'gap', y: 3 },
        ],
      },
    ],
  };

  pieChartOptions = {
    animationEnabled: true,
    title: {
      text: 'Suivi 2',
    },
    theme: 'light2', // "light1", "dark1", "dark2"
    data: [
      {
        type: 'pie',
        dataPoints: [
          { label: 'apple', y: 10 },
          { label: 'orange', y: 15 },
          { label: 'banana', y: 25 },
          { label: 'mango', y: 30 },
          { label: 'grape', y: 28 },
          { label: 'ope', y: 31 },
          { label: 'lorem', y: 12 },
          { label: 'dat', y: 13 },
          { label: 'man', y: 7 },
          { label: 'gap', y: 3 },
        ],
      },
    ],
  };

  lineChartOptions = {
    animationEnabled: true,
    title: {
      text: 'Suivi 3',
    },
    theme: 'light2', // "light1", "dark1", "dark2"
    data: [
      {
        type: 'area',
        dataPoints: [
          { label: 'apple', y: 10 },
          { label: 'orange', y: 15 },
          { label: 'banana', y: 25 },
          { label: 'mango', y: 30 },
          { label: 'grape', y: 28 },
          { label: 'ope', y: 31 },
          { label: 'lorem', y: 12 },
          { label: 'dat', y: 13 },
          { label: 'man', y: 7 },
          { label: 'gap', y: 3 },
        ],
      },
    ],
  };


  totalItems(){
    this.http.getElement(API_URI + url.dashboardItems).subscribe({
      next: data => {
        if (data) {
       
          this.items= data;
          console.log("me ", data);
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

  

  onUpdateChange(event:any){

      console.log("event",event.target.value);
  }

 
}
