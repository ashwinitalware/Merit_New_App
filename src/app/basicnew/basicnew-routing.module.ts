import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicnewPage } from './basicnew.page';

const routes: Routes = [
  {
    path: '',
    component: BasicnewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasicnewPageRoutingModule {}
