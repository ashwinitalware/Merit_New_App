import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnitconverterPageRoutingModule } from './unitconverter-routing.module';

import { UnitconverterPage } from './unitconverter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnitconverterPageRoutingModule
  ],
  declarations: [UnitconverterPage]
})
export class UnitconverterPageModule {}
