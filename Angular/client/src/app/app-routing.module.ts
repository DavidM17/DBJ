import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapComponent } from './components/map/map.component'
import { HomeComponent } from './home/home.component';


const routes: Routes = [

  {
    path: 'map',
    component: MapComponent 
  },
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
