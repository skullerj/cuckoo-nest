import { PolymerElement , html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';

const mapStyles=[
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]
class GoogleMap extends PolymerElement {
  static get template(){
    return html`
      <style>
        :host{
          display: block;
          height: 100%;
          width: 100%;
        }
        .map-wrapper{
          height: 100%;
          width: 100%;
        }
        #mapContainer{
          height: 100%;
          width: 100%;
          position: relative;
        }
        iron-icon.map-marker{
          position: absolute;
          top: calc(50% - 20px);
          left: calc(50% - 20px);
          color: var(--primary-color);
          height: 40px;
          width: 40px;
          z-index: 100;
        }

      </style>
      <div class="map-wrapper">
        <iron-icon icon="custom:place" class="map-marker"></iron-icon>
        <div id="mapContainer">

        </div>
      </div>

    `
  }
  static get is(){
    return 'google-map'
  }
  static get properties(){
    return {
      //Google Map object
      map:Object,
      lat:{
        type:Number,
        value:-0.1554050432298081
      },
      lon:{
        type:Number,
        value:-78.46836329172783
      },
      zoom:{
        type:Number,
        value:12
      }
    }
  }
  static get observers(){
    return ['_watchLatLon(lat,lon)']
  }
  connectedCallback(){
    super.connectedCallback();
    if(window.AppGlobals.mapsLoaded){
      this._initializeMap();
    }else{
      window.addEventListener('map-loaded',()=>{
        this._initializeMap();
      });
    }
  }
  _initializeMap(){
    var center = {lat: this.lat, lng: this.lon};
    this.map = new google.maps.Map(this.$.mapContainer, {
      zoom: this.zoom,
      center: center,
      styles: mapStyles
    });
  }
  _watchLatLon(lat,lon){
    if(!lat||!lon)return;
    if(typeof lat !=='number'||typeof lon !== 'number')return;
    if(!this.map)return;
    this.map.setCenter(new google.maps.LatLng(lat, lon));
  }
  //Returns map location including actual zoom
  getLocation(){
    if(!this.map)return null;
    return {
      lat:this.map.center.lat(),
      lon:this.map.center.lng(),
      zoom:this.map.zoom
    }
  }
}
customElements.define(GoogleMap.is,GoogleMap);
