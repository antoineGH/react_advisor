import React from 'react'
import { useHistory } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export default function Favorite({ favorite }) {
	const history = useHistory()

	// // --- Location Information ---
	const city = favorite.city

	// --- getDetails function, triggered with Button onClick => routes to Interest Details ---
	function getDetails() {
		history.push({
			pathname: '/search/' + city.replaceAll(' ', '_').trim().toLowerCase(),
			state: {
				latLng: favorite,
				count: '',
				total_count: '',
				interestNameURLRating: '',
			},
		})
	}

	return (
		<Card
			border='light'
			className='favorite_card mt-2'
			style={{ width: '95%', borderRadius: '4px', marginRight: '2.5%', marginLeft: '2.5%', marginBottom: '10%' }}>
			<Card.Body>
				<Card.Title className='text-center' style={{ fontFamily: 'poppinsregular', fontWeight: '700', lineHeight: '1.5em', height: '2em' }}>
					{favorite.city}
				</Card.Title>
				<div className='image_container_heart'>
					<img
						as='a'
						onClick={getDetails}
						style={{ height: '150px', objectFit: 'fill', borderRadius: '1px' }}
						src={favorite.url}
						className='img_favorite'
						alt={favorite.city}
					/>
					<div className='top-right'>
						<span as='a' onClick={getDetails} className='font-awesome-cirle'>
							<FontAwesomeIcon style={{ marginTop: '2px', fontSize: '1.3rem' }} size='2x' color='#ff5d5d' icon={['fas', 'heart']} />
						</span>
					</div>
				</div>
				<Card.Text>
					<Button block style={{ marginLeft: '10', marginRight: '10' }} onClick={getDetails} className='button_explore mt-2' variant='dark'>
						Explore
					</Button>{' '}
				</Card.Text>
			</Card.Body>
		</Card>
	)
}
