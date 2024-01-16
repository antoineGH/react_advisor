import React from "react";
import toTitle from "../utils/toTitle";
import { Row, Col, NavLink } from "react-bootstrap";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export default function BreadCrumb({ country, state, latLng }) {
  let city = "";
  if (_.get(latLng, "city")) {
    city = latLng.city;
  }

  return (
    <Row style={{ maxHeight: "15px" }}>
      <Col md={6}>
        <NavLink
          disabled
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignContent: "center",
            padding: "0rem",
          }}
        >
          <p
            style={{
              fontSize: "0.85rem",
              display: "flex",
              gap: ".5rem",
              flexDirection: "row",
            }}
          >
            {country && (
              <span style={{ fontSize: "1rem" }}>
                {country}
                <FontAwesomeIcon
                  style={{ marginLeft: ".5rem" }}
                  size="xs"
                  icon={["fas", "greater-than"]}
                />
              </span>
            )}
            {state && (
              <span style={{ fontSize: "1rem" }}>
                {state}
                <FontAwesomeIcon
                  style={{ marginLeft: ".5rem" }}
                  size="xs"
                  icon={["fas", "greater-than"]}
                />
              </span>
            )}
            {city ? (
              <span style={{ fontSize: "1rem" }}>{toTitle(city)}</span>
            ) : (
              ""
            )}
          </p>
        </NavLink>
      </Col>
    </Row>
  );
}
