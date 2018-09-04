import React, { Component } from 'react'
import './App.css';
import {MdMenu} from 'react-icons/md'


class Header extends Component {
  
  
  
  render(){
    const { toggleVenueList } = this.props

    return(
         <header className="mapHeader">
            <MdMenu 
              role='navigation' 
              aria-label='Choose which place you wanna go!'
              className = {'hamb-button'}
              // style={{ color: "white", float: "left", margin: "0 0 0 25px" }}
              size= "35"
              tabIndex="0"
              onClick={toggleVenueList}
              onKeyPress={toggleVenueList}
               />
          <h1 tabIndex="0">Cool restaurants - Aarhus C</h1>
        </header>
     
      )
  }
}

export default Header

