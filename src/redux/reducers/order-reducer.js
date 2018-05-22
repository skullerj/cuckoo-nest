const initialOrder={
  id:null,
  client:null,
  location:{
    lat:null,
    lon:null,
    directions:null
  },
  items:[],
  bundles:[],
  discounts:[],
  createdAt:null,
  confirmedAt:null,
  deliveredAt:null,
  createdBy:null,
  deliveredBy:null,
  rating:0,
  state:'new'
};
const order = (state=initialOrder,action)=>{
  switch (action.type) {
    case 'LOAD_ORDER':
      return Object.assign({},initialOrder,action.order);
    break;
    case 'RESET_ORDER':
      return Object.assign({},initialOrder);
    break;
    case 'ADD_ITEM':
      return Object.assign({},state,{items:[...state.items,action.item]});
    break;
    case 'ADD_BUNDLE':
      return Object.assign({},state,{bundles:[...state.bundles,action.bundle]});
    break;
    case 'REMOVE_ITEM':
      var found = false;
      var newItems = state.items.reduce((res,item)=>{
        if(item!==action.item){
          res.push(item);
        }else{
          //this extra step allows to only remove one item at a time
          if(found){
            res.push(item);
          }else{
            found=true;
          }
        }
        return res
      },[]);
      return Object.assign({},state,{items:newItems});
    break;
    case 'REMOVE_BUNDLE':
      var found = false;
      var newBundles = state.bundles.reduce((res,bundle)=>{
        if(bundle!==action.bundle){
          res.push(bundle);
        }else{
          //this extra step allows to only remove one bundle at a time
          if(found){
            res.push(bundle);
          }else{
            found=true;
          }
        }
        return res;
      },[]);
      return Object.assign({},state,{bundles:newBundles});
    break;
    case 'SET_LOCATION':
      var newLocation = Object.assign({},state.location,{lat:action.lat,lon:action.lon});
      return Object.assign({},state,{location:newLocation});
    break;
    default:
      return state;
  }
}
