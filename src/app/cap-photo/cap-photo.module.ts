import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CapPhotoPageRoutingModule } from './cap-photo-routing.module';

import { CapPhotoPage } from './cap-photo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CapPhotoPageRoutingModule
  ],
  declarations: [CapPhotoPage]
})
export class CapPhotoPageModule {}
