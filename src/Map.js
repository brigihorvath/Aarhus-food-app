import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';



class Map extends Component {
  render(){

  	//withGoogleMap - Higher Order Component
  	//GoogleMap - takes in map props

  	/**
  	*Then we are creating a constant that uses both of the things we imported. 
  	*We need to pass in two props into ‘GoogleMap’ to get the component to work
  	* and those are ‘defaultCenter’ and ‘defaultZoom’. 
  	*You need to provide a latitude and longitude in the form of an object to defaultCenter, 
  	*and then some number into defaultZoom.
	*/


  	const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: 46.9614047, lng: 17.8536013 } }
        defaultZoom = { 13 }
      >
      </GoogleMap>
   ))


    return(
      
      /**
      *Next we return the const we just created in a div that takes in props of ‘containerElement’ and ‘mapElement’. 
      *The container element is going to hold our map element. 
      *You can set the height and width of the container to anything you want. 
      *You can set a fixed pixel size, or make it according to viewport height, 
      *or as a percentage of the screen too. I chose 500px by 500px for this example. 
      *For the map element, I wanted to fill the container, so I went with 100%.
	*/
	<div>
        <GoogleMapExample
          containerElement={ <div style={{ height: '100vh', width: '100vw' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
    </div>
    );
  }
};
export default Map;