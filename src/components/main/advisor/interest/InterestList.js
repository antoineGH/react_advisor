import React from 'react'
import Interest from './Interest'
import { Container, Row, Col } from 'react-bootstrap'

export default function InterestList({ interests, nameURLRating }) {
	return (
		<>
			<Row>
				<Col md={12} className='interest_list'>
					{interests.map((interest, count) => {
						count++
						return (
							<Container key={interest.id}>
								<Interest count={count} total_count={interests.length} interest={interest} />
							</Container>
						)
					})}
					<br />
				</Col>
			</Row>
		</>
	)
}
