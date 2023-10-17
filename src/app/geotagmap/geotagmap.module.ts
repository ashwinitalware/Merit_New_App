import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeotagmapPageRoutingModule } from './geotagmap-routing.module';

import { GeotagmapPage } from './geotagmap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeotagmapPageRoutingModule
  ],
  declarations: [GeotagmapPage]
})
export class GeotagmapPageModule {}
