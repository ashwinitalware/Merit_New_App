import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckboxdataPage } from './checkboxdata.page';

const routes: Routes = [
  {
    path: '',
    component: CheckboxdataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckboxdataPageRoutingModule {}
