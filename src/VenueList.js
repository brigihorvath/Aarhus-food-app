import React, { Component } from 'react'
import './App.css'
import PropTypes from 'prop-types';




class VenueList extends Component{
	state= { query : ''}

	static: propTypes ={
		venues: PropTypes.array.isRequired,
		onUpdateQuery: PropTypes.func.isRequired,
		venuesOnTheList: PropTypes.array.isRequired,
		query: PropTypes.string
	}



	render(){
		const { onUpdateQuery, venuesOnTheList, query, updateSelectedVenue } = this.props
		console.log(venuesOnTheList)
		return(
			<div className="sidebar">
				<div className='list-venues-top'>
				<input className='search-venues' type='text' placeholder='Search venues' value={query}
				onChange={(event) => onUpdateQuery(event.target.value)} />
				</div>
				<ul className='venue-list'>
				{venuesOnTheList.map((venue) =>
					( <li key={venue.id} className='venue-list-item'>
					<p onClick={() =>updateSelectedVenue(venue.id)}>{venue.name}</p>
					</li>
					))}
			</ul>

			</div>

			);
	}
}

export default VenueList