import React, { Component } from 'react'
import './App.css';
import {MdMenu} from 'react-icons/md'


class Header extends Component {
  state = {
    menuHidden : false
  }
  
  toggleVenueList = () => {
    if(this.state.menuHidden === false){
      document.getElementsByClassName('sidebar')[0].style.width = '0'
      document.getElementsByClassName('map')[0].style.width = '100%'
      this.setState({menuHidden: true})
    }else{
      document.getElementsByClassName('sidebar')[0].style.width = '20%'
      document.getElementsByClassName('map')[0].style.width = '80%'
      this.setState({menuHidden: false})   
  }
}

  render(){

    return(
      <header className="mapHeader">
            <MdMenu 
              role='navigation' 
              aria-label='Choose which place you wanna go!'
              className = {'hamb-button'}
              // style={{ color: "white", float: "left", margin: "0 0 0 25px" }}
              size= "35"
              tabIndex="0"
              onClick={this.toggleVenueList}
              onKeyPress={this.toggleVenueList}
               />
          <h1 tabIndex="0">Cool restaurants - Aarhus C</h1>
        </header>
      )
  }
}

export default Header

