import React, { Component } from 'react';



class Errorhandling extends Component {
  
  
  
  render(){
  	const { gmFailure, foursquareFailure} = this.props
    return(
    	<div className ="error-page">
    	{ gmFailure === true &&
    		<div>
	    		<p>Google Maps Hiba!</p>
	    	</div>
    	}
    	{ foursquareFailure &&
    		<div>
	    		<p>Foursquare Hiba!</p>
	    	</div>
    	}
    	</div>




    	)
	}
}

export default Errorhandling

