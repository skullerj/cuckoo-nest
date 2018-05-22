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
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/iron-pages/iron-pages.js';
import {OrderActions} from '../redux/actions/order-actions.js';
import '../shared-styles.js';
import '../elements/item-card.js';
import '../elements/bundle-card.js';
class ItemsView extends OrderActions(PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles app-grid-style">
      :host {
        display: block;
        --app-grid-columns: 1;
        --app-grid-gutter: 12px;
        --app-grid-expandible-item-columns: 2;
      }
      div.nav{
        height: 64px;
        width: 100%;
        background-color: var(--light-primary-color);
      }
      div.outer-items{
        width: 100%;
        overflow: auto;
        padding-bottom: 64px;
      }
      span.b-price{
        @apply --paper-font-title;
      }
      span.b-subprice{
        @apply --paper-font-caption;
      }
      div.top{
        @apply --layout-vertical;
        background-color: var(--secondary-color);
        color: var(--on-secondary-text-color);
      }
      paper-tab{
        --paper-tab-ink: var(--primary-color);
      }
      paper-tabs{
        --paper-tabs-selection-bar-color:var(--primary-color);
        background-color: var(--secondary-color);
        color: var(--on-secondary-text-color);
      }
    </style>
    <div class="top">
      <div class="horizontal p1">
        <span class="font-title">Arma tu pedido</span>
        <div class="flex"></div>
        <span class="font-caption">Paso 1/3</span>
      </div>
      <paper-tabs selected="{{tab}}" attr-for-selected="tab">
        <paper-tab tab="s">Solanas</paper-tab>
        <paper-tab tab="c">Combos</paper-tab>
        <paper-tab tab="e">Extras</paper-tab>
      </paper-tabs>
    </div>
    <iron-pages selected="[[tab]]" attr-for-selected="tab">
      <section tab="s">
        <div class="outer-items app-grid">
          <template is="dom-repeat" items="[[items]]">
            <item-card item="[[item]]"> </item-card>
          </template>
        </div>
      </section>
      <section tab="c">
        <div class="outer-items app-grid">
          <template is="dom-repeat" items="[[bundles]]">
            <bundle-card bundle="[[item]]"></bundle-card>
          </template>
        </div>
      </section>
      <section tab="e">
        <div class="outer-items app-grid">
          <template is="dom-repeat" items="[[bundles]]">
            <item-card item="[[item]]"></item-card>
          </template>
        </div>
      </section>
    </iron-pages>
    <div class="bottom">
      <paper-icon-button icon="custom:chevron-left" class="self-center m1-r" on-tap="backPage"></paper-icon-button>
      <div class="vertical flex"></div>
      <paper-button class="self-center primary" on-tap="nextPage" raised="">
        <span>Yaff.. sigamos</span>
        <iron-icon icon="custom:chevron-right"></iron-icon>
      </paper-button>
    </div>
`;
  }

  static get is() { return 'items-view'; }
  static get properties(){
    return {
      tab:{
        type:String,
        value:'s'
      }
    }
  }
  nextPage(){
    redirect('/location');
  }
  backPage(){
    redirect('/')
  }
}

window.customElements.define(ItemsView.is, ItemsView);
