/// <reference types="@types/googlemaps" />
import { Component, OnInit, DoCheck } from '@angular/core';

import { DataService} from '../../services/data.service';
import { ViewChild } from '@angular/core';
import {NgbDateStruct,NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';

import { Options } from 'ng5-slider';


declare var google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit,DoCheck {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  show=false;
  live=true;
  change=false;
  coord: any=[];
  dates:any=[];
  marker:any;
  marker2:any;
  poly:any;
  lat:any;
  lon:any;
  flightPlan:any=[];

  buscar=false;
  warning=false;
  slider=0;
  markerstatus=false;
  noexist=false;
  sliderdiv=false;
  hist:any=[];

  model1: NgbDateStruct;
  model2: NgbDateStruct;
  date1: {year: number, month: number, day: number};
  date2: {year: number, month: number, day: number};

  time1: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  time2: NgbTimeStruct = {hour: 23, minute: 59, second: 0};
  
  value: number = 0;
  options: Options ; 

 
  private _setIntervalHandler:any;
  
  constructor(private dataservice: DataService) { 
   

    
  }

  ngDoCheck(){

    if (this.live == false){
      if (this.markerstatus == true){
      this.marker2.setPosition({lat: Number(this.dates[this.value].latitud), lng: Number(this.dates[this.value].longitud)});
      this.coord=[{
        latitud:this.dates[this.value].latitud,
        longitud:this.dates[this.value].longitud,
        fecha:this.dates[this.value].fecha
      }];
    
      if (this.map.getBounds().contains(this.marker2.getPosition())==false){
        this.map.setCenter({lat: Number(this.dates[this.value].latitud), lng: Number(this.dates[this.value].longitud)});
      }
    
    }
  }
  
  }

 
  initMap(){
    
    var mapProp = {
      center: new google.maps.LatLng(this.lat, this.lon),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    this.marker = new google.maps.Marker({
    position: {lat: Number(this.lat), lng: Number(this.lat)},
    icon:'https://cdn2.iconfinder.com/data/icons/Snow/Snow/snow/Car.png',
    map: this.map
    });


    this.marker2 = new google.maps.Marker({
      position: {lat: Number(this.lat), lng: Number(this.lat)},
      map: null
      });


    this.poly = new google.maps.Polyline({
      path: this.flightPlan,
      strokeColor: '#000000',
      strokeOpacity: 1.0,
      strokeWeight: 3
    });
    this.poly.setMap(this.map);
  }


  clearMarkers() {
    this.marker2.setMap(null);
    
    
  }

  data(){
    this._setIntervalHandler = setInterval(() => { 

      if (this.live){
        this.markerstatus=false;


      this.dataservice.getData().subscribe(
        res => {
          
          if(this.change){

            this.sliderdiv=false;
            this.noexist=false;
            this.flightPlan=[];
            this.clearMarkers();
            this.marker=[];

            //Marker

            this.marker = new google.maps.Marker({
              position: {lat: Number(this.lat), lng: Number(this.lat)},
              icon:'https://cdn2.iconfinder.com/data/icons/Snow/Snow/snow/Car.png',
              map: this.map
              });
            
          }
      
          this.coord=res;
          this.lat=parseFloat(this.coord.find(t=>t.id).latitud);
          this.lon=parseFloat(this.coord.find(t=>t.id).longitud);
          
          //Update marker
          this.marker.setPosition({lat: Number(this.lat), lng: Number(this.lon)});
          

          if (this.map.getBounds().contains(this.marker.getPosition())==false){
            this.map.setCenter({lat: Number(this.lat), lng: Number(this.lon)});
          }
         
          //Polyline
         
          var latLng={lat: Number(this.lat), lng: Number(this.lon)}
          this.flightPlan.push(latLng);
         
          this.poly.setPath(this.flightPlan);
          
          this.change=false;
          
                  
        },
        
        err => console.error(err)
        
      );
    
    }
   }, 10000);
 }

  pad2(number) {
   
    return (number < 10 ? '0' : '') + number

  }
  between(){
    this.value=0;

    if (this.buscar == true){
     
      if (this.model2.year>=this.model1.year && this.model2.month>=this.model1.month && this.model2.day>=this.model1.day){
          this.buscar=false; 


          this.clearMarkers();
          
          //Remove live marker
          this.marker.setMap(null);
          //this.marker=[];
          this.show=false;
          

          this.dataservice.getDatas(this.model1.year.toString()+'-'+this.pad2(this.model1.month).toString()+'-'+this.pad2(this.model1.day).toString(),
          this.pad2(this.time1.hour).toString()+':'+this.pad2(this.time1.minute).toString()+':'+this.pad2(this.time1.second).toString(),
          this.model2.year.toString()+'-'+this.pad2(this.model2.month).toString()+'-'+this.pad2(this.model2.day).toString(),
          this.pad2(this.time2.hour).toString()+':'+this.pad2(this.time2.minute).toString()+':'+this.pad2(this.time2.second).toString()).subscribe(
            res => {
                
                this.hist=res;
                if (this.hist.length == 0){
                  this.dates=[{latitud:"11.01807",
                  longitud:"-74.85167",
                  fecha:""}];
                  this.noexist=true;
                  this.sliderdiv=false;
                }
                else{
                  this.noexist=false;
                  this.dates=res;
                  this.sliderdiv=true;
                  
                }
                
                this.slider=this.dates.length-1;
                this.options={
                  floor: 0,
                  ceil: this.slider
            
                };
                this.flightPlan=[];
                var latLng;
                for (var list in this.dates) {
                  //Flightplan Array
                  latLng={lat: Number(this.dates[list].latitud), lng: Number(this.dates[list].longitud)}
                  this.flightPlan.push(latLng);
                }

          
                //Markers Array
                this.marker2 = new google.maps.Marker({
                  position: latLng,
                  icon:'https://cdn2.iconfinder.com/data/icons/Snow/Snow/snow/Car.png',
                  map: this.map
                  });
                this.markerstatus=true;
                
                this.poly.setPath(this.flightPlan);
                this.map.setCenter(latLng);
                this.map.setZoom(15);
                
                
                this.change=true;
                this.buscar=false;

              
                        
            },
            
            err => console.error(err)
            
          );


       
        this.warning=false;
      }
      else{
        this.warning=true;
      }
      
    }
    
  }


  ngOnInit() {
    
    
    this.dataservice.getData().subscribe(
      res => {
        
        this.coord=res;
        this.lat=parseFloat(this.coord.find(t=>t.id).latitud);
        this.lon=parseFloat(this.coord.find(t=>t.id).longitud);
        
        this.map.setCenter({lat: Number(this.lat), lng: Number(this.lon)});
        this.marker.setPosition({lat: Number(this.lat), lng: Number(this.lon)});
    
                   
      },
      
      err => console.error(err)
      
    );
    this.initMap();
    this.data();
  
  }
}
