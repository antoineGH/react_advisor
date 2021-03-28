import React, { Component } from 'react'
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'

const mapStyles = {
	width: '100%',
	height: '100%',
}

// Component to Display Map
// Require props: name, lat, lng
// Maps displays a GoogleMap centered on cityGPS props lat and lng
// Maps display a Marker at lat, lng GPS coordinates
export class MapContainer extends Component {
	state = {
		showingInfoWindow: false,
		activeMarker: {},
		selectedPlace: {},
	}

	onMarkerClick = (props, marker, e) =>
		this.setState({
			selectedPlace: props,
			activeMarker: marker,
			showingInfoWindow: true,
		})

	onClose = (props) => {
		if (this.state.showingInfoWindow) {
			this.setState({
				showingInfoWindow: false,
				activeMarker: null,
			})
		}
	}

	render() {
		const { interest } = this.props
		return (
			<Map
				google={this.props.google}
				zoom={12}
				style={mapStyles}
				initialCenter={{
					lat: parseFloat(this.props.lat),
					lng: parseFloat(this.props.lng),
				}}>
				<Marker position={{ lat: parseFloat(this.props.lat), lng: parseFloat(this.props.lng) }} onClick={this.onMarkerClick} name={this.props.name} />

				<InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.onClose}>
					<div style={{ marginLeft: '10px' }}>
						<h6>{interest.name}</h6>
						{this.state.showingInfoWindow && <p className='card-text'>{interest.categories[0].name}</p>}

						{this.state.showingInfoWindow && (
							<p className='inline-p'>
								{interest.location.address}
								{interest.location.crossStreet && ' (' + interest.location.crossStreet + ')'},{' '}
							</p>
						)}
						{this.state.showingInfoWindow && (
							<p>
								{interest.location.city}, {interest.location.country}
							</p>
						)}
					</div>
				</InfoWindow>
			</Map>
		)
	}
}

export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_MAP_API_KEY,
})(MapContainer)
