import React from "react";

import FavoriteCarousel from "./FavoriteCarousel";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Component to map Favorites List and call Child Component Favorite on each element.
// Require props: Favorite
export default function FavoriteList({ favorites }) {
  return (
    <Row>
      <Col md={12} className="text-center justify-content-center">
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Col>
            <p
              className="hotel_carousel_title"
              style={{
                justifyContent: "flex-start",
                alignItems: "center",
                marginLeft: "1rem",
                lineHeight: "1",
                marginTop: "1rem",
                marginBottom: ".7rem",
              }}
            >
              Destination Travelers Love
            </p>
          </Col>
        </Row>

        <FavoriteCarousel favorites={favorites} />
      </Col>
    </Row>
  );
}
