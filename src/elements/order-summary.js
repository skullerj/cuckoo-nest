import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import {OrderActions} from '../redux/actions/order-actions.js';
import '../shared-styles.js';

import { PolymerElement , html } from '@polymer/polymer/polymer-element.js';
class OrderSummary extends OrderActions(PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles">
      :host{
        height: 100%;
      }
      .outer{
        @apply --layout-vertical;
        color: var(--primary-text-color);
        height: 100%;
      }
      app-toolbar{
        background-color: var(--primary-color);
        color: var(--white-primary-text-color);
        height: 64px;
      }
      .inner{
        @apply --layout-vertical;
        @apply --layout-flex;
      }
      div.bordered{
        border-bottom: 1px solid rgba(0,0,0,0.3)
      }
      div.number{
        @apply --layout-horizontal;

      }
      div.items{
        @apply --layout-vertical;
        height: 325px;
        background-color: var(--secondary-color);
        color: var(--secondary-text-color);
      }
      div.item{
        height: 60px;
        @apply --layout-horizontal;
        background-color: var(--light-secondary-color);
        padding: 0.5rem;
      }
    </style>
    <div class="outer">
      <app-toolbar>
        <div main-title="">Mi Pedido</div>
      </app-toolbar>
      <div class="inner">
        <span class="font-caption p1-x p1-t">Mi Número</span>
        <div class="number p1-x">
          <div class="flex"></div>
          <paper-icon-button icon="custom:edit"></paper-icon-button>
          <span class="self-center font-title">[[client.phone]]</span>
        </div>
        <div class="items">
          <span class="font-caption m1">Mis botellas</span>
          <template is="dom-repeat" items="[[orderItems]]">
            <div class="item">
              <paper-icon-button icon="custom:remove-circle" class="self-center" on-tap="removeItem"></paper-icon-button>
              <div class="vertical flex">
                <span>[[item.name]]</span>
                <span class="text-primary">[[item.price]]</span>
              </div>
            </div>
          </template>
          <template is="dom-repeat" items="[[orderBundles]]">
            <div class="item">
              <paper-icon-button icon="custom:remove-circle" class="self-center" on-tap="removeBundle"></paper-icon-button>
              <div class="vertical flex">
                <span>[[item.name]]</span>
                <span class="text-primary">[[item.price]]</span>
              </div>
            </div>
          </template>
        </div>
        <div class="horizontal p1">
          <div class="flex"></div>
          <span class="font-title">Total: \$[[total]]</span>
        </div>
      </div>

      <div class="horizontal">
        <div class="flex"></div>
        <paper-button>Cancelar Pedido</paper-button>
      </div>
    </div>
`;
  }

  static get is(){
    return 'order-summary';
  }
  static get properties(){
    return {
      client:{
        type:Object,
        statePath:'client'
      }
    }
  }
  static get actions(){
    return {
      removeItem:(itemId)=>{
        return {type:'REMOVE_ITEM',item:itemId};
      },
      removeBundle:(bundleId)=>{
        return {type:'REMOVE_BUNDLE',bundle:bundleId};
      }
    }
  }
  removeItem(e){
    this.dispatch('removeItem',e.model.__data.item.id);
  }
  removeBundle(e){
    this.dispatch('removeBundle',e.model.__data.item.id);
  }
}
customElements.define(OrderSummary.is,OrderSummary);
