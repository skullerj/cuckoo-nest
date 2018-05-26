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
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-badge/paper-badge.js';
import '@polymer/paper-toast/paper-toast.js';
import './elements/order-summary.js';
import './my-icons.js';
import {ReduxMixin} from './redux/global-store.js';
import './elements/localstorage-manager.js';
import './elements/client-info.js';
import './elements/items-data.js';
import './views/start-view.js';
import './views/confirmation-view.js';
import './views/items-view.js';
import './views/location-view.js';
import './views/notfound-view.js';
import './views/order-view.js';
import './views/inventory-view.js';
const firebaseConfig = {
  prod:{
    apiKey: "AIzaSyDYnUpB1FcnU7jmr6cvIkp8_YM9QlPufGQ",
    authDomain: "chupemos-193122.firebaseapp.com",
    databaseURL: "https://chupemos-193122.firebaseio.com",
    projectId: "chupemos-193122",
    storageBucket: "chupemos-193122.appspot.com",
    messagingSenderId: "760631908691"
  },
  test:{
    apiKey: "AIzaSyC2Bzmix1jIP3jBLxM8QMvN1YkR23y8ZIo",
    authDomain: "chupemos-stag.firebaseapp.com",
    databaseURL: "https://chupemos-stag.firebaseio.com",
    projectId: "chupemos-stag",
    storageBucket: "chupemos-stag.appspot.com",
    messagingSenderId: "480039852111"
  }
};
class ChupApp extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
    <style>
      :host {
        --light-primary-color:#ff7043;
        --primary-color: #ff5722;
        --on-primary-text-color:#fff;
        --dark-primary-color: #c41c00;
        --light-secondary-color:#607d8b;
        --secondary-color: #455a64;
        --on-secondary-text-color:#fff;
        --dark-secondary-color:#263238;
        --primary-text-color: rgba(0,0,0,0.87);
        --secondary-text-color: rgba(0,0,0,0.54);
        --disabled-text-color: rgba(0,0,0,0.38);
        --divider-color: rgba(0,0,0,0.12);
        --accent-color:var(--secondary-color);
      }
      app-header {
        color: #fff;
        background-color: var(--primary-color);
      }
      .logo{
        height: 60px;
        width: 80px;
      }
      .outer-container {
        display: block;
      }
      iron-pages{
        height: 100%;
      }
      iron-pages > * {
        height: 100%;
      }
      app-toolbar{
        @apply --layout-horizontal;
      }
      app-toolbar .spacer{
        @apply --layout-flex;
      }
      paper-button[drawer-toggle]{
        color:var(--white-primary-text-color);
      }
      [hidden]{
        display: none !important;
      }
      paper-badge{
        --paper-badge-margin-left:-12px;
        --paper-badge-margin-bottom:-12px;
      }
    </style>
    <localstorage-manager></localstorage-manager>
    <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
    </app-location>

    <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
    </app-route>
    <app-drawer-layout force-narrow="">
      <app-drawer slot="drawer" align="right">
        <order-summary></order-summary>
      </app-drawer>
      <app-header-layout>
        <app-header slot="header" condenses="" reveals="" effects="waterfall">
          <app-toolbar class="horizontal">
            <a href="/">
              <iron-image src="/images/logo.png" preload="" sizing="contain" class="logo"></iron-image>
            </a>
            <div class="spacer"></div>
            <div style="display:inline-block;">
              <paper-icon-button icon="custom:shopping-cart" drawer-toggle="" hidden\$="[[hideToggle]]"></paper-icon-button>
              <paper-badge label="[[totalItems]]" hidden\$="[[hideToggle]]"></paper-badge>
            </div>
          </app-toolbar>
        </app-header>
        <div class="outer-container">
          <iron-pages selected="[[page]]" attr-for-selected="name" fallback-selection="notfound" role="main">
            <promo-view name="promo"></promo-view>
            <start-view name="start"></start-view>
            <items-view name="items"></items-view>
            <location-view name="location"></location-view>
            <confirmation-view name="confirmation"></confirmation-view>
            <order-view name="order" route="[[subroute]]"></order-view>
            <inventory-view name="inventory"></inventory-view>
            <notfound-view name="notfound"></notfound-view>
          </iron-pages>
        </div>
      </app-header-layout>
    </app-drawer-layout>
    <paper-toast id="toast"></paper-toast>
`;
  }

  static get is() { return 'chup-app'; }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      hideToggle:{
        type:Boolean,
        value:true,
        computed:'_computeHideToggle(page)'
      },
      routeData: Object,
      subroute: String,
      // This shouldn't be neccessary, but the Analyzer isn't picking up
      // Polymer.Element#rootPath
      rootPath: String,
      totalItems:{
        type:Number,
        statePath:(state)=>{
          return state.order.items.length+state.order.bundles.length;
        }
      }
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)',
    ];
  }

  static get actions(){
    return{
      changePage:(page)=>{
        return {type:'PAGE_CHANGE',page:page};
      }
    }
  }

  connectedCallback(){
    super.connectedCallback();
    window.addEventListener('show-message',(e)=>{
      this._showMessage(e.detail.message,e.detail.duration);
    });

    var config = firebaseConfig['test'];
    if(window.location.hostname==='chupemos.com'){
      config = firebaseConfig['prod'];
    }
    var fa=document.createElement('firebase-app');
    fa.setAttribute('auth-domain',config.authDomain);
    fa.setAttribute('database-url',config.databaseURL);
    fa.setAttribute('api-key',config.apiKey);
    fa.setAttribute('storage-bucket',config.storageBucket);
    fa.setAttribute('messaging-sender-id',config.messagingSenderId);
    fa.setAttribute('project-id',config.projectId);
    this.appendChild(fa);
    var clientInfo=document.createElement('client-info');
    this.appendChild(clientInfo);
    var itemsData=document.createElement('items-data');
    this.appendChild(itemsData);
  }

  _routePageChanged(page) {
    // If no page was found in the route data, page will be an empty string.
    // Default to 'view1' in that case.
    this.page = page || 'start';

  }

  _pageChanged(page) {
    this.dispatch('changePage',page);
    if(page==='start'){
      return;
    }
    // Load page import on demand. Show 404 page if fails
    var resolvedPageUrl = this.resolveUrl('views/' + page + '-view.html');
    importHref(
        resolvedPageUrl,
        null,
        this._showPage404.bind(this),
        true);
  }

  _showPage404() {
    this.page = 'notfound';
  }

  _computeHideToggle(page){
    if(!page)return true;
    if(page!=='start'&&page!=='promo'&&page!=='inventory'&&page!=='order'&&page!=='confirmation'){
      return false;
    }else{
      return true;
    }
  }
  _showMessage(message,duration){
    this.$.toast.text=message||'';
    this.$.toast.duration=duration||5000;
    if(this.$.toast.opened)this.$.toast.close();
    this.$.toast.open();
  }
}

window.customElements.define(ChupApp.is, ChupApp);
