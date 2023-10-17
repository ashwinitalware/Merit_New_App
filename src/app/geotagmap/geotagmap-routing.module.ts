import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeotagmapPage } from './geotagmap.page';

const routes: Routes = [
  {
    path: '',
    component: GeotagmapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeotagmapPageRoutingModule {}
