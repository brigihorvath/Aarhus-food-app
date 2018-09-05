import React from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow, withScriptjs  } from 'react-google-maps';
import { compose, withProps } from 'recompose';


/*this component is for rendering the map, the markers and the infowindows
  for this component react-google-maps was used
  first I tried with google-maps-react, 
  but to trigger the Infowindow also from the list, this package seemed to be a better choice
*/

const Map = compose(
  withProps({
    //setting the props of the map
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD9Sr_9XxqbUR9_ss2_ZYSd2pMTsZs7m80",
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%', width: '100%' }} />,
    mapElement: <div style={{ height: '100%'}} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => <GoogleMap
        defaultCenter = {{ lat: 56.1529, lng: 10.1971463 }}
        defaultZoom = { 15 }
        onClick ={props.infoWindowClose}
        points = {props.venuesOnTheList}
      >

      {props.venuesOnTheList.map((venue, index)=> (
        <Marker
        key = {index}
        position={{ lat: venue.location.lat, lng: venue.location.lng }}
        onClick={() => props.updateSelectedVenue(venue.id)}
        >
        
      {props.isOpen && props.selectedVenue === venue.id &&
        <InfoWindow
            onCloseClick={props.infoWindowClose}
            >
            <div className={'infos'}>
          <h2>{venue.name}</h2>
          <p>{venue.location.address}</p>
          </div>
        </InfoWindow>
       }
       </Marker> 
      ) 
      )} 
    </GoogleMap>

   )
export default Map;