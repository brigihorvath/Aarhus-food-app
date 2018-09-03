export default function registerServiceWorker() {
  // console.log("BBB2");
    const swPath = 'sw.js';
    if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'production') {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register(swPath).then(function(registration) {
          console.log('ServiceWorker registration successful with scope: ',
                      registration.scope);
        }, function(err) {
          console.log('ServiceWorker registration failed: ', err);
        });
      });
    }
}