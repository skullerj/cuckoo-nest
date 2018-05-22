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

import '@polymer/app-layout/app-grid/app-grid-style.js';
import '@polymer/iron-image/iron-image.js';
import '../shared-styles.js';
 
class InventoryView extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles app-grid-style">
      :host {
        display: block;
        --app-grid-columns: 4;
        --app-grid-gutter: 12px;
        --app-grid-expandible-item-columns: 2;
      }
      .outer{
        padding: 8px;
      }
      .title{
        @apply --paper-font-display1;
        color: var(--primary-text-color);
      }
      .inventory-outer{
        @apply --layout-horizontal;
        @apply --layout-wrap;
      }
      .inventory-outer > div {
        margin: 12px 0px 0px 12px;
      }
      .inventory-card{
        @apply --layout-horizontal;
        @apply --shadow-elevation-2dp;
        background-color: #fff;
        font-weight: 300;
      }
      .inventory-card iron-image{
        height: 300px;
        width: 169px;
      }
      .inventory-card .info{
        @apply --layout-vertical;
        padding: 16px;
        width: 150px;
        color: var(--primary-text-color);
      }
      .inventory-card .info .font-title{
        color: var(--primary-color);
      }
      .inventory-card a {
        text-decoration: none;
      }
      .inventory-card .bordered {
        border-top: 1px solid rgba(0,0,0,0.3);
      }
      .other .info{
        background-color: var(--primary-color);
        @apply --layout-vertical;
        padding: 16px;
      }
      .other .info a{
        color: var(--white-primary-text-color);
      }
      @media screen and (max-width:460px){
        .title{
          @apply --paper-font-headline;
        }
        :host {
          display: block;
          --app-grid-columns: 1;
        }
      }
      @media screen and (min-width:460px) and (max-width:760px){
        .title{
          @apply --paper-font-headline;
        }
        :host {
          display: block;
          --app-grid-columns: 2;
        }
      }
      @media screen and (min-width:761px) and (max-width:1024px){
        .title{
          @apply --paper-font-display1;
        }
        :host {
          display: block;
          --app-grid-columns: 3;
        }
      }
    </style>
    <div class="outer">
      <span class="title">Nuestros Tragos</span>
      <div class="inventory-outer">
        <div class="inventory-card">
          <iron-image src="/images/bottles/Norteno-100.jpg" preload="" sizing="contain"></iron-image>
          <div class="vertical">
            <div class="info">
              <span class="font-caption">Aguardiente</span>
              <span class="font-title">Norteño</span>
              <span> <b>Alcohol:</b>  28%</span>
              <span> <b>Alias:</b> Norton, Noni, Nortiñer</span>
              <span> <b>Mezclar con:</b> Fuze Tea</span>
            </div>
            <div class="flex"></div>
            <div class="vertical bordered">
              <a class="self-end" target="_blank" href="https://api.whatsapp.com/send?phone=593998093257&amp;text=Hola%2C%20Porfa%20ay%C3%BAdame%20con%20Norte%C3%B1o%20">
                <paper-button class="primary">Pedir</paper-button>
              </a>
            </div>
          </div>
        </div>
        <div class="inventory-card">
          <iron-image src="/images/bottles/RonAbuelo-100.jpg" preload="" sizing="contain"></iron-image>
          <div class="vertical">
            <div class="info">
              <span class="font-caption">Ron</span>
              <span class="font-title">Ron Abuelo</span>
              <span> <b>Alcohol:</b>  37,5%</span>
              <span> <b>Alias:</b> El Abuelo</span>
              <span> <b>Mezclar con:</b> Coca Cola</span>
            </div>
            <div class="flex"></div>
            <div class="vertical bordered">
              <a class="self-end" target="_blank" href="https://api.whatsapp.com/send?phone=593998093257&amp;text=Hola%2C%20Ay%C3%BAdame%20con%20un%20Ron%20Abuelo">
                <paper-button class="primary">Pedir</paper-button>
              </a>
            </div>
          </div>
        </div>
        <div class="inventory-card">
          <iron-image src="/images/bottles/RonlaCueva-100.jpg" preload="" sizing="contain"></iron-image>
          <div class="vertical">
            <div class="info">
              <span class="font-caption">Ron</span>
              <span class="font-title">Ron la Cueva</span>
              <span> <b>Alcohol:</b>  37%</span>
              <span> <b>Alias:</b> N/A</span>
              <span> <b>Mezclar con:</b> Coca Cola</span>
            </div>
            <div class="flex"></div>
            <div class="vertical bordered">
              <a class="self-end" target="_blank" href="https://api.whatsapp.com/send?phone=593998093257&amp;text=Hola%2C%20ay%C3%BAdame%20con%20un%20Ron%20La%20Cueva">
                <paper-button class="primary">Pedir</paper-button>
              </a>
            </div>
          </div>
        </div>
        <div class="inventory-card">
          <iron-image src="/images/bottles/Smirnoff-100.jpg" preload="" sizing="contain"></iron-image>
          <div class="vertical">
            <div class="info">
              <span class="font-caption">Vodka</span>
              <span class="font-title">Smirnoff</span>
              <span> <b>Alcohol:</b>  40%</span>
              <span> <b>Alias:</b> N/A</span>
              <span> <b>Mezclar con:</b> Jugo de Naranja</span>
            </div>
            <div class="flex"></div>
            <div class="vertical bordered">
              <a class="self-end" target="_blank" href="https://api.whatsapp.com/send?phone=593998093257&amp;text=Hola%2C%20ay%C3%BAdame%20con%20Smirnoff">
                <paper-button class="primary">Pedir</paper-button>
              </a>
            </div>
          </div>
        </div>
        <div class="other">
          <div class="info">
            <span class="font-display1">¿No te gustan estos tragos?</span>
            <a class="self-end" target="_blank" href="https://goo.gl/forms/Db5rckCRax87JMHT2">Ayúdanos a elegir y gana \$20</a>
          </div>
        </div>
      </div>
    </div>
`;
  }

  static get is() { return 'inventory-view'; }
  static get properties(){
    return {

    }
  }
  connectedCallback(){
    super.connectedCallback();
    document.title='Nuestro Inventario | Chupemos.com';
    document.querySelector('meta[name=description]').content='El inventario de nuestros licores. Entrega a domicilio gratuita en el norte de Quito.';
  }
}

window.customElements.define(InventoryView.is, InventoryView);
