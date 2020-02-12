import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  protected map: any;
  currentLat: any;
  currentLong: any;

  public zoom: number=18;
  public placeId: string;
  lat: number = 11.551128900000002;
  lng: number = 104.9285779;

  
  constructor() { }

  ngOnInit() {
    // this.store.fetchData(null);
  }

  mapReady($event: any) {
    this.map = $event;
    this.findMe();
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.showPosition(position, true);
      },error=>{
        
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position, isCenter) {
    if (this.map) {
      if (isCenter) {
        this.map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
      }
      this.lat=position.coords.latitude;
      this.lng=position.coords.longitude;
      this.currentLat = position.coords.latitude;
      this.currentLong = position.coords.longitude;
      this.zoom = 18;
    }
  }

  onMaker($event) {
    const { lat, lng } = $event.coords;
    const position = {
      coords: { latitude: lat, longitude: lng }
    }
    this.showPosition(position, false);
  }


}
