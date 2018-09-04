import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import Header from './Header'
import VenueList from './VenueList'
import escapeRegExp from 'escape-string-regexp'
import Errorhandling from './Errorhandling'




const foursquare = require('react-foursquare')({
  clientID: 'W14BTCBGIYSN01ZDOZMBAZR3EM4ZFRCCL1QO4EFOVTREGN1L',
  clientSecret: 'NJNM3ZUH4XDVMLZPN0FYZUNJ1OEKOG1B5NSQ1JNADMOEJOQO'
})


const parameters = {
  'll': '56.150325,10.2024871',
  'section': 'food',
  'limit': 30
}


class App extends Component {
  state = {
    venues : [],
    venuesOnTheList : [],
    foursquareFailure: false,
    authenticationFailure: false,
    query: '',
    selectedPlace : {lat: 0, lng: 0},
    selectedVenue: '',
    isOpen: false,
    menuHidden: false
  }

  componentDidMount(){
    foursquare.venues.explore(parameters)
      .then(result => {
        result.response.groups[0].items.map(item => 

            (this.setState({ 
            key: item,
            venues: this.state.venues.concat([item.venue]),
            venuesOnTheList: this.state.venuesOnTheList.concat([item.venue]),
                                 foursquareError: false }))
        )
      }).catch(err => 
         (this.setState({ forsquareError: true }))
              )

    /*according to the Google Maps API docs:
     "If the following global function is defined it will be called when the authentication fails":
     */
      window.gm_authFailure = () => 
           (this.setState({authenticationFailure: true}))
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


   
updateSelectedVenue = (id) => {
      this.setState(
        {selectedVenue : id,
        isOpen : true}
        )
}


infoWindowClose = () => {
  this.setState({
    isOpen: false
  });
}

toggleVenueList = () => {
    if(this.state.menuHidden === false){
      document.getElementsByClassName('map')[0].style.width = '100%'
      this.setState({menuHidden: true})
      document.getElementsByClassName('sidebar')[0].setAttribute('aria-hidden', 'true')

    }else{
      document.getElementsByClassName('map')[0].style.width = '80%'
      this.setState({menuHidden: false})
      
  }
}
  render() {
    console.log(this.state.authenticationFailure + ' ' + this.state.foursquareError)

    return (
        <div className="container">
        <Header
          toggleVenueList = {this.toggleVenueList}
        />

        <main>

        
            {this.state.menuHidden === false &&
          <VenueList venues = {this.state.venues}
        venuesOnTheList= {this.state.venuesOnTheList}
                     onUpdateQuery = {this.updateQuery}
                     query = {this.state.query}
                     selectedPlace = {this.state.selectedPlace}
                     updateSelectedVenue = {this.updateSelectedVenue}
                     onMarkerClick = {this.markerClick}
                     menuHidden = {this.state.menuHidden}
                     />
        }
        
        {(this.state.authenticationFailure === false && this.state.foursquareFailure === false) &&
        <div className="map">
        <Map venuesOnTheList = {this.state.venuesOnTheList}
              isOpen = {this.state.isOpen}
              infoWindowClose = {this.infoWindowClose}
              updateSelectedVenue = {this.updateSelectedVenue}
              selectedVenue = {this.state.selectedVenue}
              />
        </div>
      }
      {(this.state.authenticationFailure === true || this.state.foursquareFailure === true) &&
        <Errorhandling 
          gmFailure = {this.state.authenticationFailure}
          foursquareError = {this.state.foursquareFailure}
        />
      }
        </main>
      </div>
    );
  }
}

export default App;

