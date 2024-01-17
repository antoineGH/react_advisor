import React from "react";

import { useHistory } from "react-router-dom";

import RestaurantCarousel from "./RestaurantCarousel";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

// Component to map Restaurants List and call Child Component Restaurant on each element.
// Require props: restaurant
export default function RestaurantList({ restaurants, city, latLng }) {
  const history = useHistory();

  const category = restaurants[1].categories[0].name;
  const categoryID = restaurants[1].categories[0].id;
  const nameURLRating = "";

  function handleClick() {
    history.push({
      pathname:
        city.replaceAll(" ", "_").trim().toLowerCase() +
        "/" +
        category.toLowerCase().trim().replaceAll(" ", "_"),
      state: {
        interests: restaurants,
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
              Restaurants
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
              style={{ borderRadius: "5px" }}
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

        <RestaurantCarousel restaurants={restaurants} />
      </Col>
    </Row>
  );
}
