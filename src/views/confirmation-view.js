/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import {PolymerElement , html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';
import {OrderActions} from '../redux/actions/order-actions.js';
import '../shared-styles.js';
class ConfirmationView extends OrderActions(PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles">
      :host {
        display: block;
      }
      div.outer{
        @apply --layout-vertical;
        padding-bottom: 70px;
      }
      div.top{
        @apply --layout-vertical;
        background-color: var(--secondary-color);
        color: var(--on-secondary-text-color);
      }
      div.info-item{
        background-color: #fff;
        margin: 8px 8px 0px 8px;
        @apply --layout-vertical;
        @apply --shadow-elevation-2dp;
      }
      div.info-item .info{
        padding: 1rem;
        @apply --layout-flex;
      }
      div.info-item .actions{
        @apply --layout-horizontal-reverse;
        border-top: 1px solid rgba(0,0,0,0.2);
      }
      div.info-item .map{
        height: 300px;
        width: 100%;
        position: relative;
      }
      div.info-item .map .map-over{
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: 10;
      }
      div.info-item .map iron-icon.map-marker{
        position: absolute;
        top: calc(50% - 20px);
        left: calc(50% - 20px);
        color: var(--primary-color);
        height: 40px;
        width: 40px;
        z-index: 10;
      }
      span.info-title{
        @apply --paper-font-title;
        color: var(--primary-color);
        margin: 8px;
      }
      div.item{
        height: 60px;
        @apply --layout-horizontal;
        padding: 0.5rem;
      }
      paper-spinner-lite{
        --paper-spinner-color:var(--primary-color);
      }
      input{
        background-color : var(--secondary-color);
        box-sizing: border-box;
        border-radius: 4px;
        width: 100%;
        padding-right: 16px;
        padding-left: 20px;
        line-height: 40px;
        border: none;
        margin: 0;
        font-size: 16px;
        -webkit-appearance: none;
        text-align: center;
        color: var(--on-secondary-text-color);
      }
    </style>
    <div class="outer">
      <div class="top">
        <div class="horizontal p1">
          <span class="font-title">Confirma tu pedido</span>
          <div class="flex"></div>
          <span class="font-caption">Paso 3/3</span>
        </div>
      </div>
      <span class="info-title">Número</span>
      <div class="info-item">
        <div class="info" hidden\$="[[phoneEditing]]">
          <div>
            <span>[[client.phone]]</span>
          </div>
        </div>
        <div class="info" hidden\$="[[!phoneEditing]]">
          <input placeholder="Número de Celular" type="text" class="m2-y">
        </div>
        <div class="actions">
          <paper-button class="primary" on-tap="_editPhone" hidden\$="[[phoneEditing]]">Cambiar</paper-button>
          <paper-button class="primary" on-tap="_savePhone" hidden\$="[[!phoneEditing]]">Guardar</paper-button>
        </div>
      </div>
      <span class="info-title">Pedido</span>
      <div class="info-item">
        <div class="info">
          <div class="items">
            <template is="dom-repeat" items="[[orderItems]]">
              <div class="item">
                <span>[[item.info.name]]</span>
                <div class="flex"></div>
                <span class="text-primary">X [[item.qty]]</span>
              </div>
            </template>
            <template is="dom-repeat" items="[[orderBundles]]">
              <div class="item">
                <span>[[item.info.name]]</span>
                <div class="flex"></div>
                <span class="text-primary">X [[item.qty]]</span>
              </div>
            </template>
          </div>
        </div>
        <div class="actions">
          <a href="/items">
            <paper-button class="primary">Cambiar</paper-button>
          </a>
        </div>
      </div>
      <span class="info-title">Ubicación</span>
      <div class="info-item">
        <div class="map">
          <div class="map-over"></div>
          <iron-icon icon="custom:place" class="map-marker"></iron-icon>
          
        </div>
        <div class="actions">
          <a href="/location">
            <paper-button class="primary">Cambiar</paper-button>
          </a>
        </div>
      </div>
      <div class="bottom">
        <paper-icon-button icon="custom:chevron-left" class="self-center m1-r" on-tap="backPage"></paper-icon-button>
        <div class="flex"></div>
        <paper-spinner-lite active="[[loading]]"></paper-spinner-lite>
        <paper-button raised="" class="primary self-center" on-tap="submitOrder" disabled="[[loading]]">Yaf... confirmemos</paper-button>
      </div>
    </div>
`;
  }

  static get is() { return 'confirmation-view'; }
  static get properties(){
    return {
      client:{
        type:Object,
        statePath:'client'
      },
      loading:{
        type:Boolean,
        value:false
      },
      phoneEditing:{
        type:Boolean,
        value:false
      }
    }
  }
  static get actions(){
    return{
      addPendant:function(orderId){
        return {type:'ADD_PENDANT_ORDER',order:orderId}
      },
      resetOrder:function(){
        return {type:'RESET_ORDER'};
      }
    }
  }
  submitOrder(){
    this.loading=true;
    var db = firebase.firestore();
    var order = Object.assign({},this.order,{phone:this.client.phone,createdAt:(new Date).getTime()})
    db.collection("order").add(order)
    .then((docRef)=>{
        this.loading=false;
        redirect('/order/'+docRef.id);
        this.dispatch('addPendant',docRef.id);
        this.dispatch('resetOrder')
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error)=>{
        this.loading=false;
        console.error("Error adding document: ", error);
    });
  }
  _editPhone(){
    this.phoneEditing=true;
  }
  _savePhone(){
    this.phoneEditing=false;
  }
  backPage(){
    redirect('/location');
  }
}

window.customElements.define(ConfirmationView.is, ConfirmationView);
