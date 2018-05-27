import { PolymerElement , html } from '@polymer/polymer/polymer-element.js';

class FirebaseData extends PolymerElement {
  static get template() {
    return html``;
  }
  static get is(){
    return 'firebase-data';
  }
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
      //Describes the type of data that will be fetched. Can be doc (document) or col (collection)
      type:{
        type:String,
        value:'doc'
      },
      //Describes the path to find each collection/document
      path:{
        type:String,
        value:''
      },
      //The document that results from fetch in case type=doc
      doc:{
        type:Object,
        value:()=>{return {};}
      },
      //The collection that results from fetch in case type=col
      col:{
        type:Array,
        value:()=>{return [];}
      },
      ref:{
        type:Object,
        value:()=>{return null};
      },
      //Wether the value should be watched for changes
      live:{
        type:Boolean,
        value:false
      }
    }
  }

  static get observers(){
    return [];
  }

  connectedCallback(){
    super.connectedCallback();
    //Initialize the value and its listeners
  }

  _setUpData(){

  }

  _setDocOrCol(value){
    if(this.type==='doc'){
      this.set('doc',value);
    }else{
      this.set('col',value);
    }
  }

}
