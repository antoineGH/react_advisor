import React, { Component } from 'react'
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'
import Image from 'react-bootstrap/Image'

// Define Map Style Object
const mapStyles = {
	width: '100%',
	height: '100%',
}

// Component to Display Maps Component
// Maps displays a GoogleMap centered on cityGPS props lat and lng
// Maps display a list of Markers from interests (extract GPS coordinates)
// Maps include interestURL (image) and rating information in WindowInfo
// Require props: interests, nameURLRating, lat, lng
export class Maps extends Component {
	// --- Constructor ---
	// Bind onMarkerClick function
	constructor(props) {
		super(props)
		this.onMarkerClick = this.onMarkerClick.bind(this)
	}

	// --- State Management ---
	state = {
		showingInfoWindow: false,
		activeMarker: {},
		selectedPlace: {},
		interest: {},
	}

	// --- Method onMarkerClick ---
	// Update State with selectedPlace, activeMarker, interest, nameURLRating, isLoaded
	onMarkerClick = (props, marker, e) =>
		this.setState({
			selectedPlace: props,
			activeMarker: marker,
			showingInfoWindow: true,
			interest: this.props.interests.find((interest) => interest.name === props.name),
		})

	onClose = (props) => {
		if (this.state.showingInfoWindow) {
			this.setState({
				showingInfoWindow: false,
				activeMarker: null,
				interest: {},
				isLoaded: false,
			})
		}
	}

	render() {
		return (
			<>
				<Map
					google={this.props.google}
					zoom={14}
					style={mapStyles}
					initialCenter={{
						lat: this.props.lat,
						lng: this.props.lng,
					}}>
					{this.props.interests.map((interest, key) => (
						<Marker
							key={key}
							position={{ lat: interest.location.lat, lng: interest.location.lng }}
							name={interest.name}
							onClick={this.onMarkerClick}
						/>
					))}

					<InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.onClose}>
						<div style={{ marginLeft: '10px' }}>
							<h6>{this.state.selectedPlace.name}</h6>
							{this.state.showingInfoWindow && <p className='card-text'>{this.state.interest.categories[0].name}</p>}

							{this.state.showingInfoWindow && (
								<p className='inline-p'>
									{this.state.interest.location.address}
									{this.state.interest.location.crossStreet && ' (' + this.state.interest.location.crossStreet + ')'},{' '}
								</p>
							)}
							{this.state.showingInfoWindow && (
								<p>
									{this.state.interest.location.city}, {this.state.interest.location.country}
								</p>
							)}
							{this.state.showingInfoWindow && this.state.isLoaded && (
								<Image
									className='image_infowindow'
									src={this.state.nameURLRating.interestURL}
									alt='Image'
									style={{ borderRadius: '3px', width: '85%' }}
								/>
							)}
						</div>
					</InfoWindow>
				</Map>
			</>
		)
	}
}

export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_MAP_API_KEY,
})(Maps)
