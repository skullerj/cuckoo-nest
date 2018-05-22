import { PolymerElement , html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-storage/app-indexeddb-mirror/app-indexeddb-mirror.js';
import {ReduxMixin} from '../redux/global-store.js';

class ClientInfo extends ReduxMixin(PolymerElement){
  static get template() {
    return html`
    <app-indexeddb-mirror key="client" data="{{liveClient}}" persisted-data="{{persistedClient}}">
    </app-indexeddb-mirror>
`;
  }

  static get is(){
    return 'client-info';
  }
  static get properties(){
    return {
      clientPhone:{
        type:String,
        statePath:'client.phone'
      },
      /**
      *The client info from frirestore
      */
      liveClient:{
        type:Object,
        doc:'client/{clientPhone}',
        live:false
      },
      /**
      *The cached version of the client
      */
      persistedClient:{
        type:Object,
        observer:'_observePersistedClient'
      },
      /**
      *In memory data from client
      */
      client:{
        type:Object,
        statePath:'client',
        observer:'_observeClient'
      }
    }
  }
  static get actions(){
    return{
      loadLocations:function(locations){
        return {type:'LOAD_LOCATIONS',locations:locations}
      }
    }
  }
  /**
  *Compares two location arrays and return true if they contain the same info
  */
  compareLocations(loc1,loc2){
    if(!loc1||!loc2){
      return true;
    }
    var areEqual=true;
    if(loc1.length!==loc2.length){
      areEqual=false;
    }
    for(var i = 0; i<loc1.length;i++){
      if(loc1[i].lat!==loc[2].lat||loc1[i].lon!==loc[2].lon){
        areEqual=false;
      }
    }
    return areEqual;
  }
  _observePersistedClient(newVal){
    if(!newVal)return;
    this.dispatch('loadLocations',newVal.locations);
  }
  _observeClient(newVal){
    if(!newVal)return;
    if(!this.compareLocations(newVal,this.client.location)){
      console.log('se escribe en la base de datos las ubicaciones del usuario');
    }
  }
}
customElements.define(ClientInfo.is,ClientInfo);
