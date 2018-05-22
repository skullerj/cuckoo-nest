import { PolymerElement , html } from '@polymer/polymer/polymer-element.js';
import {ReduxMixin} from '../redux/global-store.js';

class ItemsData extends ReduxMixin(PolymerElement){
  static get template() {
    return html`

`;
  }

  static get is(){
    return 'items-data';
  }
  static get properties(){
    return {
      /**
      *Live items from firestore
      */
      items:{
        type:Array,
        collection:'item',
        noCache:true,
        observer:'_observeItems'
      },
      /**
      *Live bundles from firestore
      */
      bundles:{
        type:Array,
        collection:'bundle',
        noCache:true,
        observer:'_observeBundles'
      }
    }
  }
  static get actions(){
    return{
      loadItems:function(items){
        return {type:'LOAD_ITEMS',items:items}
      },
      loadBundles:function(bundles){
        return {type:'LOAD_BUNDLES',bundles:bundles}
      }
    }
  }
  _observeItems(newVal){
    if(!newVal)return;
    this.dispatch('loadItems',newVal);
  }
  _observeBundles(newVal){
    if(!newVal)return;
    this.dispatch('loadBundles',newVal);
  }
}
customElements.define(ItemsData.is,ItemsData);
