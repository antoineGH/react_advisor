import React, { useEffect, useState } from 'react'
import InterestSimilar from './InterestSimilar'
import fetchSimilar from './utils/fetchSimilar'
import { Card, Row, Col } from 'react-bootstrap'
import ScaleLoader from 'react-spinners/ScaleLoader'

export default function ContainerInterestSimilar(props) {
	const { interest, categoryName } = props
	const [similarInterests, setSimilarInterests] = useState(null)
	const [hasLoaded, setHasLoaded] = useState(false)
	const [hasError, setHasError] = useState(false)

	useEffect(() => {
		let mount = true
		fetchSimilar(interest.id)
			.then((response) => {
				if (mount) {
					setSimilarInterests(response)
					setHasLoaded(true)
				}
			})
			.catch((error) => {
				if (mount) {
					setHasError(true)
				}
			})
		return () => {
			mount = false
		}
	}, [interest.id])

	if (hasError) return null
	if (!hasLoaded)
		return (
			<Card border='light' className='mt-4' style={{ width: '100%', borderRadius: '4px' }}>
				<Row>
					<Col md={12}>
						<Card.Body>
							<Card.Title className='hotel_carousel_title text-center'>Similar {categoryName} around</Card.Title>
						</Card.Body>
					</Col>
					<Col style={{ minHeight: '21vh' }}>
						<ScaleLoader css='display: flex; justify-content: center;' color={'#2E3030'} size={15} />
					</Col>
				</Row>
			</Card>
		)
	if (hasLoaded)
		return (
			<>
				<Card border='light' className='mt-4' style={{ width: '100%', borderRadius: '4px' }}>
					<Row>
						<Col md={12}>
							<Card.Body>
								<Card.Title className='hotel_carousel_title text-center'>Similar {categoryName} around</Card.Title>
							</Card.Body>
						</Col>
						{similarInterests.slice(0, 3).map((interest, count) => {
							count++
							const interestNameURLRating = ''
							return (
								<Col key={interest.id} xs={11} lg={4} style={{ marginTop: '-5%' }}>
									<InterestSimilar
										count={count}
										total_count={similarInterests.length}
										interest={interest}
										interestNameURLRating={interestNameURLRating}
									/>
								</Col>
							)
						})}
					</Row>
				</Card>
			</>
		)
}
