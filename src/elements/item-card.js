import { PolymerElement , html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import {ReduxMixin} from '../redux/global-store.js';

class ItemCard extends ReduxMixin(PolymerElement) {
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
          <span class="name">[[item.name]]</span>
          <span class="description">[[item.description]]</span>
        </div>
        <div class="controls">
          <span class="price">\$ [[item.price]]</span>
          <div class="flex"></div>
          <paper-button on-tap="addItem">Agregar</paper-button>
        </div>
      </div>
    </div>
`;
  }

  static get is(){
    return 'item-card';
  }
  static get properties(){
    return {
      item:{
        type:Object
      }
    }
  }
  static get observers(){
    return ['_watchPhoto(item.photoURL)']
  }
  static get actions(){
    return{
      addItem:function(itemId){
        return {type:'ADD_ITEM',item:itemId}
      }
    }
  }
  addItem(){
    this.dispatch('addItem',this.item.id);
  }
  _watchPhoto(photo){
    this.shadowRoot.querySelector('.image').style.backgroundImage=`url('${photo}')`;
  }
}
customElements.define(ItemCard.is,ItemCard);
