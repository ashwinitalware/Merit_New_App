import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { DonutChartComponent } from '../donut-chart/donut-chart.component';
import { GaugeChartComponent } from '../gauge-chart/gauge-chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule
  ],
  declarations: [DashboardPage,DonutChartComponent,GaugeChartComponent,
    // SpeedometerComponent,
  ]
})
export class DashboardPageModule {}
