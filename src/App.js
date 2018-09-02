import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import Header from './Header'
import VenueList from './VenueList'
import escapeRegExp from 'escape-string-regexp'




const foursquare = require('react-foursquare')({
  clientID: 'W14BTCBGIYSN01ZDOZMBAZR3EM4ZFRCCL1QO4EFOVTREGN1L',
  clientSecret: 'NJNM3ZUH4XDVMLZPN0FYZUNJ1OEKOG1B5NSQ1JNADMOEJOQO'
})


const parameters = {
  'll': '46.9614047,17.8536013',
  'section': 'topPicks',
  'limit': 20
}


class App extends Component {
  state = {
    venues : [],
    venuesOnTheList : [],
    foursquareError: false,
    mapError: false,
    query: '',
    selectedPlace : {lat: 0, lng: 0},
    activeMarker: {},
    showingInfoWindow: true,
    venueName: '',
    Lat: 0,
    Lng: 0,
    selectedVenue: ''
  }

  componentDidMount(){
    foursquare.venues.explore(parameters)
      .then(result => {
        result.response.groups[0].items.map(item => {

          return this.setState({ 
            key: item,
            venues: this.state.venues.concat([item.venue]),
            venuesOnTheList: this.state.venuesOnTheList.concat([item.venue]),
                                 foursquareError: false })
        })
      }).catch(err => {
        return this.setState({ forsquareError: true })
      })
    }

    
    updateQuery = (query) => {
      if (query) {
      this.setState({ query: query.trim() })
      const match = new RegExp(escapeRegExp(query), 'i')
      this.setState({
        query: query,
        venuesOnTheList: this.state.venues
                           .filter((venue) => match.test(venue.name))

      })
    } else {
      this.setState({
        query: "",
        venuesOnTheList: this.state.venues
      })
    }
    }


    markerClick = ((props, marker, x) => {
      this.setState({
        selectedPlace: marker.position,
        activeMarker: marker,
        showingInfoWindow: true,
        venueName: marker.name,
        Lat: marker.lat,
        Lng: marker.lng,
        selectedVenue: x
      })
    });

updateSelectedVenue = (id) => {
      this.setState({selectedVenue : id})

    }




  render() {
    return (
        <div className="container">
        <Header/>
        <main>
        <VenueList venues = {this.state.venues}
        venuesOnTheList= {this.state.venuesOnTheList}
                     onUpdateQuery = {this.updateQuery}
                     query = {this.state.query}
                     selectedPlace = {this.state.selectedPlace}
                     updateSelectedVenue = {this.updateSelectedVenue}
                     onMarkerClick = {this.markerClick}
                     />
        <div className="map">
        <Map venuesOnTheList = {this.state.venuesOnTheList}
              selectedPlace = {this.state.selectedPlace}
              activeMarker = {this.state.activeMarker}
              showingInfoWindow = {this.state.showingInfoWindow}
              venueName = {this.state.venueName}
              Lat = {this.state.Lat}
              Lng = {this.state.Lng}
              onMarkerClick = {this.markerClick}
              updateSelectedVenue = {this.updateSelectedVenue}
              selectedVenue = {this.state.selectedVenue}

              />
        </div>
        </main>
      </div>
    );
  }
}

export default App;

