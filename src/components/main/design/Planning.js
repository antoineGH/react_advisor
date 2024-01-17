import React from "react";

import { useHistory } from "react-router-dom";

import toTitle from "../utils/toTitle";
import Map_Logo from "../../../static/image_trips_card_medium.png";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// Component to Display Planning
// Require props: city, interests, cityGPS, nameURLRating
export default function Planning({ latLng, interests, nameURLRating }) {
  const history = useHistory();

  // --- handleClick function, triggered with Button onClick => routes to City Interests (MapInterests)  ---
  function handleClick() {
    history.push({
      pathname:
        "/search/" +
        latLng.city.replaceAll(" ", "_").trim().toLowerCase() +
        "/interests",
      state: {
        interests: interests,
        latLng: latLng,
        nameURLRating: nameURLRating,
      },
    });
    window.window.scrollTo(0, 0);
  }

  return (
    <Row>
      <Col md={12}>
        <div>
          <Col md={12} className="planning ">
            <Col md={6} className="d-none d-lg-block">
              <img className="img_map_city" src={Map_Logo} alt="Map" />
            </Col>
            <Col md={12} lg={6} className="mt-3 mt-lg-4 mt-xl-5">
              <p className="planning_text" style={{ color: "white" }}>
                Start planning {latLng && "for " + toTitle(latLng.city)}
              </p>
              <p
                className="planning_description ml-md-1"
                style={{ color: "white" }}
              >
                Explore interets around you
              </p>
              {latLng && (
                <Button
                  onClick={handleClick}
                  variant="dark"
                  size="lg"
                  className=" ml-md-1 mb-3 mb-lg-0 button_explore"
                  style={{ marginLeft: ".5rem" }}
                >
                  Explore City
                </Button>
              )}
            </Col>
          </Col>
        </div>
      </Col>
    </Row>
  );
}
