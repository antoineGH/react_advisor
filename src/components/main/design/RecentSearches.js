import React from 'react'
import RecentSearch from './RecentSearch'
import uniqueRecentSearch from './utils/uniqueRecentSearch'
import { Container, Row, Col, Button } from 'react-bootstrap'

export default function RecentSearches(props) {
	const { recentSearches, clearRecentDestination } = props
	const uniqueRecentSearches = uniqueRecentSearch(recentSearches)

	return (
		<Container>
			<Row>
				<Col md={12}>
					<div className='recent_container' style={{ background: '#f2f2f2', opacity: false }}>
						<Row>
							<Col md={6}>
								<p className='hotel_carousel_title text-left ml-3'>Your recent searches</p>
							</Col>
						</Row>
						<Row>
							<Col>
								{uniqueRecentSearches.map((recentSearch, count) => {
									count++
									return <RecentSearch key={count} recentSearch={recentSearch} />
								})}
							</Col>
						</Row>
						<Row>
							<Col md={12} className='ml-2'>
								<Button variant='btn clear_recent' onClick={clearRecentDestination}>
									Clear Searches
								</Button>
							</Col>
						</Row>
					</div>
				</Col>
			</Row>
		</Container>
	)
}
