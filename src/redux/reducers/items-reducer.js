const items=(state=[],action)=>{
  switch (action.type) {
    case 'LOAD_ITEMS':
      return [...action.items];
      break;
    default:
      return state;
  }
};
const bundles=(state=[],action)=>{
  switch (action.type) {
    case 'LOAD_BUNDLES':
      return [...action.bundles];
      break;
    default:
      return state;
  }
};