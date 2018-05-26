/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { PolymerElement , html } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-button/paper-button.js';
import '../elements/phone-input.js';
import '../shared-styles.js';
import {ReduxMixin} from '../redux/global-store.js';

class StartView extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles">
      :host {
        display: block;
      }
      div.initial{
        height: calc(100vh - 64px);
        padding: 10px;
        @apply --layout-vertical;
      }
      h1{
        font-family: 'Roboto', sans-serif;
        color: var(--primary-text-color);
        -webkit-font-smoothing: antialiased;
        font-size: 56px;
        font-weight: 300;
        letter-spacing: -.026em;
        line-height: 60px;
      }
      .primary-text{
        color: var(--primary-color);
      }

    </style>
    <div class="initial">
      <h1>Haz que te <br> <b class="primary-text">rinda</b> <br>  la vaca... </h1>
      <phone-input id="phoneInput"></phone-input>
      <paper-button raised="" class="primary self-center" on-tap="nextPage">
        <span>Yaff... Chupemos</span>
        <iron-icon icon="custom:chevron-right"></iron-icon>
      </paper-button>
      <a hidden\$="[[!phone]]" class="self-center m1-y" href="/items">Pedir como [[phone]]</a>
      <div class="flex"></div>
      <span>*Entrega gratuita en el Norte de Quito!</span>
    </div>
`;
  }

  static get is() { return 'start-view'; }
  static get properties(){
    return{
      phone:{
        type:String,
        value:null,
        statePath:'client.phone'
      }
    }
  }
  static get actions(){
    return{
      setPhone:function(phone){
        return {type:'SET_PHONE',phone:phone}
      }
    }
  }
  nextPage(){
    if(this.$.phoneInput.validate()){
      this.dispatch('setPhone',this.$.phoneInput.value);
      redirect('/items');
    }
  }
}

window.customElements.define(StartView.is, StartView);
