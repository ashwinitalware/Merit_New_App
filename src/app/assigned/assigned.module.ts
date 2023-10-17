import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignedPageRoutingModule } from './assigned-routing.module';

import { AssignedPage } from './assigned.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignedPageRoutingModule
  ],
  declarations: [AssignedPage]
})
export class AssignedPageModule {}
