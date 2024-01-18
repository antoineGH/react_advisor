import React from "react";

import { usePromiseTracker } from "react-promise-tracker";

import ScaleLoader from "react-spinners/ScaleLoader";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function LoadingSpinner(props) {
  const { promiseInProgress } = usePromiseTracker();

  return (
    <>
      <Container>
        <Row>
          <Col md={12}>
            {promiseInProgress === true ? (
              <ScaleLoader
                css="margin-top: 10rem; display: flex; justify-content: center;"
                margin={2}
                color={"#2E3030"}
                size={2}
              />
            ) : null}
          </Col>
        </Row>
      </Container>
    </>
  );
}
