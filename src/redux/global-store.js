import PolymerRedux from 'polymer-redux';
import './reducers/order-reducer.js';
import './reducers/client-reducer.js';
import './reducers/items-reducer.js';
import 'redux/dist/redux.min.js';
import 'redux-thunk/dist/redux-thunk.min.js';
export function redirect(location){
  window.history.pushState({}, null, location);
  window.dispatchEvent(new CustomEvent('location-changed'));
}
export function message(message,duration){
  window.dispatchEvent(new CustomEvent('show-message',{detail:{message:message,duration:duration}}));
}
//GlobalActionMixin
export const GAMixin = (superclass)=>{
  return class extends superclass {
    constructor(){
      super();
    }
    static get actions(){
      return{
        changePage:(page)=>{
          return {type:'PAGE_CHANGE',page:page};
        }
      }
    }
  }
};
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
const reducer=(state={},action)=>{
  return{
    page:page(state.page,action),
    loading:loading(state.loading,action),
    order:order(state.order,action),
    client:client(state.client,action),
    items:items(state.items,action),
    bundles:bundles(state.bundles,action)
  }
};

const store = Redux.createStore(
  reducer,
  Redux.applyMiddleware(ReduxThunk.default),
  // The best part 8)
  Redux.compose(
    window.devToolsExtension
      ? window.devToolsExtension()
      : v => v
  )
);

export const ReduxMixin = PolymerRedux(store);
