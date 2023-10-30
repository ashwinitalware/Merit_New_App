import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.scss'],
})
export class GaugeChartComponent  implements OnInit {
  gaugeChart: Chart<"doughnut", number[], string> | undefined;

  constructor() {}
 
  ngOnInit() {
    const ctx = document.getElementById('gaugeChart') as HTMLCanvasElement;
    const data = {
      labels: ['Value'],
      datasets: [
        {
          data: [75, 25], // Use two data points to control the cutout effect
          backgroundColor: ['#FF5733', 'transparent'], // The second data point is transparent
        },
      ],
    };

    const options: any = {
      cutout: '100%', // Adjust this value as needed
      tooltips: {
        enabled: false,
      },
      circumference: Math.PI,
      rotation: -Math.PI,
    };

    this.gaugeChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: options,
    });
  }
}