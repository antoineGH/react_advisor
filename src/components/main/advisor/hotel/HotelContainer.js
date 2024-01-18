import React, { useState, useEffect } from "react";

import fetchInterestCategory from "../utils/fetchInterestCategory";

import ScaleLoader from "react-spinners/ScaleLoader";

import HotelList from "./HotelList";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export default function HotelContainer({ latLng, city }) {
  // --- Hotel State Management ---
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hotels, setHotels] = useState(null);

  // --- Hotel Variables ---
  const hotelCategoryId = "4bf58dd8d48988d1fa931735";
  const limit = 9;

  // --- Hotel Functions ---

  // Get Hotels from Foursquare API + Update State
  useEffect(() => {
    console.log("HotelContainer useEffect");
    if (latLng === undefined) return;

    fetchInterestCategory(latLng, hotelCategoryId, limit)
      .then((response) => {
        setHotels(response);
        setIsLoaded(true);
        setHasError(false);
      })
      .catch((error) => {
        setHasError(true);
      });
  }, [latLng]);

  // --- HandleClick Retry fetchInterestCategory ---
  function handleClick() {
    setIsLoaded(false);
    setHasError(false);

    setTimeout(() => {
      fetchInterestCategory(latLng, hotelCategoryId, limit)
        .then((response) => {
          setHotels(response);
          setIsLoaded(true);
          setHasError(false);
        })
        .catch((error) => {
          setHasError(true);
        });
    }, 1500);
  }

  if (hasError) {
    return (
      <>
        <Container>
          <Row className="text-center">
            <Col>
              <p>
                Impossible to find Hotels
                <FontAwesomeIcon size="lg" icon={["fas", "luggage-cart"]} />
              </p>
              <Button onClick={handleClick} variant="dark">
                Try Again&nbsp;&nbsp;
                <FontAwesomeIcon size="1x" icon={["fas", "sync"]} />
              </Button>
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  if (!isLoaded) {
    return (
      <Row>
        <Col md={12}>
          <Container
            className="weather_container"
            style={{
              height: "303px",
              background: "#f2f2f2",
              margin: "auto",
              width: "100%",
              maxWidth: "1110px",
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            <ScaleLoader
              css="display: flex; justify-content: center; align-items: center; margin-top: 3rem;"
              color="#212529"
              size={15}
            />
          </Container>
        </Col>
      </Row>
    );
  } else {
    return (
      <Container>
        <Row>
          <Col md={12}>
            <div
              className="weather_container"
              style={{ background: "#f2f2f2", opacity: false }}
            >
              <HotelList hotels={hotels} city={city} latLng={latLng} />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
