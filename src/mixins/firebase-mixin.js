export default (superclass)=>{
  return class extends superclass{
    static get properties(){
      return{
        db:{
          type:Object,
          value:()=>{
            if(typeof firebase.firestore === 'function'){
              return firebase.firestore();
            }else{
              console.error('No se ha cargado el SDK de firestore');
              return null;
            }
          }
        },
      }
    }
  }
}
