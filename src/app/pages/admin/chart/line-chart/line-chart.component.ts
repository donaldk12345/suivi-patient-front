import { Component } from '@angular/core';
import { ChartBaseComponent } from '../../chart-base/chart-base.component';
import { ChartService } from 'src/app/services/chart/chart.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent extends ChartBaseComponent{
  public constructor(public override service: ChartService) {
    super(service);
  }

  override createChart(labeldata: any, realdata: any, colordata: any) {
    this.chart = new Chart('MyChart', {
      type: 'line', //this denotes tha type of chart
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'No of sales',
            data: realdata,
            backgroundColor: colordata,
          },
        ],
      },
      options: {
        aspectRatio: 2,
      },
    });
  }

}
