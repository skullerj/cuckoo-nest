/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { PolymerElement , html } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';
import '../shared-styles.js';
import '../elements/google-map.js';
import {ReduxMixin} from '../redux/global-store.js';


class LocationView extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles">
      :host {
        display: block;
      }
      div.outer{
        @apply --layout-vertical;
        height: calc(100vh - 64px);
        width: 100%;
        position: relative;
      }
      div.top{
        @apply --layout-vertical;
        background-color: var(--secondary-color);
        color: var(--on-secondary-text-color);
      }
      google-map{
        width: 100%;
        height: 100%;
      }
      div.title{
        padding: 10px;
      }
      div.search-container{
        position: absolute;
        top: 70px;
        @apply --layout-self-center;
        @apply --layout-horizontal;
        z-index: 100;
        width: 90%;
        border-radius: 4px;
        color: var(--primary-text-color);
        @apply --shadow-elevation-4dp;
        background-color : #fff;
      }
      div.search-container iron-icon{
        height: 24px;
        width: 24px;
        margin-left: 8px;
        @apply --layout-self-center;
      }
      div.search-container .gps-container{
        height: 42px;
        width: 42px;
        color: white;
        border-radius: 4px;
        background-color: var(--primary-color);
      }
      div.search-container .gps-container paper-spinner-lite{
        margin: 6px;
        --paper-spinner-color:var(--accent-color);
      }
      input#searchInput{
        @apply --paper-font-body1;
        background-color : #fff;
        box-sizing: border-box;
        padding-right: 16px;
        line-height: 40px;
        border: none;
        margin: 0;
        font-size: 16px;
        -webkit-appearance: none;
        text-align: left;
        @apply --layout-flex
      }
      div.map-container{
        @apply --layout-flex;
        position: relative;
        margin-bottom: 64px;
      }
      google-map{
        height: 100%;
        width: 100%;
      }

      div.directions-container{
        @apply --layout-vertical
      }
      a.white{
        color: #fff;
      }
    </style>
    <div class="outer">
      <div class="top">
        <div class="horizontal p1">
          <span class="font-title">Selecciona tu ubicación</span>
          <div class="flex"></div>
          <span class="font-caption">Paso 2/3</span>
        </div>
      </div>
      <div class="search-container">
        <iron-icon icon="custom:place"></iron-icon>
        <input type="text" placeholder="Calle, barrio, sector..." id="searchInput">
        <div class="gps-container">
          <paper-icon-button icon="custom:gps" on-tap="getLocation" hidden\$="[[loading]]"></paper-icon-button>
          <paper-spinner-lite active="" hidden\$="[[!loading]]"></paper-spinner-lite>
        </div>
      </div>
      <div class="map-container">
        <google-map id="map" on-map-ready="_mapReady"></google-map>
      </div>
    </div>
    <div class="bottom">
      <paper-icon-button icon="custom:chevron-left" class="self-center m1-r" on-tap="backPage"></paper-icon-button>
      <div class="flex"></div>
      <paper-button class="self-center primary" raised="" on-tap="nextPage">
        <span>Yaff.. pidamos</span>
        <iron-icon icon="custom:chevron-right"></iron-icon>
      </paper-button>
    </div>
`;
  }

  static get is() { return 'location-view'; }
  static get properties(){
    return {
      loading:{
        type:Boolean,
        value:false
      }
    }
  }
  static get actions(){
    return {
      setLocation:(lat,lon)=>{
        return {type:'SET_LOCATION',lat:lat,lon:lon};
      }
    }
  }
   connectedCallback(){
     super.connectedCallback();

   }
  _mapReady(){
    var config = {
        componentRestrictions: {country: 'ec'},
        types:['geocode']
    };
    var input = this.$.searchInput;
    input = new google.maps.places.Autocomplete(input,config);
    google.maps.event.addListener(input,'place_changed',()=>{
      var place = input.getPlace();
      if(!place.geometry){
        return console.log('No hay la ubicación');
      }
      this.$.map.lat=place.geometry.location.lat();
      this.$.map.lon=place.geometry.location.lng();
		});

  }
  _handlePositioningError(error){
    switch(error.code){
      case error.PERMISSION_DENIED:
          console.log('No nos permites localizarte.');
          break;
      case error.POSITION_UNAVAILABLE:
          console.log('No se puede acceder a tu ubicación');
          break;
      case error.TIMEOUT:
          console.log('No se puede acceder a tu ubicación');
          break;
      case error.UNKNOWN_ERROR:
          console.log('No se puede acceder a tu ubicación');
          break;
    }
    this.loading=false;
  }
  getLocation(){
    if(navigator.geolocation){
      this.loading=true;
      navigator.geolocation.getCurrentPosition(this._setPosition.bind(this),this._handlePositioningError.bind(this));
    }else{
      console.log('Tu explorador no perimite usar tu ubicación.');
    }
  }
  backPage(){
    redirect('/items')
  }
  nextPage(){
    var location=this.$.map.getLocation();
    if(!location)return message('Hubo un error cargando el mapa. Recarga la página.');
    if(location.zoom>16){
      this.dispatch('setLocation',location.lat,location.lon);
      redirect('/confirmation');
    }else{
      message('Acerca más el mapa para seleccionar tu ubicación exacta');
    }
  }
}
window.customElements.define(LocationView.is, LocationView);
