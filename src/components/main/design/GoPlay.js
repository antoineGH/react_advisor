import React from 'react'

import { ReactComponent as Logo } from '../../../static/home_hero_got_illustration.svg';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// Component to Display Go Play design element
export default function GoPlay() {
    return (
        <Row>
            <Col md={12} className='d-none d-lg-block' style={{marginBottom: '-5%'}}>
                <div className="home_hero go_play" >
                    <div className='home_hero_img'>
                        <Logo />
                    </div>
                    <p style={{ marginLeft: '20px', marginTop: '-35%', fontSize: '32px', fontFamily: 'poppinsregular', color: 'black', fontWeight: '1200' }}>Go Play.</p>
                    <p className="d-none d-lg-block play_description" style={{ marginTop: '-15px' }}>Places to see and signature experiences.</p>
                </div>
            </Col>
        </Row>
    )
}

