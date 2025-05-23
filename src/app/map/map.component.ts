import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

// Fix Leaflet's default icon path for Angular build
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;


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
  constructor() { }

  private initMap(): void {
    // location ottaa tämän hetkisen sijainnin kordinaatteina
    // watchPosition-metodi tarkkailee käyttäjän sijaintia
    // ja päivittää markkeria koko ajan kun käyttäjä liikkuu
    navigator.geolocation.watchPosition((location) => {
      // ottaa tämän hetkisesestä sijainnista leveydet yms.
      const latlng = new L.LatLng(
        location.coords.latitude,
        location.coords.longitude
      );

      const lat = location.coords.latitude;

      // 13 on kartan zoomi
      this.map = L.map('map').setView(latlng, 13);

      // add the OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
      }).addTo(this.map);

      // show the scale bar on the lower left corner
      L.control.scale().addTo(this.map);

      // show a marker on the map
      L.marker(latlng).bindPopup('The center of the world').addTo(this.map);

      if (lat > 62) {
        this.notifyMe();
      }
    });
  }

 
  private createMap(latlng: L.LatLng) {
    this.map = L.map('map').setView(latlng, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(this.map);
    L.control.scale().addTo(this.map);
    L.marker(latlng).bindPopup('The center of the world').addTo(this.map);
  }

  notifyMe() {
    if (!('Notification' in window)) {
      // Check if the browser supports notifications
      alert('This browser does not support desktop notification');
    } else if (Notification.permission === 'granted') {
      // Check whether notification permissions have already been granted;
      // if so, create a notification
      const notification = new Notification('Terve!');
      // …
    } else if (Notification.permission !== 'denied') {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
          console.log('Permission granted');
          const notification = new Notification('Terve!');
          // …
        }
      });
    }

    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them anymore.
  }
  
  showNotification() {
    const notification = new Notification("Geolocation Alert", {
      body: "You have entered the area!",
    });   
  }
  
  ngAfterViewInit(): void {
    this.initMap();
    
  }

}
  