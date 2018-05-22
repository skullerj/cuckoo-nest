/* `<localstorage-manager>` is in charge of saving the parts of the global state that
need to be persisted on the local storage.

*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/polymer-element.js';
import {ReduxMixin} from '../redux/global-store.js';

import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';
class LocalstorageManager extends ReduxMixin(PolymerElement){
  static get template() {
    return html`
    <app-localstorage-document key="phone" data="{{storedPhone}}">
    <app-localstorage-document key="order" data="{{storedOrder}}">
`;
  }

  static get is(){
    return 'localstorage-manager';
  }
  static get properties(){
    return{
      phone:{
        type:String,
        statePath:'client.phone',
        observer:'_observePhone'
      },
      storedPhone:{
        type:String,
        observer:'_observeStoredPhone'
      },
      order:{
        type:Object,
        statePath:'order',
        observer:'_observeOrder'
      },
      storedOrder:{
        type:Object,
        observer:'_observeStoredOrder'
      },
      /**
      *Whether the order has been loaded to memory
      */
      orderLoaded:{
        type:Boolean,
        value:false
      }
    }
  }
  static get actions(){
    return{
      setPhone:function(phone){
        return {type:'SET_PHONE',phone:phone};
      },
      loadOrder:function(order){
        return {type:'LOAD_ORDER',order:order};
      }
    }
  }
  _observePhone(newVal,oldVal){
    if(newVal){
      this.storedPhone=newVal;
    }
  }
  _observeStoredPhone(newVal,oldVal){
    if(newVal){
      this.dispatch('setPhone',newVal);
    }
  }
  /**
  *Check if the order is empty or not
  */
  orderNotEmpty(order){
    if(order && typeof order === 'object'){
      if(order.items.length>0){
        return true;
      }
    }
    return false;
  }
  _observeOrder(newVal){
    if(newVal){
      this.storedOrder=newVal;
    }
  }
  _observeStoredOrder(newVal){
    if(this.orderNotEmpty(newVal)&&!this.orderLoaded){
      this.orderLoaded=true;
      this.dispatch('loadOrder',newVal);
    }
  }
}
window.customElements.define(LocalstorageManager.is, LocalstorageManager);
