import React from "react";

import { useHistory } from "react-router-dom";

import HotelCarousel from "./HotelCarousel";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

// Component to map Hotels List and call Child Component Hotel on each element.
// Require props: hotels
export default function HotelList({ hotels, city, latLng }) {
  const history = useHistory();

  const category = hotels[1].categories[0].name;
  const categoryID = hotels[1].categories[0].id;
  const nameURLRating = "";

  function handleClick() {
    history.push({
      pathname:
        city.replaceAll(" ", "_").trim().toLowerCase() +
        "/" +
        category.toLowerCase().trim().replaceAll(" ", "_"),
      state: {
        interests: hotels,
        nameURLRating: nameURLRating,
        latLng: latLng,
        category: category,
        categoryID: categoryID,
      },
    });
  }

  return (
    <Row>
      <Col md={12} className="text-center justify-content-center">
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <Col>
            <p
              className="hotel_carousel_title"
              style={{
                justifyContent: "flex-start",
                alignItems: "center",
                marginLeft: "1rem",
                marginBottom: "0",
              }}
            >
              Hotels
            </p>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginRight: "1rem",
            }}
          >
            <Button
              variant="link-dark"
              style={{ borderRadius: "5px", marginBottom: ".5rem" }}
              onClick={handleClick}
            >
              See All
              <FontAwesomeIcon
                size="1.5x"
                style={{ marginLeft: ".5rem" }}
                icon={["fas", "angle-right"]}
              />
            </Button>
          </Col>
        </Row>

        <HotelCarousel hotels={hotels} />
      </Col>
    </Row>
  );
}
