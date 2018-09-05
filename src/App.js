import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import Header from './Header'
import VenueList from './VenueList'
import escapeRegExp from 'escape-string-regexp'
import Errorhandling from './Errorhandling'


//npm foursquare-react 
const foursquare = require('react-foursquare')({
  clientID: 'W14BTCBGIYSN01ZDOZMBAZR3EM4ZFRCCL1QO4EFOVTREGN1L',
  clientSecret: 'NJNM3ZUH4XDVMLZPN0FYZUNJ1OEKOG1B5NSQ1JNADMOEJOQO'
})

//Foursquare parameters
const parameters = {
  'll': '56.150325,10.2024871',
  'section': 'food',
  'limit': 30
}


class App extends Component {


  state = {
    //the list of all the venues the application gets from the Foursquare
    venues : [],
    //the list of 
    venuesOnTheList : [],
    //states to pass to the Errorhandling page
    foursquareFailure: false,
    authenticationFailure: false,
    //text in the serch field
    query: '',
    //used for the VenueList to update the Map, when a venue is clicked
    selectedVenue: '',
    //used for toggling the InfoWindow
    isOpen: false,
    //used for toggling the List of Venues
    menuHidden: false
  }

  componentDidMount(){

    //npm - foursquare-react - fetch the venues
    foursquare.venues.explore(parameters)
      .then(result => {
        result.response.groups[0].items.map(item => {
            return this.setState({ 
                    key: item,
                    venues: this.state.venues.concat([item.venue]),
                    venuesOnTheList: this.state.venuesOnTheList.concat([item.venue]),
                    foursquareFailure: false })
        })
      }).catch(err => this.setState({foursquareFailure: true}))
         
              

    /*according to the Google Maps API docs:
     "If the following global function is defined it will be called when the authentication fails":
     */
      window.gm_authFailure = () => 
           (this.setState({authenticationFailure: true}))
    }

    //updates the app according to the search
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


    //if somebody clicks on a List item, it sets the Venue ID and the InfoWindoW open
    updateSelectedVenue = (id) => {
          this.setState(
            {selectedVenue : id,
            isOpen : true}
            )
    }

    //closes the InfoWindow
    infoWindowClose = () => {
      this.setState({
        isOpen: false
      });
    }


    //toggles the VenueList and sets it to aria-hidden if it is not shown
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
          foursquareFailure = {this.state.foursquareFailure}
        />
      }
        </main>
      </div>
    );
  }
}

export default App;

