import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// Component to Display Errors
export default function Error({ errorMessage }) {
    return (
        <>
            <Container>
                <Row className='justify-content-center' style={{ textAlign: 'center' }}>
                    <Col className='mt-3' md={12}>
                        <p style={{ marginLeft: '20px', fontSize: '32px', fontFamily: 'poppinsbold', color: 'black', fontWeight: '1200' }}>Oh No!</p>
                        <p>{errorMessage}</p>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
