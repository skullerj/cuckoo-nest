import { PolymerElement , html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import {ReduxMixin} from '../redux/global-store.js';

class BundleCard extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
    <style>
      :host{
        display: block;
        color:
      }
      div.main{
        height: 150px;
        background-color: #fff;
        border-radius: 2px;
        @apply --shadow-elevation-2dp;
        @apply --layout-horizontal;
      }
      div.image{
        background-size: contain;
        background-repeat: no-repeat;
        height: 150px;
        width: 84px;
      }
      div.info-outer{
        @apply --layout-flex;
        @apply --layout-vertical;
      }
      div.info{
        @apply --layout-vertical;
        @apply --layout-flex;
        padding:12px;
      }
      div.controls{
        height: 50px;
        width: 100%;
        border-top: 1px solid rgba(0,0,0,0.3);
        @apply --layout-horizontal;
      }
      div.flex{
        @apply --layout-flex;
      }
      span.description{
        @apply --paper-font-body1;
      }
      span.price{
        padding-left: 12px;
        @apply --layout-self-center;
        @apply --paper-font-headline;
      }
      paper-button{
        color: var(--primary-color);
      }
    </style>
    <div class="main">
      <div class="image"></div>
      <div class="info-outer">
        <div class="info">
          <span class="name">[[bundle.name]]</span>
          <span class="description">[[bundle.description]]</span>
        </div>
        <div class="controls">
          <span class="price">\$ [[bundle.price]]</span>
          <div class="flex"></div>
          <paper-button on-tap="addBundle">Agregar</paper-button>
        </div>
      </div>
    </div>
`;
  }

  static get is(){
    return 'bundle-card';
  }
  static get properties(){
    return {
      bundle:{
        type:Object
      }
    }
  }
  static get observers(){
    return ['_watchPhoto(bundle.photoURL)']
  }
  static get actions(){
    return{
      addBundle:function(bundleId){
        return {type:'ADD_BUNDLE',bundle:bundleId}
      }
    }
  }
  addBundle(){
    this.dispatch('addBundle',this.bundle.__id__);
  }
  _watchPhoto(photo){
    this.shadowRoot.querySelector('.image').style.backgroundImage=`url('${photo}')`;
  }
}
customElements.define(BundleCard.is,BundleCard);