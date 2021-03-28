import React from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Button, Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export default function InterestSimilarPreview({ interest, count, total_count, interestNameURLRating }) {
	const history = useHistory()

	const city = interest.location.city
	const formattedAddress = interest.location.formattedAddress.join(', ')

	const categoryName = interest.categories[0].name
	const categoryIconPrefix = interest.categories[0].icon.prefix
	const categoryIconSuffix = interest.categories[0].icon.suffix
	const categoryIcon = categoryIconPrefix + '32' + categoryIconSuffix

	function getDetails() {
		history.push({
			pathname: '/search/' + city.replaceAll(' ', '_').trim().toLowerCase() + '/details/' + interest.id,
			state: {
				interest: interest,
				count: count,
				total_count: total_count,
				interestNameURLRating: interestNameURLRating,
			},
		})
		window.window.scrollTo(0, 0)
	}

	return (
		<>
			<div>
				<Card border='light' className='mt-4' style={{ width: '100%', borderRadius: '4px' }}>
					<Card.Body>
						<Card.Title className='text-center' style={{ fontWeight: 700, lineHeight: '1.5em', height: '3em' }}>
							{interest.name}
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
							<Button
								block
								style={{ backgroundColor: '#000000', marginLeft: '10', marginRight: '10' }}
								onClick={getDetails}
								className='button_explore mt-2'
								variant='dark'>
								Explore
							</Button>{' '}
						</Card.Text>
					</Card.Body>
				</Card>
			</div>
		</>
	)
}
