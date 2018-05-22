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
    </style>
    <iron-input>
      <input type="text" name="" value="">
    </iron-input>
`;
  }

  static get is(){
    return 'phone-input';
  }
}
customElements.define(PhoneInput.is,PhoneInput);
