import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnitconverterPage } from './unitconverter.page';

const routes: Routes = [
  {
    path: '',
    component: UnitconverterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnitconverterPageRoutingModule {}
