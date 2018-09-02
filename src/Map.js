import React from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow, withScriptjs } from 'react-google-maps';
import { compose, withProps } from 'recompose';



const Map = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD9Sr_9XxqbUR9_ss2_ZYSd2pMTsZs7m80",
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
)((props) => (<GoogleMap
        defaultCenter = {{ lat: 46.9614047, lng: 17.8536013 }}
        defaultZoom = { 11 }
      >
      {props.venuesOnTheList.map((venue, index)=> (
        <Marker
        key = {index}
        position={{ lat: venue.location.lat, lng: venue.location.lng }}
        onClick={props.infoWindowOpen}
        >
      {props.isOpen &&
        <InfoWindow
            onCloseClick={props.infoWindowClose}
            >
          <span>Something</span>
        </InfoWindow>
       }
       </Marker> 
        )
       
      
      )}
      
      </GoogleMap>)
      
   )


 
export default Map;