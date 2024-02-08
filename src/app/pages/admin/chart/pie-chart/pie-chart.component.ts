import { Component } from '@angular/core';
import { ChartBaseComponent } from '../../chart-base/chart-base.component';
import { ChartService } from 'src/app/services/chart/chart.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent extends ChartBaseComponent{

  public constructor(public override service: ChartService) {
    super(service);
  }

  override createChart(labeldata: any, realdata: any, colordata: any) {
    this.chart = new Chart('MyChart', {
      type: 'pie', //this denotes tha type of chart
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'No of sales',
            data: realdata,
            backgroundColor: colordata,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2,
      },
    });
  }

}
