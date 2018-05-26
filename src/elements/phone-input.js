import { PolymerElement , html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-input/iron-input.js';

class PhoneInput extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host{
        display: block;
        width: 100%;
      }
      input{
        background-color : #fff;
        box-sizing: border-box;
        border-radius: 4px;
        width: 100%;
        padding-right: 16px;
        padding-left: 20px;
        line-height: 40px;
        border: none;
        margin: 0;
        font-size: 16px;
        -webkit-appearance: none;
        text-align: center;
        color: var(--primary-text-color);
      }
      input[invalid]{
        border:1px solid var(--error-color);
      }
      [hidden]{
        display: none !important;
      }
      .container{
        width: 100%;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -ms-flex-direction: column;
        -webkit-flex-direction: column;
        flex-direction: column;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
      }
      .error-text{
        color: var(--error-color);
        font-size: 12px;
      }
    </style>
    <div class="container">
      <iron-input id="ironInput" bind-value="{{value}}" on-iron-input-validate="validatePhone" allowed-pattern="[0-9]" >
        <input type="text" placeholder="[[label]]" invalid$="[[!validPhone]]">
      </iron-input>
      <span hidden$="[[validPhone]]" class="error-text">Ese no parece un número de celuar</span>
    </div>
`;
  }

  static get is(){
    return 'phone-input';
  }
  static get properties(){
    return {
      //The input value
      value:{
        type:String,
        value:'',
        notify:true
      },
      //The input's placeholder text
      label:{
        type:String,
        value:'Número de celular'
      },
      validPhone:{
        type:Boolean,
        value:true
      }
    }
  }
  validate(){
    var phone=this.$.ironInput.bindValue;
    var valid=false;
    if(phone.length===10){
      if(phone[0]==='0'&&phone[1]==='9'){
        valid=true;
      }
    }
    this.validPhone=valid;
    return valid;
  }
}
customElements.define(PhoneInput.is,PhoneInput);
