import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
// ! AfterViewInit suoritetaan kun näkymä on valmis.
export class MapComponent implements AfterViewInit {
  private map: any;
  private initMap(): void {



    // getCurrentPosition näyttää tämän hetkisen sijainnin
	  navigator.geolocation.getCurrentPosition((location) => {
      // latlng otetaan kordinaatit tämän hetkisen sijainnin
      const latlng = new L.LatLng(location.coords.latitude, location.coords.longitude); 
      // luo uuden kartan ja asettaa sijainnin siihen, 13 tarkoittaa zoomia

      const mymap = L.map('map').setView(latlng, 13);     

      // add the OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
      }).addTo(mymap);

      // show the scale bar on the lower left corner
      L.control.scale().addTo(mymap);

      // show a marker on the map
      L.marker(latlng).bindPopup('The center of the world').addTo(mymap); 
      
     });
  }
  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
    
  }

}
  