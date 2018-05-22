import { PolymerElement , html } from '@polymer/polymer/polymer-element.js';
import {ReduxMixin} from '../redux/global-store.js';

class OrderInfo extends ReduxMixin(PolymerElement){
  static get template() {
    return html`

`;
  }

  static get is(){
    return 'order-info';
  }
  static get properties(){
    return {
      /**
      *The order id that will be queried
      */
      orderId:{
        type:String,
        notify:true
      },
      /**
      *The order info from frirestore
      */
      order:{
        type:Object,
        doc:'order/{orderId}',
        notify:true,
        live:true
      }
    }
  }
  static get actions(){
    return{
      removePendant:function(orderId){
        return {type:'REMOVE_PENDANT_ORDER',order:orderId}
      }
    }
  }
  static get observers(){
    return ['_watchOrderState(order.state)']
  }
  _watchOrderState(state){
    console.log(state);
  }
}
customElements.define(OrderInfo.is,OrderInfo);
