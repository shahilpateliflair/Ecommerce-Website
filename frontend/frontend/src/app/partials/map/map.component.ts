import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Map, map, tileLayer } from 'leaflet';
import { LatLngTuple } from 'leaflet';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

//   private readonly DEFAULT_LETLNG : LatLngTuple =[13.75,21.62];
//   @ViewChild('map',{static:true})
//   mapRef! :ElementRef;

//   map!:Map;
//   constructor(){}
//   ngOnInit(): void {
//     this.initializeMap();
//   }
// initializeMap(){
// if(this.map) return;

// this.map = map(this.mapRef.nativeElement,{
//   attributionControl: false
// }).setView(this.DEFAULT_LETLNG,1)

// tileLayer('https://{s}.title.osm.org/{z}/{x}/{y}.png').addTo(this.map)
// }
}
