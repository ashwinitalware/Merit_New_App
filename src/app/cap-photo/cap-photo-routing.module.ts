import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CapPhotoPage } from './cap-photo.page';

const routes: Routes = [
  {
    path: '',
    component: CapPhotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CapPhotoPageRoutingModule {}
