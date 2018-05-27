import {ReduxMixin} from '../global-store.js';

export const OrderActions = (parent)=>{
  return class extends ReduxMixin(parent){
    static get actions(){
      return {
        resetOrder:()=>{
          return {type:'RESET_ORDER'};
        }
      }
    }
    static get properties(){
      return {
        order:{
          type:Object,
          statePath:'order'
        },
        items:{
          type:Object,
          statePath:'items'
        },
        itemsArray:{
          type:Array,
          statePath:(state)=>{
            var result = [];
            Object.keys(state.items).forEach((key)=>{
              result.push(Object.assign({},state.items[key],{id:key}));
            });
            return result;
          }
        },
        bundles:{
          type:Object,
          statePath:'bundles'
        },
        bundlesArray:{
          type:Array,
          statePath:(state)=>{
            var result = [];
            Object.keys(state.bundles).forEach((key)=>{
              result.push(Object.assign({},state.bundles[key],{id:key}));
            });
            return result;
          }
        },
        prices:{
          type:Array,
          statePath:(state)=>{
            var prices={};
            Object.keys(state.items).forEach((key)=>{
              prices[key]=state.items[key].price;
            });
            return prices;
          }
        },
        total:{
          type:Number,
          statePath:(state)=>{
            var order=state.order,
                result=0;
            order.items.forEach((item)=>{
              result+=state.items[item].price;
            });
            order.bundles.forEach((bundle)=>{
              result+=state.bundles[item].price;
            });
            return result;
          }
        },
        orderItems:{
          type:Array,
          statePath:(state)=>{
            var result = [];
            state.order.items.forEach((key)=>{
              result.push(Object.assign({},state.items[key],{id:key}));
            });
            return result;
          }
        },
        orderBundles:{
          type:Array,
          statePath:(state)=>{
            var result = [];
            state.order.bundles.forEach((key)=>{
              result.push(Object.assign({},state.bundles[key],{id:key}));
            });
            return result;
          }
        }
      }
    }
  }

}
