import React from 'react'

import { usePromiseTracker } from "react-promise-tracker";

import SyncLoader from "react-spinners/SyncLoader";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function LoadingSpinner(props) {
    const { promiseInProgress } = usePromiseTracker();

    return (
        <>
            <Container>
                <Row>
                    <Col md={12}>
                        {(promiseInProgress === true) ? <SyncLoader css="margin-top: 20px; display: flex; justify-content: center;" margin={2} color={"#2E3030"} size={15} /> : null}
                    </Col>
                </Row>
            </Container>
        </>
    )
}
