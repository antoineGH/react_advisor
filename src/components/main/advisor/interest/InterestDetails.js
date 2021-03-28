import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import MapContainer from '../maps/MapContainer'
import { Container, Row, Col, Image, Card } from 'react-bootstrap'
import ContainerInterestSimilar from './ContainerInterestSimilar'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Award from '../../design/Award'
library.add(fas)

export default function InterestDetails() {
	let location = useLocation()
	const history = useHistory()

	const [isLoaded, setIsLoaded] = useState(false)
	const [lat, setLat] = useState(null)
	const [lng, setLng] = useState(null)
	const [interest, setInterest] = useState(null)
	const [city, setCity] = useState(null)
	const [formattedAddress, setFormattedAddress] = useState(null)
	const [count, setCount] = useState(null)
	const [total_count, setTotalCount] = useState(null)
	const [name, setName] = useState(null)
	const [categoryIcon, setCategoryIcon] = useState(null)
	const [categoryName, setCategoryName] = useState(null)

	useEffect(() => {
		if (_.get(location, 'state.interest')) {
			setInterest(location.state.interest)
			setCount(location.state.count)
			setTotalCount(location.state.total_count)
			setName(location.state.interest.name)
			setLat(location.state.interest.location.lat)
			setLng(location.state.interest.location.lng)
			setCity(location.state.interest.location.city)
			setFormattedAddress(location.state.interest.location.formattedAddress.join(', '))
			const categoryIconPrefix = location.state.interest.categories[0].icon.prefix
			const categoryIconSuffix = location.state.interest.categories[0].icon.suffix
			setCategoryIcon(categoryIconPrefix + '32' + categoryIconSuffix)
			setCategoryName(location.state.interest.categories[0].name)
			setIsLoaded(true)
		} else {
			history.push('/')
		}
	}, [history, location])

	if (!isLoaded) {
		return <p>loading</p>
	} else {
		return (
			<>
				<Container fluid>
					<Row>
						<Col md={12} className='interest_list'>
							<Container>
								<Card border='light' className='mt-4' style={{ width: '100%', borderRadius: '4px' }}>
									<Row>
										<Col md={12} style={{ padding: '0rem 2rem 1rem 3rem' }}>
											<Card.Body>
												<Card.Title className='titles mt-4'>{name}</Card.Title>
												<Card.Text className='mt-md-1'></Card.Text>
												<Card.Text style={{ fontSize: '0.85rem' }} className='mt-md-1'>
													{count && (
														<span>
															<span className='font-weight-bold'>#{count}</span> of {total_count} things to do in {city}
														</span>
													)}
												</Card.Text>
												<Card.Text className='subtitles' style={{ marginBottom: 0 }}>
													Category
													<br />
													<Image style={{ background: '#00aa6c' }} className='mt-1' src={categoryIcon} rounded />
												</Card.Text>
												<Card.Text style={{ fontSize: '1rem' }}>{categoryName}</Card.Text>
												<Card.Text>
													<FontAwesomeIcon size='lg' icon={['fas', 'map-marker-alt']} fixedWidth />
													<span className='subsubtitles'>Address:</span> <span className='inline-p'>{formattedAddress}.</span>
												</Card.Text>
											</Card.Body>
										</Col>
									</Row>
								</Card>
								<MapContainer interest={interest} lat={lat} lng={lng} />
								<ContainerInterestSimilar interest={interest} categoryName={categoryName} />
							</Container>
							<br />
							<br />
						</Col>
					</Row>
				</Container>
				<Award />
			</>
		)
	}
}
