import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BasicnewPageRoutingModule } from './basicnew-routing.module';

import { BasicnewPage } from './basicnew.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BasicnewPageRoutingModule
  ],
  declarations: [BasicnewPage]
})
export class BasicnewPageModule {}
