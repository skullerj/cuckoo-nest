import {client} from './client-reducer.js';
import {items,bundles} from './items-reducer.js';
import {order} from './order-reducer.js';


const page = (state='start',action)=>{
    switch (action) {
      case 'PAGE_CHANGE':
          return action.page;
        break;
      default:
        return state;
    }
}
const loading = (state=false,action)=>{
    switch (action) {
      case 'LOADING':
          return true;
        break;
      case 'LOADED':
          return false;
        break;
      default:
        return state;
    }
}

export default (state={},action)=>{
  return{
    page:page(state.page,action),
    loading:loading(state.loading,action),
    order:order(state.order,action),
    client:client(state.client,action),
    items:items(state.items,action),
    bundles:bundles(state.bundles,action)
  }
};
