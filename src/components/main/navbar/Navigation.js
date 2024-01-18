import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import LocationSearch from "../LocationSearch";
import toTitle from "../utils/toTitle";
import updateLocalStorage from "../utils/updateLocalStorage";

import HorizontalLogo from "../../../static/explore_brand.png";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

// Component to display NavBar
export default function Navigation() {
  // --- NavBar State Management ---
  const [latLng, setLatLng] = useState(null);
  const [city, setCity] = useState(null);

  const history = useHistory();

  // --- Navbar Functions ---
  function handleSearch(latLng) {
    const city = toTitle(latLng.city);
    setLatLng(latLng);
    setCity(city);
  }

  function handleClick() {
    if (latLng && city) {
      const inputArray = { city: city, lat: latLng.lat, lng: latLng.lng };
      updateLocalStorage("historyDestination", inputArray);
      const cityURI = city.replaceAll(" ", "_").trim().toLowerCase();
      history.push({
        pathname: "/search/" + cityURI,
        state: {
          latLng: latLng,
        },
      });
    } else {
      window.location.reload();
    }
  }

  return (
    <>
      <Container style={{ padding: "1rem" }}>
        <Navbar
          bg="light"
          variant="light"
          expand="xs"
          className="text-center justify-content-center mb-3 mb-md-0"
          style={{ paddingRight: 0, paddingLeft: 0 }}
        >
          <Row style={{ width: "100%" }}>
            <Col
              md={12}
              className="text-left justify-content-left"
              style={{ padding: 0 }}
            >
              <Navbar.Brand
                href="/"
                style={{ maxHeight: "5vh", maxWidth: "15vh" }}
              >
                <img
                  src={HorizontalLogo}
                  alt="logo-explorer"
                  width="65%"
                  height="65%"
                />
              </Navbar.Brand>
            </Col>
            <Col
              md={12}
              style={{ padding: 0 }}
              className="text-left justify-content-left"
            >
              <LocationSearch
                handleSearch={handleSearch}
                handleClick={handleClick}
                placeHolder="Where to?"
              />
            </Col>
          </Row>
        </Navbar>
      </Container>
    </>
  );
}
