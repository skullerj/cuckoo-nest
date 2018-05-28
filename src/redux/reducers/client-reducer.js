export const client = (state={
  phone:undefined,
  locations:[]
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
    default:
      return state;
  }
}
