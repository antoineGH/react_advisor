import React, { Component } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import ClipLoader from 'react-spinners/ClipLoader'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export default class LocationSearch extends Component {
	constructor(props) {
		super(props)
		this.state = { address: '', isDisabled: false }
		this.inputRef = React.createRef()
	}

	updateState = (latLng) => {
		this.props.handleSearch(latLng)
	}

	handleSelect = (address) => {
		geocodeByAddress(address)
			.then((results) => getLatLng(results[0]))
			.then((latLng) => {
				const fullAddress = address
				address = address.trim().split(',')
				latLng.city = address[0]
				this.updateState(latLng)
				this.setState({ address: fullAddress, isDisabled: false })
				this.inputRef.current.value = fullAddress
			})
			.catch((error) => console.error('Error', error))
	}

	handleChange = (address) => {
		this.setState({ address: address, isDisabled: true })
	}

	render() {
		return (
			<>
				<Row className='text-center justify-content-center justify-content-lg-start'>
					<Col xs={12} md={8} lg={5} xl={5} className='mt-2'>
						<PlacesAutocomplete
							value={this.state.address}
							onChange={this.handleChange}
							onSelect={this.handleSelect}
							style={{ backgroundColor: 'yellow' }}>
							{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
								<div>
									<div className='form-group has-search'>
										<span className='form-control-feedback'>
											<i className='fas fa-filter'></i>
										</span>
										<input
											ref={this.inputRef}
											{...getInputProps({
												placeholder: this.props.placeHolder,
												className: 'location-search-input form-control',
												style: {},
											})}
										/>
									</div>
									<div className='autocomplete-dropdown-container'>
										{loading && (
											<div style={{ backgroundColor: '#ffffff', cursor: 'pointer', paddingLeft: '9px', paddingRight: '9px' }}>
												Searching
											</div>
										)}
										{suggestions.map((suggestion, key) => {
											const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item'
											const style = suggestion.active
												? { backgroundColor: '#00AA6C', color: 'white', cursor: 'pointer', paddingLeft: '9px', paddingRight: '9px' }
												: { backgroundColor: '#ffffff', cursor: 'pointer', paddingLeft: '9px', paddingRight: '9px' }
											return (
												<div key={key}>
													<div
														{...getSuggestionItemProps(suggestion, {
															className,
															style,
														})}>
														<span>{suggestion.description}</span>
													</div>
												</div>
											)
										})}
									</div>
								</div>
							)}
						</PlacesAutocomplete>
					</Col>
					<Col xs={12} md={4} lg={3} xl={3} className='my-auto'>
						<Button
							className='btn-block'
							style={{ borderRadius: '0px' }}
							variant='dark'
							onClick={this.props.handleClick}
							disabled={this.state.isDisabled}>
							Search {this.state.isDisabled && <ClipLoader css='margin-bottom: -1.5%' color={'white'} size={15} />}
						</Button>
					</Col>
				</Row>
			</>
		)
	}
}
