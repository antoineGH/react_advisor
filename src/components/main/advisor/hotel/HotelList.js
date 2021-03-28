import React from 'react'

import { useHistory } from 'react-router-dom'

import HotelCarousel from './HotelCarousel'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

// Component to map Hotels List and call Child Component Hotel on each element.
// Require props: hotels
export default function HotelList({ hotels, city, latLng }) {
	const history = useHistory()

	const category = hotels[1].categories[0].name
	const categoryID = hotels[1].categories[0].id
	const nameURLRating = ''

	function handleClick() {
		history.push({
			pathname: city.replaceAll(' ', '_').trim().toLowerCase() + '/' + category.toLowerCase().trim().replaceAll(' ', '_'),
			state: {
				interests: hotels,
				nameURLRating: nameURLRating,
				latLng: latLng,
				category: category,
				categoryID: categoryID,
			},
		})
	}

	return (
		<Row>
			<Col md={12} className='text-center justify-content-center'>
				<Row>
					<Col xs={12}>
						<p className='hotel_carousel_title text-center'>
							<FontAwesomeIcon className='mr-1' size='xs' icon={['fas', 'luggage-cart']} /> Hotels in {city}
						</p>
					</Col>
					<Col xs={12}>
						<Button className='mb-2' variant='outline-dark' style={{ borderRadius: 0 }} onClick={handleClick}>
							See All&nbsp;
							<FontAwesomeIcon size='1x' icon={['fas', 'angle-right']} />
						</Button>
					</Col>
				</Row>

				<HotelCarousel hotels={hotels} />
			</Col>
		</Row>
	)
}
