import React from 'react'

import { useHistory } from 'react-router-dom'

import RestaurantCarousel from './RestaurantCarousel'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

// Component to map Restaurants List and call Child Component Restaurant on each element.
// Require props: restaurant
export default function RestaurantList({ restaurants, city, latLng }) {
	const history = useHistory()

	const category = restaurants[1].categories[0].name
	const categoryID = restaurants[1].categories[0].id
	const nameURLRating = ''

	function handleClick() {
		history.push({
			pathname: city.replaceAll(' ', '_').trim().toLowerCase() + '/' + category.toLowerCase().trim().replaceAll(' ', '_'),
			state: {
				interests: restaurants,
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
							<FontAwesomeIcon className='mr-1' size='xs' icon={['fas', 'utensils']} /> Restaurants in {city}
						</p>
					</Col>
					<Col xs={12}>
						<Button className='mb-2' variant='outline-dark' style={{ borderRadius: 0 }} onClick={handleClick}>
							See All&nbsp;
							<FontAwesomeIcon size='1x' icon={['fas', 'angle-right']} />
						</Button>
					</Col>
				</Row>
				<RestaurantCarousel restaurants={restaurants} />
			</Col>
		</Row>
	)
}
