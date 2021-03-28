import React from 'react'

import FavoriteList from './FavoriteList';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Barcelona from '../../../../static/Barcelona.jpg'
import London from '../../../../static/London.jpg'
import Nyc from '../../../../static/Nyc.jpg'
import Paris from '../../../../static/Paris.jpg'
import Roma from '../../../../static/Roma.jpg'
import Singapore from '../../../../static/Singapore.jpg'
import Tokyo from '../../../../static/Tokyo.jpg'

export default function FavoriteContainer() {

    /// --- Favorite Variables ---
    const listFavorite = [
        { lat: 40.7127753, lng: -74.0059728, city: "New York", url: Nyc },
        { lat: 1.352083, lng: 103.819836, city: "Singapore", url: Singapore },
        { lat: 41.9027835, lng: 12.4963655, city: "Rome", url: Roma },
        { lat: 48.856614, lng: 2.3522219, city: "Paris", url: Paris },
        { lat: 41.3850639, lng: 2.1734035, city: "Barcelona", url: Barcelona },
        { lat: 35.6761919, lng: 139.6503106, city: "Tokyo", url: Tokyo },
        { lat: 51.5073509, lng: -0.1277583, city: "London", url: London }
    ]

    return (
        <Container>
            <Row>
                <Col md={12}>
                    <div className="weather_container" style={{ background: '#f2f2f2', opacity: false }}>
                        <FavoriteList favorites={listFavorite} />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

