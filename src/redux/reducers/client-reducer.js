const client = (state={
  phone:undefined,
  locations:[],
  pendantOrders:[]
},action)=>{
  switch (action.type) {
    case 'SET_PHONE':
      return Object.assign({},state,{phone:action.phone});
      break;
    case 'LOAD_LOCATIONS':
      return Object.assign({},state,{locations:[...action.locations].slice(0,3)});
      break;
    case 'ADD_LOCATION':
      return Object.assign({},state,{locations:[action.location,...state.locations].slice(0,3)});
      break;
    case 'ADD_PENDANT_ORDER':
      return Object.assign({},state,{pendantOrders:[action.order,...state.pendantOrders]});
      break;
    case 'REMOVE_PENDANT_ORDER':
      var newOrders = state.pendantOrders.reduce((res,ord)=>{
        if(ord!==action.order){
          res.push(ord);
        }
      },[]);
      return Object.assign({},state,{pendantOrders:newOrders});
      break;  
    default:
      return state;
  }
}
