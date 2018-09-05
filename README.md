#Cool Places Map Application

Cool places map application shows 30 recommended restaurants (or food places) through the Foursquare API, in Aarhus C, Denmark.

##To get started:

* you have to have your own Google Maps API key and insert it to the applications Map.js file
Here you can find some instructions to get your own API key:
https://developers.google.com/maps/documentation/javascript/get-api-key

* you have to have put your Foursquare credentials into the App.js file
Here you can find some instructions to create your own account:
https://developer.foursquare.com/docs/api/getting-started

After you are done with the credentials, you need to:

* clone this repository to your computer
* install all project dependencies with `npm install`
* start the development server with `npm start`

##How the application works
The list of the venues are shown automatically, as you load the application.
If you click on a marker, it shows an infowindow, with the name and the address of the selected place.
You can see a searchbox and the list of the venues. In the search box, you can search for expressions in the name
of the venues.
If you click on the name of a venue in the list, the connected infowindow will show you, where you find the place. 

##Service Worker
With the help of a service worker, you can also see the last cached version of the app, when offline.


## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

##Dependencies
If you want to use the application locally, on your computer,
you have to install npm with 'npm install' and then start your local server with 'npm start' 

##Credits

* for rendering the Google Map, the markers and the infowindows, 'react-google-maps'package was used:
  https://www.npmjs.com/package/react-google-maps
* for fetching the venues from Foursquare, 'react-foursquare' was used:
  https://www.npmjs.com/package/react-foursquare
* hamburger-icon is used from 'react-icons/fa':
  https://www.npmjs.com/package/react-icons
  It is a courtesy of Fontawesome: https://fontawesome.com/icons?d=gallery


## Contributing

This repository is one of my Udacity scholarship projects, and I would like to preserve it, as I submitted. Therefore, I most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

