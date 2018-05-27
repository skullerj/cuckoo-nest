export const items=(state={},action)=>{
  switch (action.type) {
    case 'LOAD_ITEMS':
      return Object.assign({},state,action.items);
      break;
    default:
      return state;
  }
};
export const bundles=(state=[],action)=>{
  switch (action.type) {
    case 'LOAD_BUNDLES':
      return Object.assign({},state,action.bundles);;
      break;
    default:
      return state;
  }
};
