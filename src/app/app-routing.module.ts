import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'basicnew',
    loadChildren: () => import('./basicnew/basicnew.module').then( m => m.BasicnewPageModule)
  },
  {
    path: 'geotagmap',
    loadChildren: () => import('./geotagmap/geotagmap.module').then( m => m.GeotagmapPageModule)
  },
  {
    path: 'show-map',
    loadChildren: () => import('./show-map/show-map.module').then( m => m.ShowMapPageModule)
  },
  {
    path: 'assigned',
    loadChildren: () => import('./assigned/assigned.module').then( m => m.AssignedPageModule)
  },
  {
    path: 'unitconverter',
    loadChildren: () => import('./unitconverter/unitconverter.module').then( m => m.UnitconverterPageModule)
  },
  {
    path: 'checkboxdata',
    loadChildren: () => import('./checkboxdata/checkboxdata.module').then( m => m.CheckboxdataPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
