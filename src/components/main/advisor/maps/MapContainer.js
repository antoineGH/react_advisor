import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import GoogleMap from './GoogleMap'

// Component to Display Map Container
// Design and Call Map Child Component
// Require props: name, lat, lng
export default function MapContainer({ interest, lat, lng }) {
	return (
		<>
			<div className='map' style={{ borderRadius: '4px', marginTop: '-1%' }}>
				<Row className='justify-content-center'>
					<GoogleMap interest={interest} lat={lat} lng={lng} />
					<Col md={12} className='mt-4' style={{ width: '100%', height: '100%' }}></Col>
					<Col md={4}>
						<div className='planning_text mt-4'>Search on the map.</div>
						<div className='mt-md-1 planning_description'>Find {interest.name}.</div>
					</Col>
				</Row>
			</div>
		</>
	)
}
