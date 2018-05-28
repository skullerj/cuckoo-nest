/**
 * This is one-to-one the PWA Shell from Polymer Starter Kit. Why? Because this is the shell
 * that the function needs to return since the function is where we start and since we can't fallback
 * route in Firebase config. Ugly, yet suprisingly effective.
 * @param {Object} opts
 */
const pwaShell = function(opts) {
  return `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="generator" content="Polymer Starter Kit">
      <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">

      <title>Chupemos</title>
      <meta name="description" content="Plataforma en línea para pedir licor o trago a domicilio">

      <base href="/">

      <link rel="icon" href="images/favicon.ico">

      <!-- See https://goo.gl/OOhYW5 -->
      <link rel="manifest" href="manifest.json">

      <!-- See https://goo.gl/qRE0vM -->
      <meta name="theme-color" content="#ff5722">

      <!-- Add to homescreen for Chrome on Android. Fallback for manifest.json -->
      <meta name="mobile-web-app-capable" content="yes">
      <meta name="application-name" content="Chupemos">

      <!-- Add to homescreen for Safari on iOS -->
      <meta name="apple-mobile-web-app-capable" content="yes">
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
      <meta name="apple-mobile-web-app-title" content="My App">

      <!-- Homescreen icons -->
      <link rel="apple-touch-icon" href="images/manifest/icon-48x48.png">
      <link rel="apple-touch-icon" sizes="72x72" href="images/manifest/icon-72x72.png">
      <link rel="apple-touch-icon" sizes="96x96" href="images/manifest/icon-96x96.png">
      <link rel="apple-touch-icon" sizes="144x144" href="images/manifest/icon-144x144.png">
      <link rel="apple-touch-icon" sizes="192x192" href="images/manifest/icon-192x192.png">

      <!-- Tile icon for Windows 8 (144x144 + tile color) -->
      <meta name="msapplication-TileImage" content="images/manifest/icon-144x144.png">
      <meta name="msapplication-TileColor" content="#D84315">
      <meta name="msapplication-tap-highlight" content="no">

      <script>
        window.AppGlobals = {rootPath: '/'};

        // Load and register pre-caching Service Worker
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', function() {
            navigator.serviceWorker.register('service-worker.js', {
              scope: AppGlobals.rootPath,
            });
          });
        }
      </script>

      <!-- Google Analytics -->
      <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        ga('create', 'UA-113163634-1', 'auto');
        ga('send', 'pageview');
        window.addEventListener('location-changed', function() {
          ga('set', 'page', window.location.pathname);
          ga('send', 'pageview');
        });
      </script>

      <!-- Load webcomponents-loader.js to check and load any polyfills your browser needs -->
      <script src="/node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>

      <script>
        //Define this variable so redux import works
        const process={env:{NODE_ENV:null}};
        //Commonly used functions that will be useful all arround the app
        function redirect(location){
          window.history.pushState({}, null, location);
          window.dispatchEvent(new CustomEvent('location-changed'));
        }
        function message(message,duration){
          window.dispatchEvent(new CustomEvent('show-message',{detail:{message:message,duration:duration}}));
        }
      </script>

      <!-- Load your application shell -->
      <script type="module" src="/src/chup-app.js"></script>

      <!-- Firebase components -->
      <script src="https://www.gstatic.com/firebasejs/4.10.1/firebase-app.js"></script>
      <script src="https://www.gstatic.com/firebasejs/4.10.1/firebase-firestore.js"></script>
      <script>
        const firebaseConfig = {
          prod:{
            apiKey: "AIzaSyDYnUpB1FcnU7jmr6cvIkp8_YM9QlPufGQ",
            authDomain: "chupemos-193122.firebaseapp.com",
            databaseURL: "https://chupemos-193122.firebaseio.com",
            projectId: "chupemos-193122",
            storageBucket: "chupemos-193122.appspot.com",
            messagingSenderId: "760631908691"
          },
          test:{
            apiKey: "AIzaSyC2Bzmix1jIP3jBLxM8QMvN1YkR23y8ZIo",
            authDomain: "chupemos-stag.firebaseapp.com",
            databaseURL: "https://chupemos-stag.firebaseio.com",
            projectId: "chupemos-stag",
            storageBucket: "chupemos-stag.appspot.com",
            messagingSenderId: "480039852111"
          }
        };
        var config = firebaseConfig['test'];
        if(window.location.hostname==='chupemos.com'){
          config = firebaseConfig['prod'];
        }
        firebase.initializeApp(config);
      </script>

      <script>
        window.AppGlobals.mapsLoaded=false;
        function initMap(){
          window.AppGlobals.mapsLoaded=true;
          window.dispatchEvent(new CustomEvent('map-loaded'));
        }
      </script>
      <script async defer
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA9-te1IhrZw3c-eH-Cl_Toct5XEaI5OAA&libraries=places&callback=initMap"></script>

      <!-- Add any global styles for body, document, etc. -->
      <style>
        body {
          margin: 0;
          padding: 0;
          border: 0;
          outline: 0;
          font-family: 'Roboto', 'Noto', sans-serif;
          line-height: 1.5;
          min-height: 100vh;
          background-color: #eeeeee;
        }
        body *{
          box-sizing: border-box;
        }
      </style>
    </head>
    <body>
      <chup-app></chup-app>
      <noscript>
        Please enable JavaScript to view this website.
      </noscript>
      <!-- Built with love using Polymer Starter Kit -->
    </body>
  </html>
`;
}

module.exports = pwaShell;
