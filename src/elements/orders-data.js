import { PolymerElement , html } from '@polymer/polymer/polymer-element.js';
import {ReduxMixin} from '../redux/global-store.js';
import FirebaseMixin from '../mixins/firebase-mixin.js';

class OrdersData extends FirebaseMixin(ReduxMixin(PolymerElement)){
  static get template() {
    return html``;
  }

  static get is(){
    return 'orders-data';
  }
  static get properties(){
    return {
      phone:{
        type:String,
        statePath:(state)=>{
          return state.client.phone;
        },
        observer:'_setUpOrders'
      }
    }
  }
  static get actions(){
    return{
      loading:function(load){
        return {type:'SET_OLDORD_LOADING',loading:load}
      },
      setOrder:function(id,order){
        return {type:'UPDATE_ORDER',id:id,order:order};
      }
    }
  }

  _setUpOrders(phone,oldPhone){
    if(!phone)return;
    if(phone===oldPhone)return;
    this.dispatch('loading',true);
    this.db.collection('order').where('phone','==',phone).orderBy('createdAt','desc').limit(5)
      .onSnapshot((querySnapshot)=>{
        var isLoading=false;
        querySnapshot.forEach((doc)=>{
          isLoading=isLoading||doc.metadata.hasPendingWrites;
          this.dispatch('setOrder',doc.id,doc.data());
        });
        this.dispatch('loading',isLoading);
      });
  }

}
customElements.define(OrdersData.is,OrdersData);
