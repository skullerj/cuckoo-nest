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
          type:Array,
          statePath:'items'
        },
        bundles:{
          type:Array,
          statePath:'bundles'
        },
        pricesMap:{
          type:Array,
          statePath:(state)=>{
            return state.items.reduce((res,item)=>{
              res[item.__id__]=item.price;
              return res;
            },{});
          }
        },
        total:{
          type:Number,
          statePath:(state)=>{
            var order=state.order,
                result=0;
            //Avoid computation when there is no items
            if(order.items.length===0&&order.bundles.length===0){
              return 0;
            }
            var itemPriceMap=state.items.reduce((res,item)=>{
              res[item.__id__]=item.price;
              return res;
            },{});
            var bundlePriceMap=state.bundles.reduce((res,bundle)=>{
              res[bundle.__id__]=bundle.price;
              return res;
            },{});
            order.items.forEach((item)=>{
              result+=itemPriceMap[item];
            });
            order.bundles.forEach((bundle)=>{
              result+=bundlePriceMap[bundle];
            });
            return result;
          }
        },
        orderItems:{
          type:Array,
          statePath:(state)=>{
            if(state.order.items.length===0){
              return [];
            }
            var itemMap=state.items.reduce((res,item)=>{
              res[item.__id__]=item;
              return res;
            },{});
            var qty = state.order.items.reduce((res,item)=>{
              res[item]=res[item]||0;
              res[item]=res[item]+1;
              return res;
            },{});
            var result = [];
            Object.keys(qty).forEach((key)=>{
              result.push({
                info:itemMap[key],
                qty:qty[key],
              });
            });
            return result;
          }
        },
        orderBundles:{
          type:Array,
          statePath:(state)=>{
            if(state.order.bundles.length===0){
              return [];
            }
            var bundleMap=state.bundles.reduce((res,item)=>{
              res[item.__id__]=item;
              return res;
            },{});
            var qty = state.order.bundles.reduce((res,item)=>{
              res[item]=res[item]||0;
              res[item]=res[item]+1;
              return res;
            },{});
            var result = [];
            Object.keys(qty).forEach((key)=>{
              result.push({
                info:bundleMap[key],
                qty:qty[key],
              });
            });
            return result;
          }
        }
      }
    }
  }

}
