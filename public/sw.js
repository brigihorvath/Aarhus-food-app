console.log('egyaltalan itt jarunk???');

self.addEventListener('install', (event) =>
  {
    var urlsToCache = [
      '/',
      'index.html',
  	'src/App.css',
  	'src/App.js',
  	'src/App.test.js',
  	'src/Header.js',
  	'src/index.css',
  	'src/index.js',
  	'src/Map.js',
  	'src/VenueList.js',
  	'favicon.ico'

    ];
    console.log('AAA1');
    let somePromise = caches.open('neighborhood2')
      .then((cache) => { return cache.addAll(urlsToCache);});
    console.log('AAA2: ' + somePromise);
    event.waitUntil(somePromise);
    console.log('AAA3');
  }
);


self.addEventListener(
  'fetch',
  (event) =>
  {
    event.respondWith
    (
      caches.match(event.request, {ignoreSearch: true})
      .then
      (
        (response) =>
        {
          return response
            ||          
            fetch(event.request)
            .then
            (
                (response) => { return response; },
                (error) => {console.log('fetch error: ' + error);}
            );
        },
        (error) => { console.log(error.message + 'cache match error: ' + error); }
      )
    );
  }
);
