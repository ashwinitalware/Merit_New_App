import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ChartOptions } from 'chart.js';
import { ChartData } from 'chart.js';
import { Chart, registerables } from 'chart.js';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss'],
})
export class DonutChartComponent  implements OnInit {
user_id: any;
  private donutChart: Chart<'doughnut', number[], string> | undefined;

  constructor(
    public url: DataService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private alertController: AlertController
  ) {
    Chart.register(...registerables); 
    // Register necessary chart types
  }

  // ionViewWillEnter() {
  //   this.url.presentLoading();
  //   this.createDonutChart();
  //   this.url.dismiss();
  // }

  // ngOnInit() {
  //   this.createDonutChart();
  // }

  async ngOnInit() {
    const userData = await this.storage.get('member');
    this.user_id = parseInt(userData.user_id, 10);

    // Now, you can access this.user_id throughout the component
    this.createDonutChart();
  }

  createDonutChart1() {
    const ctx = document.getElementById('donutCanvas') as HTMLCanvasElement;

    const data: ChartData<'doughnut', number[], string> = {
      labels: ['Month', 'Today', 'Yesterday'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
          hoverOffset: 4,
        },
      ],
    };

    const options: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    const config: ChartConfiguration<'doughnut', number[], string> = {
      type: 'doughnut',
      data: data,
      options: options,
    };

    this.donutChart = new Chart(ctx, config);
  }

  createDonutChart() {
    const ctx = document.getElementById('donutCanvas') as HTMLCanvasElement;
  
    this.http.get(`${this.url.serverUrl}pending_count?user_id=${this.user_id}`).subscribe(
      (res: any) => {
        if (res.status) {
          console.log('API Response Data:', res.data,79);
  
          // Replace static data with dynamic data from the API response
          const dataValues = [
            res.data.preview_count, 
            res.data.today,          // Use the API data for "today"
            res.data.yesterday_count // Use the API data for "yesterday_count"
          ];
  
          console.log('Data Values:', dataValues, 89);
  
          // Define dynamic labels if needed
          // const labels = ['Preview', 'Today', 'Yesterday'];
          // console.log('Labels:', labels);
  
          const data: ChartData<'doughnut', number[], string> = {
            // labels: labels, 
            // Use dynamic labels if needed
            datasets: [
              {
                data: dataValues, // Use the dynamic data values
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
                hoverOffset: 4,
              },
            ],
          };
  
          const options: ChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
          };
  
          const config: ChartConfiguration<'doughnut', number[], string> = {
            type: 'doughnut',
            data: data,
            options: options,
          };
  
          if (this.donutChart) {
            this.donutChart.destroy();
          }
  
          this.donutChart = new Chart(ctx, config);
        } else {
          console.log('API Response Error:', res);
        }
      });
  }

  // createDonutChart() {
  //   const ctx = document.getElementById('donutCanvas') as HTMLCanvasElement;
    
  
  //   this.http.get(`${this.url.serverUrl}pending_count?user_id=${this.user_id}`).subscribe(
  //     (res: any) => {
  //       if (res.status) {
  //         console.log('API Response Data:', res.data);
  
  //         // Replace static data with dynamic data from the API response
  //         const dataValues = [
  //           res.data.preview_count,  // Use the API data for "preview_count"
  //           res.data.today,          // Use the API data for "today"
  //           res.data.yesterday_count // Use the API data for "yesterday_count"
  //         ];
  
  //         // Define dynamic labels if needed
  //         const labels = ['p', 'T', 'Y'];
  
  //         const data: ChartData<'doughnut', number[], string> = {
  //           labels: labels, // Use dynamic labels if needed
  //           datasets: [
  //             {
  //               data: dataValues, // Use the dynamic data values
  //               backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
  //               hoverOffset: 4,
  //             },
  //           ],
  //         };

  //         const options: ChartOptions = {
  //           responsive: true,
  //           maintainAspectRatio: false,
  //         };
  
  //         const config: ChartConfiguration<'doughnut', number[], string> = {
  //           type: 'doughnut',
  //           data: data,
  //           options: options,
  //         };
  
  //         if (this.donutChart) {
  //           this.donutChart.destroy();
  //         }
  
  //         this.donutChart = new Chart(ctx, config);

  //       } else {
  //         console.log('API Response Error:', res);
  //       }
  //     });
  // }

  // createDonutChart() {
  //   const ctx = document.getElementById('donutCanvas') as HTMLCanvasElement;
  //   const options: ChartOptions = {
  //     responsive: true,
  //     maintainAspectRatio: false,
  //   };
  
  //   this.http.get(`${this.url.serverUrl}pending_count?user_id=${this.user_id}`).subscribe((res: any) => {
  //     if (res.status) {
  //       const data: ChartData<'doughnut', number[], string> = {
  //         labels: ['Month', 'Today', 'Yesterday'],
  //         datasets: [
  //           {
  //             data: [res.data.preview_count, res.data.today, res.data.yesterday_count],
  //             backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
  //             hoverOffset: 4,
  //           },
  //         ],
  //       };
  
  //       const config: ChartConfiguration<'doughnut', number[], string> = {
  //         type: 'doughnut',
  //         data: data,
  //         options: options,
  //       };
  
  //       if (this.donutChart) {
  //         this.donutChart.destroy();
  //       }
  
  //       this.donutChart = new Chart(ctx, config);
  //     } else {
  //     }
  //   });
  // }

  // createDonutChart() {
  //   const ctx = document.getElementById('donutCanvas') as HTMLCanvasElement;
  //   const options: ChartOptions = {
  //     responsive: true,
  //     maintainAspectRatio: false,
  //   };
  
  //   this.http.get(`${this.url.serverUrl}pending_count?user_id=${this.user_id}`).subscribe(
  //     (res: any) => {
  //       if (res.status) {
  //         console.log('API Response Data:', res.data);
  
  //         // Ensure that the data values are numbers
  //         const previewCount = parseInt(res.data.preview_count, 10);
  //         const todayCount = parseInt(res.data.today, 10);
  //         const yesterdayCount = parseInt(res.data.yesterday_count, 10);
  
  //         const data: ChartData<'doughnut', number[], string> = {
  //           labels: ['Month', 'Today', 'Yesterday'],
  //           datasets: [
  //             {
  //               data: [previewCount, todayCount, yesterdayCount], // Use the parsed values
  //               backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
  //               hoverOffset: 4,
  //             },
  //           ],
  //         };
  
  //         const config: ChartConfiguration<'doughnut', number[], string> = {
  //           type: 'doughnut',
  //           data: data,
  //           options: options,
  //         };
  
  //         if (this.donutChart) {
  //           this.donutChart.destroy();
  //         }
  
  //         this.donutChart = new Chart(ctx, config);
  //       } else {
  //         console.log('API Response Error:', res);
  //       }
  //     });
  // }
  // async createDonutChart2() {
  //   const ctx = document.getElementById('donutCanvas') as HTMLCanvasElement;
  //   const options: ChartOptions = {
  //     responsive: true,
  //     maintainAspectRatio: false,
  //   };
  //   const userData = await this.storage.get('member');
  //   const user_id = parseInt(userData.user_id, 10);
  //   alert(userData.user_id);
  //   this.http.get(`${this.url.serverUrl}pending_count?user_id=${user_id}`).subscribe(
  //     (res: any) => {
  //     alert(this.user_id);
  //     if (res.status) {
  //       console.log('API Response Data:', res.data);
  
  //       const data: ChartData<'doughnut', number[], string> = {
  //         labels: ['Month', 'Today', 'Yesterday'],
  //         datasets: [
  //           {
  //             data: [res.data.preview_count, res.data.today, res.data.yesterday_count],
  //             backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
  //             hoverOffset: 4,
  //           },
  //         ],
  //       };
  
  //       const config: ChartConfiguration<'doughnut', number[], string> = {
  //         type: 'doughnut',
  //         data: data,
  //         options: options,
  //       };
  
  //       if (this.donutChart) {
  //         this.donutChart.destroy();
  //       }
  
  //       this.donutChart = new Chart(ctx, config);
  //     } else {
  //       console.log('API Response Error:', res);
  //       // Handle the error case if needed
  //     }
  //   });
  // }

  

}
