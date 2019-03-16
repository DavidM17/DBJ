/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';

import { DataService} from '../../services/data.service';
import { ViewChild } from '@angular/core';


declare var google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  coord: any=[];
  dates:any=[];
  marker:any;
  poly:any;
  lat:any;
  lon:any;
  flightPlan:any=[];
  private _setIntervalHandler:any;
  
  constructor(private dataservice: DataService) { 
   
    this.data();
    
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
    map: this.map
    });

    this.poly = new google.maps.Polyline({
      path: this.flightPlan,
      strokeColor: '#000000',
      strokeOpacity: 1.0,
      strokeWeight: 3
    });
    this.poly.setMap(this.map);
  }

  data(){
    this._setIntervalHandler = setInterval(() => { 
      this.dataservice.getData().subscribe(
        res => {
          

          this.coord=res;
          this.lat=parseFloat(this.coord.find(t=>t.id).latitud);
          this.lon=parseFloat(this.coord.find(t=>t.id).longitud);
          
          this.marker.setPosition({lat: Number(this.lat), lng: Number(this.lon)});
          
          if (this.map.getBounds().contains(this.marker.getPosition())==false){
            this.map.setCenter({lat: Number(this.lat), lng: Number(this.lon)});
          }
         
          //Polyline
          //var path = this.poly.getPath();
          var latLng={lat: Number(this.lat), lng: Number(this.lon)}
          this.flightPlan.push(latLng);
          console.log(this.flightPlan);
          this.poly = new google.maps.Polyline({
            path: this.flightPlan,
            strokeColor: '#000000',
            strokeOpacity: 1.0,
            strokeWeight: 3
          });
          this.poly.setMap(this.map);
                  
        },
        
        err => console.error(err)
        
      );
    
   }, 10000);
 }

  between(){

    this.dataservice.getDatas('2019-03-16 08:56:04','2019-03-16 08:58:43').subscribe(
      res => {
        this.dates=res;
        console.log(this.dates);
                  
      },
      
      err => console.error(err)
      
    );
  }


  ngOnInit() {
    this.between();
    
    this.dataservice.getData().subscribe(
      res => {
        
        this.coord=res;
        this.lat=parseFloat(this.coord.find(t=>t.id).latitud);
        this.lon=parseFloat(this.coord.find(t=>t.id).longitud);
        
        this.map.setCenter({lat: Number(this.lat), lng: Number(this.lon)});
        this.marker.setPosition({lat: Number(this.lat), lng: Number(this.lon)});
        console.log(this.lat);
                   
      },
      
      err => console.error(err)
      
    );
    this.initMap();
  }
}
