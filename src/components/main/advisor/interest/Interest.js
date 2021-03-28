import React from 'react'
// eslint-disable-next-line
import { useHistory } from 'react-router-dom'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

// Component to Display Interest
// Require props: interest, count, total_count,
export default function Interest({ interest, count, total_count, interestNameURLRating }) {
	const history = useHistory()

	// --- Location Information ---
	const city = interest.location.city
	let formattedAddress = ''
	interest.location.formattedAddress && (formattedAddress = interest.location.formattedAddress.join(', '))

	// --- Category Information ---
	const categoryName = interest.categories[0].name
	const categoryIconPrefix = interest.categories[0].icon.prefix
	const categoryIconSuffix = interest.categories[0].icon.suffix
	const categoryIcon = categoryIconPrefix + '32' + categoryIconSuffix

	// --- getDetails function, triggered with Button onClick => routes to Interest Details ---
	function getDetails() {
		history.push({
			pathname: '/search/' + city.replaceAll(' ', '_').trim().toLowerCase() + '/details/' + interest.id,
			state: {
				interest: interest,
				count: count,
				total_count: total_count,
				// interestNameURLRating: interestNameURLRating,
			},
		})
		window.window.scrollTo(0, 0)
	}

	return (
		<>
			<Card border='light' className='mt-4' style={{ width: '100%', borderRadius: '4px' }}>
				<Row>
					<Col md={8} style={{ padding: '0rem 2rem 1rem 3rem' }}>
						<Card.Title className='titles mt-4'>{interest.name}</Card.Title>
						{/* {interestNameURLRating ? <Rating initialRating={interestNameURLRating.rating} readonly /> : 'No Rating Available'} */}
						<p>
							<span className='font-weight-bold'>#{count}</span> of {total_count} things to do in {city}
						</p>
						<p>
							<Image style={{ background: '#00aa6c' }} className='my-auto mr-2' src={categoryIcon} rounded />
							<span className='my-auto'>{categoryName}</span>
						</p>
						<p>
							<FontAwesomeIcon size='lg' icon={['fas', 'map-marker-alt']} fixedWidth />
							<span className='subsubtitles'>Address:</span>{' '}
							{formattedAddress ? <span className='inline-p'>{formattedAddress}.</span> : <span className='inline-p'>No Address available.</span>}
						</p>
					</Col>
					<Col className='my-auto mr-md-4'>
						<Button block style={{ marginLeft: '10', marginRight: '10' }} onClick={getDetails} className='button_explore mt-2' variant='dark'>
							Explore
						</Button>{' '}
						{/* {interestNameURLRating ? (
                <div className='image_interest_container'>
                <Image
                className='image_interest'
                alt='Image'
                src={interestNameURLRating.interestURL}
                style={{ borderRadius: '3px', width: '85%' }}
                />{' '}
								</div>
                ) : (
                  ''
                )} */}
					</Col>
				</Row>
			</Card>
		</>
	)
}
