import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';

import { HttpClientModule } from '@angular/common/http';
import { DataService} from './services/data.service';
import { HomeComponent } from './home/home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxGaugeModule } from 'ngx-gauge';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    Ng5SliderModule,
    NgxGaugeModule
    
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
