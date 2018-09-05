import React, { Component } from 'react';

class Errorhandling extends Component {
   
  /*shows the possible errors if there is a Foursquare API and/or a Google Maps API and/or Internet error*/
  render(){
  	const { gmFailure, foursquareFailure} = this.props
    return(
    	<div className ="error-page">
    	{ gmFailure === true &&
    		<div>
	    		<h2>Google Maps Error</h2>
                <p>The reasons can be the following:</p>
                <ul>
                <li>You don't have Internet connection.</li>
                <li>The Google Maps API is down.</li>
                <li>The application hasn't got the right authentication key.</li>
                </ul>
	    	</div>
    	}
    	{ foursquareFailure &&
    		<div>
	    		<h2>Foursquare Error</h2>
                <p>The reasons can be a following:</p>
                <ul>
                <li>You don't have Internet connection</li>
                <li>The Foursquare API is down</li>
                <li>The application hasn't got the right authentication key.</li>
                </ul>
	    	</div>
    	}
    	</div>
    	)
    }
}

export default Errorhandling

