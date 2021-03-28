import React from 'react'

import { ReactComponent as LogoMark } from '../../../static/logomark_solid_cream.svg';
import AwardCard from '../../../static/tc_cards.jpeg';


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Award() {
    return (
        <div>
            <Container  fluid className='award justify-content-center text-center' style={{ color: 'white' }}>
                <Row xs={12}>
                    <Col xs={12} lg={2} xl={2}>
                    </Col>
                    <Col md={12} lg={2} xl={2}className='text-center' style={{ marginTop: '50px' }}>
                        <Row >
                            <Col lg={6} xl={6} className='mt-1 mt-lg-2 mt-xl-3 justify-content-center text-center image-container' style={{ maxHeight: '15vh', maxWidth: '22vh' }}>
                                <LogoMark />
                            </Col>
                        </Row>
                        <Row  className='justify-content-center'>
                            <Col lg={6} xl={6} className='title_award text-center mt-3'>
                                <h1 className='title_award'>Travelers Choice Awards</h1>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={1}>
                    </Col>
                    <Col xs={12} md={12} lg={5} xl={5}>
                        <img src={AwardCard} className='img_award' alt='Award' />
                    </Col>

                </Row>
            </Container>
        </div>
    )
}
