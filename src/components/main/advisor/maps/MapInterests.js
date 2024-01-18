import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Maps from "./Maps";
import Titles from "../../design/Titles";
import ScaleLoader from "react-spinners/ScaleLoader";
import _ from "lodash";

export default function MapContainer() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [latLng, setLatLng] = useState("");
  const [interests, setInterests] = useState(null);
  let location = useLocation();
  const history = useHistory();

  useEffect(() => {
    console.log("MapContainer useEffect");
    if (_.get(location, "state.latLng")) {
      setLatLng(location.state.latLng);
      setInterests(location.state.interests);
      setIsLoaded(true);
    } else {
      history.push("/");
    }
  }, [location, history]);

  if (!isLoaded) {
    return (
      <>
        <Container>
          <Row className="justify-content-center">
            <Col md={12} className="d-none d-lg-block">
              <Titles title="Interests on the map" />
            </Col>
          </Row>
          <br />
          <Row className="justify-content-center">
            <Col xs={11} md={12} className="maps">
              <ScaleLoader
                css="display: flex; justify-content: center;"
                color={"#2E3030"}
                size={15}
              />
            </Col>
          </Row>
        </Container>
        <br />
        <br />
      </>
    );
  } else {
    return (
      <>
        <Container>
          <Row className="justify-content-center">
            <Col md={12} className="d-none d-lg-block">
              <Titles title="Interests on the map" />
            </Col>
          </Row>
          <br />
          <Row className="justify-content-center">
            <Col xs={11} md={12} className="maps">
              <Maps interests={interests} lat={latLng.lat} lng={latLng.lng} />
            </Col>
          </Row>
        </Container>
        <br />
        <br />
      </>
    );
  }
}
