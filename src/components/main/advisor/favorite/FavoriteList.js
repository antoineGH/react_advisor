import React from "react";

import FavoriteCarousel from "./FavoriteCarousel";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Component to map Favorites List and call Child Component Favorite on each element.
// Require props: Favorite
export default function FavoriteList({ favorites }) {
  return (
    <Row>
      <Col md={12}>
        <p
          className="hotel_carousel_title text-left ml-3"
          style={{ marginBottom: ".7rem" }}
        >
          Destinations travelers love
        </p>
        <FavoriteCarousel favorites={favorites} />
      </Col>
    </Row>
  );
}
