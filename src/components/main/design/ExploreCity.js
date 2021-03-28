import React from 'react'

import toTitle from '../utils/toTitle'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// Component to Display Explore City design element
// Require props: city
export default function ExploreCity({ latLng }) {
    
    return (
        <Row>
            <Col md={12}>
                <div className="explore_city mt-md-2 mb-md-1"><span className="explore">Explore </span>{toTitle(latLng.city)}</div>
            </Col>
        </Row>
    )
}
