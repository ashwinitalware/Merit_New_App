import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckboxdataPageRoutingModule } from './checkboxdata-routing.module';

import { CheckboxdataPage } from './checkboxdata.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckboxdataPageRoutingModule
  ],
  declarations: [CheckboxdataPage]
})
export class CheckboxdataPageModule {}
