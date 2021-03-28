import React from 'react'
import { useHistory } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export default function Restaurant({ restaurant }) {
	const history = useHistory()

	// --- Location Information ---
	const city = restaurant.location.city
	const formattedAddress = restaurant.location.formattedAddress.join(', ')

	// --- Category Information ---
	const categoryName = restaurant.categories[0].name
	const categoryIconPrefix = restaurant.categories[0].icon.prefix
	const categoryIconSuffix = restaurant.categories[0].icon.suffix
	const categoryIcon = categoryIconPrefix + '32' + categoryIconSuffix

	// --- getDetails function, triggered with Button onClick => routes to Interest Details ---
	function getDetails() {
		history.push({
			pathname: '/search/' + city.replaceAll(' ', '_').trim().toLowerCase() + '/details/' + restaurant.id,
			state: {
				interest: restaurant,
				count: '',
				total_count: '',
				interestNameURLRating: '',
			},
		})
		window.window.scrollTo(0, 0)
	}

	return (
		<Card border='light' className='mt-2' style={{ width: '95%', borderRadius: '4px', marginRight: '2.5%', marginLeft: '2.5%', marginBottom: '10%' }}>
			<Card.Body>
				<Card.Title className='text-center' style={{ fontWeight: '700', lineHeight: '1.5em', height: '3em' }}>
					{restaurant.name}
				</Card.Title>
				<Card.Text className='subtitles text-center mt-1' style={{ marginBottom: 0 }}>
					Category
					<br />
					<Image style={{ background: '#00aa6c' }} className='mt-1' src={categoryIcon} rounded />
				</Card.Text>
				<Card.Text className='text-center' style={{ fontSize: '1rem' }}>
					{categoryName}
				</Card.Text>
				<Card.Text style={{ lineHeight: '1.5em', height: '4.5em' }}>
					<FontAwesomeIcon size='lg' icon={['fas', 'map-marker-alt']} fixedWidth />
					<span className='subsubtitles'>Address:</span> <span className='inline-p'>{formattedAddress}.</span>
				</Card.Text>
				<Card.Text>
					<Button block style={{ marginLeft: '10', marginRight: '10' }} onClick={getDetails} className='button_explore mt-2' variant='dark'>
						Explore
					</Button>{' '}
				</Card.Text>
			</Card.Body>
		</Card>
	)
}
