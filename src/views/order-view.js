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

import '@polymer/iron-pages/iron-pages.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';
import '../elements/order-info.js';
import '../shared-styles.js';

class OrderView extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
      :host {
        display: block;

        padding: 10px;
      }
      .title{
        @apply --paper-font-headline;
        color: var(--primary-color);
      }
      div.map-card{
        @apply --layout-vertical;
        @apply --shadow-elevation-2dp;
        background-color: #fff;
        border-radius: 2px;
      }
      google-map{
        height: 300px;
        width: 100%;
      }
      div.map .map-over{
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: 10;
      }
      div.map iron-icon.map-marker{
        position: absolute;
        top: calc(50% - 20px);
        left: calc(50% - 20px);
        color: var(--primary-color);
        height: 40px;
        width: 40px;
        z-index: 10;
      }
      .s-text{
        color:var(--secondary-text-color);
      }
      paper-spinner-lite{
        --paper-spinner-color:var(--accent-color);
      }
      .greetings{
        @apply --paper-font-title;
        color:var(--primary-color);
      }
      .text-center{
        text-align: center;
      }
    </style>
    <app-route route="{{route}}" pattern="/:id" data="{{data}}"></app-route>
    <order-info order-id="[[orderId]]" order="{{order}}" id="orderInfo"></order-info>
    <iron-pages selected="[[order.state]]" attr-for-selected="state">
      <section state="new" class="vertical">
        <span class="title m1-y">Orden Recibida</span>
        <div class="card">
          <span class="s-text">Espera la llamada al <b>[[order.phone]]</b> para confirmar tu orden. En esta página podrás ver actualizaciones en tiempo real.</span>
        </div>
        <paper-button class="accent self-center m1-y" raised="">Cancelar Orden</paper-button>
      </section>
      <section state="confirmed" class="vertical">
        <span class="title">Orden Confirmada</span>
        <div class="map-card">
          <span class="p1 s-text">Espera la orden en el punto de entrega especificado. Nuestro repartidor te llamará cuando esté cerca.</span>
          <google-map api-key="AIzaSyA9-te1IhrZw3c-eH-Cl_Toct5XEaI5OAA" disable-map-type-control="" disable-street-view-control="" disable-full-screen-control="" zoom="17" additional-map-options="{&quot;fullscreenControl&quot;:false,&quot;zoomControlOptions&quot;:{&quot;position&quot;:4}}" latitude="[[order.location.lat]]" longitude="[[order.location.lon]]">
            <google-map-marker latitude="[[order.location.lat]]" longitude="[[order.location.lon]]" draggable="false"></google-map-marker>
          </google-map>
        </div>
      </section>
      <section state="delivered" class="vertical">
        <span class="title">Orden Entregada</span>
        <div class="card">
          <div class="vertical text-center" hidden\$="[[orderRanked]]">
            <span class="s-text">Gracias por utilizar nuestro servicio. Por favor ayúdanos calificando tu experiencia.</span>
            <star-rating rating="{{order.rating}}" hidden\$="[[loading]]" class="m1-y"></star-rating>
            <paper-spinner-lite active="" hidden\$="[[!loading]]" class="self-center"></paper-spinner-lite>
          </div>
          <div class="vertical text-center" hidden\$="[[!orderRanked]]">
            <span class="s-text">¡Gracias!</span>
            <span class="s-text "> Tus comentarios nos ayudan a mejorar :)</span>
            <span class="s-text self-center m1-y greetings">¡Feliz chupe!</span>
          </div>
        </div>
        <a href="/" class="self-center">
          <paper-button class="primary self-center m1-y" raised="">Pedir denuevo</paper-button>
        </a>
      </section>
      <section state="canceled">
        <span class="title">Orden Cancelada</span>
        <div class="card">
          <span>Lamentamos no poder atenderte :(</span>
        </div>
      </section>
    </iron-pages>
`;
  }

  static get is() { return 'order-view'; }
  static get properties(){
    return{
      orderId:{
        type:String
      },
      order:Object,
      orderRanked:{
        type:Boolean,
        value:false
      },
      loading:{
        type:Boolean,
        value:false
      }
    }
  }
  static get observers() {
    return [
      '_orderIdChanged(data.id)','_orderRatingChanged(order.rating)'
    ];
  }
  _orderIdChanged(id){
    this.orderId=id||undefined;
  }
  _orderRatingChanged(rating){
    if(!rating)return;
    if(rating==0){
      this.orderRanked=false;
      return;
    }
    if(rating>0){
      this.loading=false;
      this.orderRanked=true;
      return;
    }
    this.loading=true;
    this.$.orderInfo.orderRef.update({rating:rating})
    .then((r)=>{
      message('Gracias por tu comentario')
      this.orderRanked=true;
      this.loading=false;
    })
    .catch((e)=>{
      this.loading=false;
    })
  }
}

window.customElements.define(OrderView.is, OrderView);
