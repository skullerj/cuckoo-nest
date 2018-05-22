import '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-styles/typography.js';
import '@polymer/paper-styles/shadow.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>
      [hidden]{
        display: none !important;
      }
      * {
        box-sizing: border-box;
      }
      /* Flex classes */
      .vertical{
        @apply(--layout-vertical);
      }
      .horizontal{
        @apply(--layout-horizontal);
      }
      .center{
        @apply(--layout-center-center);
      }
      .justified{
        @apply --layout-around-justified;
      }
      .wrap{
        @apply --layout-wrap;
      }
      .wrap-reverse{
        @apply --layout-wrap-reverse;
      }
      .flex{
        @apply(--layout-flex);
      }
      .flex-2{
        @apply(--layout-flex-2);
      }
      .flex-3{
        @apply(--layout-flex-3);
      }
      .flex-4{
        @apply(--layout-flex-4);
      }
      .self-start{
        @apply(--layout-self-start);
      }
      .self-end{
        @apply(--layout-self-end);
      }
      .self-center{
        @apply(--layout-self-center);
      }
      /* Paper fonts */
      .font-title{
        @apply(--paper-font-title);
      }
      .font-headline{
        @apply(--paper-font-headline);
      }
      .font-subhead{
        @apply(--paper-font-subhead);
      }
      .font-caption{
        @apply(--paper-font-caption);
      }
      .font-display1{
        @apply(--paper-font-display1);
        color: rgba(0,0,0,0.54);
      }
      .font-display2{
        @apply(--paper-font-display2);
        color: rgba(0,0,0,0.54);
      }
      .font-display3{
        @apply(--paper-font-display3);
        color: rgba(0,0,0,0.54);
      }
      .font-display4{
        @apply(--paper-font-display4);
        color: rgba(0,0,0,0.54);
      }
      /* Buttons */
      paper-button.primary{
        color: var(--primary-color);
        background-color: inherit;
      }
      paper-button[raised].primary{
        color: var(--on-primary-text-color);
        background-color: var(--primary-color);
      }
      paper-button.accent{
        color: var(--accent-color);
        background-color: inherit;
      }
      paper-button[raised].accent{
        color: var(--on-secondary-text-color);
        background-color: var(--accent-color);
      }
      a, a:active, a:visited, a:focus { color: var(--primary-color); text-decoration: none; }
      a:hover { color: var(--primary-color); text-decoration: none; }
      /* Margins and paddings */
      .m1{
        margin: 0.5rem;
      }
      .m1-x{
        margin: 0 0.5rem;
      }
      .m1-y{
        margin: 0.5rem 0;
      }
      .m2{
        margin: 1rem;
      }
      .m2-x{
        margin: 0 1rem;
      }
      .m2-y{
        margin: 1rem 0;
      }
      .m3{
        margin: 1.5rem;
      }
      .m3-x{
        margin: 0 1.5rem;
      }
      .m3-y{
        margin: 1.5rem 0;
      }
      .p1{
        padding: 0.5rem;
      }
      .p1-x{
        padding: 0 0.5rem;
      }
      .p1-y{
        padding: 0.5rem 0;
      }
      .p2{
        padding: 1rem;
      }
      .p2-x{
        padding: 0 1rem;
      }
      .p2-y{
        padding: 1rem 0;
      }
      .p3{
        padding: 1.5rem;
      }
      .p3-x{
        padding: 0 1.5rem;
      }
      .p3-y{
        padding: 1.5rem 0;
      }
      .p1-t{
        padding-top: 0.5rem;
      }
      .p2-t{
        padding-top: 1rem;
      }
      .p3-t{
        padding-top: 1.5rem;
      }
      .p1-b{
        padding-bottom: 0.5rem;
      }
      .p2-b{
        padding-bottom: 1rem;
      }
      .p3-b{
        padding-bottom: 1.5rem;
      }
      .p1-l{
        padding-left: 0.5rem;
      }
      .p2-l{
        padding-left: 1rem;
      }
      .p3-l{
        padding-left: 1.5rem;
      }
      .p1-r{
        padding-right: 0.5rem;
      }
      .p2-r{
        padding-right: 1rem;
      }
      .p3-r{
        padding-right: 1.5rem;
      }
      .m1-t{
        margin-top: 0.5rem;
      }
      .m2-t{
        margin-top: 1rem;
      }
      .m3-t{
        margin-top: 1.5rem;
      }
      .m1-b{
        margin-bottom: 0.5rem;
      }
      .m2-b{
        margin-bottom: 1rem;
      }
      .m3-b{
        margin-bottom: 1.5rem;
      }
      .m1-l{
        margin-left: 0.5rem;
      }
      .m2-l{
        margin-left: 1rem;
      }
      .m3-l{
        margin-left: 1.5rem;
      }
      .m1-r{
        margin-right: 0.5rem;
      }
      .m2-r{
        margin-right: 1rem;
      }
      .m3-r{
        margin-right: 1.5rem;
      }
      .h-100{
        height: 100%;
      }
      .w-100{
        width: 100%;
      }
      /* Specific styles */
      .card {
        @apply --shadow-elevation-2dp;
        background-color: #fff;
        padding: 1rem;
        border-radius: 2px;
      }
      .bottom{
        z-index: 20;
        padding: 8px;
        height: 64px;
        position: fixed;
        bottom: 0px;
        left: 0px;
        width: 100%;
        background-color: var(--secondary-color);
        color: var(--on-secondary-text-color);
        @apply --layout-horizontal;
        @apply --shadow-elevation-2dp;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);

/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/* shared styles for all views */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
;
