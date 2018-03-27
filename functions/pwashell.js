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
      <meta name="description" content="Plataforma en línea para pedir licores a domicilio">
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
        window.Polymer = {rootPath: '/'};

        // Load and register pre-caching Service Worker
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', function() {
            navigator.serviceWorker.register('service-worker.js', {
              scope: Polymer.rootPath,
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
      <script src="/bower_components/webcomponentsjs/webcomponents-loader.js"></script>

      <!-- Load your application shell -->
      <link rel="import" href="/src/my-app.html">

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
      <my-app></my-app>
      <noscript>
        Please enable JavaScript to view this website.
      </noscript>
      <!-- Built with love using Polymer Starter Kit -->
    </body>
  </html>
  `;
}

module.exports = pwaShell;
