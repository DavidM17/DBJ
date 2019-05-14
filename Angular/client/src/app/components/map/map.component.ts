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
  dates2:any=[];

  marker:any;
  marker2:any;
  marker3:any;
  marker4:any;

  poly:any;
  poly2:any;
  lat:any;
  lon:any;
  lat2:any;
  lon2:any;
  flightPlan:any=[];
  flightPlan2:any=[];
  

  buscar=false;
  warning=false;
  slider=0;
  slider2=0;
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
  options: Options;

  value2: number = 0;
  options2: Options ; 


  gaugeType = "semi";
  gaugeValue = "0";
  gaugeLabel = "Velocidad";
  gaugeAppendText = "km/h";

  gaugeType2 = "semi";
  gaugeValue2 = "0";
  gaugeLabel2 = "Revoluciones";
  gaugeAppendText2 = "rpm";


 
  private _setIntervalHandler:any;
  
  constructor(private dataservice: DataService) { 
   

    
  }

  ngDoCheck(){

    if (this.live == false){
      if (this.markerstatus == true){
      this.marker2.setPosition({lat: Number(this.dates.carro1[this.value].latitud), lng: Number(this.dates.carro1[this.value].longitud)});
      //second marker position
      this.marker4.setPosition({lat: Number(this.dates.carro2[this.value2].latitud), lng: Number(this.dates.carro2[this.value2].longitud)});
      
      this.coord={
        carro1:[{
        latitud:this.dates.carro1[this.value].latitud,
        longitud:this.dates.carro1[this.value].longitud,
        fecha:this.dates.carro1[this.value].fecha}],
        carro2:[{
        latitud:this.dates.carro2[this.value2].latitud,
        longitud:this.dates.carro2[this.value2].longitud,
        fecha:this.dates.carro2[this.value2].fecha}],
      };
    
      if (this.map.getBounds().contains(this.marker2.getPosition())==false){
        this.map.setCenter({lat: Number(this.dates.carro1[this.value].latitud), lng: Number(this.dates.carro1[this.value].longitud)});
      }

      this.gaugeValue = this.dates.carro1[this.value].velocidad;
      this.gaugeValue2 = this.dates.carro1[this.value].rpm;
    
    }
  }
  
  }

 
  initMap(){
    
    var mapProp = {
      center: new google.maps.LatLng(this.lat, this.lon),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    this.marker = new google.maps.Marker({
    position: {lat: Number(this.lat), lng: Number(this.lon)},
    icon:'http://oi67.tinypic.com/6ce9.jpg',
    map: this.map
    });


    this.marker2 = new google.maps.Marker({
      position: {lat: Number(this.lat), lng: Number(this.lon)},
      map: null
      });

      this.marker4 = new google.maps.Marker({
        position: {lat: Number(this.lat2), lng: Number(this.lon2)},
        map: null
        });

    //second marker
    this.marker3 = new google.maps.Marker({
      position: {lat: Number(this.lat2), lng: Number(this.lon2)},
      icon:'http://oi66.tinypic.com/149tkwi.jpg',
      map: this.map
      });

    this.poly = new google.maps.Polyline({
      path: this.flightPlan,
      strokeColor: '#000000',
      strokeOpacity: 1.0,
      strokeWeight: 3
    });

    //second poly

    this.poly2 = new google.maps.Polyline({
      path: this.flightPlan2,
      strokeColor: '#39bed6',
      strokeOpacity: 1.0,
      strokeWeight: 3
    });

    this.poly.setMap(this.map);
    this.poly2.setMap(this.map);
  }


  clearMarkers() {
    this.marker2.setMap(null);
    //second car
    this.marker4.setMap(null);
    
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
            this.flightPlan2=[];
            this.clearMarkers();
            this.marker=[];
            this.marker3=[];

            //Marker

            this.marker = new google.maps.Marker({
              position: {lat: Number(this.lat), lng: Number(this.lon)},
              icon:'http://oi67.tinypic.com/6ce9.jpg',
              map: this.map
              });
            
            this.marker3 = new google.maps.Marker({
              position: {lat: Number(this.lat2), lng: Number(this.lon2)},
              icon:'http://oi66.tinypic.com/149tkwi.jpg',
              map: this.map
              });
          }
      
          this.coord=res;
          this.lat=parseFloat(this.coord.carro1.find(t=>t.id).latitud);
          this.lon=parseFloat(this.coord.carro1.find(t=>t.id).longitud);
          //Second car
          this.lat2=parseFloat(this.coord.carro2.find(t=>t.id).latitud);
          this.lon2=parseFloat(this.coord.carro2.find(t=>t.id).longitud);
          
          //Update marker
          this.marker.setPosition({lat: Number(this.lat), lng: Number(this.lon)});
          this.marker3.setPosition({lat: Number(this.lat2), lng: Number(this.lon2)});
          

          if (this.map.getBounds().contains(this.marker.getPosition())==false){
            this.map.setCenter({lat: Number(this.lat), lng: Number(this.lon)});
          }
         
          //Polyline
         
          var latLng={lat: Number(this.lat), lng: Number(this.lon)}
          this.flightPlan.push(latLng);
         
          var latLng2={lat: Number(this.lat2), lng: Number(this.lon2)}
          this.flightPlan2.push(latLng2);

          this.poly.setPath(this.flightPlan);
          this.poly2.setPath(this.flightPlan2);
          
          this.change=false;

          // OBD
          this.gaugeValue = (parseFloat(this.coord.carro1.find(t=>t.id).velocidad)).toString();
          this.gaugeValue2 = (parseFloat(this.coord.carro1.find(t=>t.id).rpm)).toString();
          
                  
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
    //second value

    if (this.buscar == true){
     
      if (this.model2.year>=this.model1.year && this.model2.month>=this.model1.month && this.model2.day>=this.model1.day){
          this.buscar=false; 


          this.clearMarkers();
          
          //Remove live marker
          this.marker.setMap(null);
          this.marker3.setMap(null);
          //this.marker=[];
          this.show=false;
          

          this.dataservice.getDatas(this.model1.year.toString()+'-'+this.pad2(this.model1.month).toString()+'-'+this.pad2(this.model1.day).toString(),
          this.pad2(this.time1.hour).toString()+':'+this.pad2(this.time1.minute).toString()+':'+this.pad2(this.time1.second).toString(),
          this.model2.year.toString()+'-'+this.pad2(this.model2.month).toString()+'-'+this.pad2(this.model2.day).toString(),
          this.pad2(this.time2.hour).toString()+':'+this.pad2(this.time2.minute).toString()+':'+this.pad2(this.time2.second).toString()).subscribe(
            res => {
                
                this.hist=res;
                if (this.hist.carro1.length == 0){
                  
                  this.dates={
                    carro1:[{
                    latitud:"11.01807",
                    longitud:"-74.85167",
                    fecha:"",
                    rpm:0,
                    velocidad:0}],
                    carro2:[{
                    latitud:"11.01807",
                    longitud:"-74.85167",
                    fecha:""}],
                  };

                  this.noexist=true;
                  this.sliderdiv=false;
                }
                else{

                  
                  this.noexist=false;
                  this.dates=res;
                  this.sliderdiv=true;
                  this.slider=this.dates.carro1.length-1;

                  }

                console.log(this.dates);

                if (this.hist.carro2.length == 0){
                  this.slider2=0;
                }
                else{
                this.slider2=this.dates.carro2.length-1;
                }
                
                

                this.options={
                  floor: 0,
                  ceil: this.slider
                };

                this.options2={
                  floor: 0,
                  ceil: this.slider2

                };

                //secondslider

                this.flightPlan=[];
                this.flightPlan2=[];
                //secondflighplan
                console.log(this.dates);

                var latLng;
                for (var list in this.dates.carro1) {
                  //Flightplan Array
                  latLng={lat: Number(this.dates.carro1[list].latitud), lng: Number(this.dates.carro1[list].longitud)}
                  this.flightPlan.push(latLng);
                  
                }
                var latLng2;
                for (var list in this.dates.carro2) {
                  //Flightplan Array
                  latLng2={lat: Number(this.dates.carro2[list].latitud), lng: Number(this.dates.carro2[list].longitud)}
                  this.flightPlan2.push(latLng2);
                  
                }

                //second for

                this.gaugeValue = this.dates.carro1[this.dates.carro1.length-1].velocidad.toString();
                this.gaugeValue2 = this.dates.carro1[this.dates.carro1.length-1].rpm.toString();
                
          
                //Markers Array
                this.marker2 = new google.maps.Marker({
                  position: latLng,
                  icon:'http://oi67.tinypic.com/6ce9.jpg',
                  map: this.map
                  });

                //second marker
                this.marker4 = new google.maps.Marker({
                  position: latLng2,
                  icon:'http://oi66.tinypic.com/149tkwi.jpg',
                  map: this.map
                  });

                this.markerstatus=true;
                
                this.poly.setPath(this.flightPlan);
                //second poly
                this.poly2.setPath(this.flightPlan2);

                this.map.setCenter(latLng);
                this.map.setZoom(13);
                
                
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
        console.log(res);
        this.lat=parseFloat(this.coord.carro1.find(t=>t.id).latitud);
        this.lon=parseFloat(this.coord.carro1.find(t=>t.id).longitud);
        //Second Car
        this.lat2=parseFloat(this.coord.carro2.find(t=>t.id).latitud);
        this.lon2=parseFloat(this.coord.carro2.find(t=>t.id).longitud);
        
        this.map.setCenter({lat: Number(this.lat), lng: Number(this.lon)});
        this.marker.setPosition({lat: Number(this.lat), lng: Number(this.lon)});
        this.marker3.setPosition({lat: Number(this.lat2), lng: Number(this.lon2)});
    
        //OBD
        this.gaugeValue = (parseFloat(this.coord.carro1.find(t=>t.id).velocidad)).toString();
        this.gaugeValue2 = (parseFloat(this.coord.carro1.find(t=>t.id).rpm)).toString();
      },
      
      err => console.error(err)
      
    );
    this.initMap();
    this.data();
  
  }
}
