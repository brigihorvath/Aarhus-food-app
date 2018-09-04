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
  'll': '56.150325,10.2024871',
  'section': 'food',
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
    selectedVenue: '',
    isOpen: false,
    menuHidden: false
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
      // document.getElementsByClassName('sidebar')[0].style.width = '0'
      document.getElementsByClassName('map')[0].style.width = '100%'
      this.setState({menuHidden: true})
    }else{
      // document.getElementsByClassName('sidebar')[0].style.width = '20%'
      document.getElementsByClassName('map')[0].style.width = '80%'
      this.setState({menuHidden: false})   
  }
}


  render() {
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
                     />
        }
        
        <div className="map">
        <Map venuesOnTheList = {this.state.venuesOnTheList}
              isOpen = {this.state.isOpen}
              // infoWindowOpen = {this.infoWindowOpen}
              infoWindowClose = {this.infoWindowClose}
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

