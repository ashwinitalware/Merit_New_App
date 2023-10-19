import { Component, OnInit } from '@angular/core';
// import { Chart } from 'chart.js';

import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.scss'],
})
export class GaugeChartComponent  implements OnInit {

  // private gaugeChart: any;
  private gaugeChart: any;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.createGaugeChart();
  }

  // createGaugeChart() {
  //   this.gaugeChart = new Chart('gaugeChart', {
  //     type: 'doughnut',
  //     data: {
  //       labels: ['Progress'],
  //       datasets: [
  //         {
  //           data: [75], // Change this value to set the initial gauge value (0-100%)
  //           backgroundColor: ['#36A2EB'],
  //         },
  //       ],
  //     },
  //     options: {
  //       circumference: Math.PI,
  //       rotation: -Math.PI,
  //       cutout: '90%', // Adjust this value to change the gauge thickness
  //       plugins: {
  //         legend: {
  //           display: false,
  //         },
  //       },
  //     },
  //   });
  // }

//   createGaugeChart() {
//   this.gaugeChart = new Chart('gaugeChart', {
//     type: 'doughnut',
//     data: {
//       labels: ['Progress'],
//       datasets: [
//         {
//           data: [75], // Change this value to set the initial gauge value (0-100%)
//           backgroundColor: ['#36A2EB'],
//         },
//       ],
//     },
//     options: {
//       circumference: Math.PI,
//       rotation: -Math.PI / 2, // Change the rotation to start at the top (half circle)
//       cutout: '90%', // Adjust this value to change the gauge thickness
//       plugins: {
//         legend: {
//           display: false,
//         },
//       },
//     },
//   });
// }

// createGaugeChart() {
//   this.gaugeChart = new Chart('gaugeChart', {
//     type: 'doughnut',
//     data: {
//       labels: ['Progress'],
//       datasets: [
//         {
//           data: [75], // Change this value to set the initial gauge value (0-100%)
//           backgroundColor: ['#36A2EB'],
//         },
//       ],
//     },
//     options: {
//       cutout: 90, // Adjust this value to change the gauge thickness (in degrees)
//       rotation: 1.5 * Math.PI, // Rotate 270 degrees to start at the top (half circle)
//       circumference: 1.5 * Math.PI, // Set to 1.5 * Math.PI for half a circle
//       plugins: {
//         legend: {
//           display: false,
//         },
//       },
//     },
//   });
// }

createGaugeChart() {
  this.gaugeChart = new Chart('gaugeChart', {
    type: 'doughnut',
    data: {
      labels: ['Progress'],
      datasets: [
        {
          data: [75], // Change this value to set the initial gauge value (0-100%)
          backgroundColor: ['#36A2EB', 'transparent'],
        },
      ],
    },
    options: {
      cutout: '70%', // Adjust this value to change the gauge thickness
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      rotation: -Math.PI,
      circumference: Math.PI,
    },
  });

  // Rotate the needle based on the data value (0-100%)
  this.rotateNeedle(75);
}

rotateNeedle(value: number) {
  const needle = document.querySelector('.needle') as HTMLElement;
  const maxRotation = 135; // Maximum rotation in degrees
  const rotation = maxRotation * (value / 100);
  needle.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
}

// createGaugeChart() {
//   this.gaugeChart = new Chart('gaugeChart', {
//     type: 'doughnut',
//     data: {
//       labels: ['Progress'],
//       datasets: [
//         {
//           data: [75], // Change this value to set the initial gauge value (0-100%)
//           backgroundColor: ['#36A2EB', 'transparent'], // You can customize the gauge colors
//         },
//       ],
//     },
//     options: {
//       cutout: '70%', // Adjust this value to change the gauge thickness
//       responsive: true,
//       plugins: {
//         legend: {
//           display: false,
//         },
//       },
//       rotation: 1 * Math.PI, // Rotate to start at the top (half circle)
//     },
//   });
// }
// createSpeedometerChart() {
//   this.gaugeChart = new Chart('gaugeChart', {
//     type: 'radar',
//     data: {
//       labels: ['Progress'],
//       datasets: [
//         {
//           data: [75], // Change this value to set the initial gauge value (0-100%)
//           borderColor: '#36A2EB',
//           borderWidth: 2,
//           pointBackgroundColor: 'transparent',
//           pointBorderColor: 'transparent',
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: {
//           display: false,
//         },
//       },
//     },
//     scales: {
//       radar: {
//         ticks: {
//           beginAtZero: true,
//           max: 100,
//         },
//         pointLabels: {
//           fontSize: 12,
//         },
//         angleLines: {
//           display: false,
//         },
//       },
//     },
//   } as any); // Explicitly type the configuration object as 'any'
// }



}
