import React from "react";
import { useHistory } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";
library.add(fas);

export default function Hotel({ hotel }) {
  const history = useHistory();

  // --- Location Information ---
  const city = hotel.location.city;
  const address1 = hotel.location.formattedAddress[0];
  const address2 =
    hotel.location.formattedAddress[1] ||
    "".concat(" ", hotel.location.formattedAddress[2] || "");

  // --- Category Information ---
  const categoryName = hotel.categories[0].name;
  const categoryIconPrefix = hotel.categories[0].icon.prefix;
  const categoryIconSuffix = hotel.categories[0].icon.suffix;
  const categoryIcon = categoryIconPrefix + "32" + categoryIconSuffix;

  // --- getDetails function, triggered with Button onClick => routes to Interest Details ---
  function getDetails() {
    history.push({
      pathname:
        "/search/" +
        city.replaceAll(" ", "_").trim().toLowerCase() +
        "/details/" +
        hotel.id,
      state: {
        interest: hotel,
        count: "",
        total_count: "",
        interestNameURLRating: "",
      },
    });
    window.window.scrollTo(0, 0);
  }

  return (
    <div
      style={{
        display: "flex",
        width: "98%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "2rem",
      }}
    >
      <Card
        className="favorite_card"
        onClick={getDetails}
        style={{
          borderRadius: "5px",
          cursor: "pointer",
          minHeight: "166px",
          width: "100%",
          boxShadow:
            " rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Card.Body
          style={{
            paddingBottom: "0rem",
            height: "100%",
            padding: ".7rem",
            paddingRight: "1rem",
          }}
        >
          <Card.Text style={{ paddingBottom: "0rem", height: "100%" }}>
            <Row>
              <Col
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  fontSize: "1rem",
                  color: "black",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  lineHeight: "2rem",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {hotel.name}
              </Col>
            </Row>
          </Card.Text>
          <Card.Footer
            style={{
              background: "white",
              padding: "1rem 0rem",
              position: "absolute",
              bottom: 0,
              left: 0,
              gap: "1rem",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Row
              style={{
                margin: "auto",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                paddingLeft: "0.5rem",
              }}
            >
              <Col
                xs={1}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={categoryIcon}
                  style={{
                    width: "24px",
                    height: "24px",
                    background: "#00aa6c",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  rounded
                />
              </Col>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  alignContent: "center",
                  fontFamily: "poppinsregular",
                  color: "#474747",
                  fontSize: "0.85rem",
                  paddingLeft: "0.5rem",
                }}
              >
                {categoryName}
              </Col>
            </Row>

            <Row
              style={{
                margin: "auto",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: "0.5rem",
              }}
            >
              <Col
                xs={1}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={["fas", "map-marker-alt"]}
                  style={{ width: "24px", height: "24px" }}
                  fixedWidth
                />
              </Col>
              <Col
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignContent: "center",
                }}
              >
                <Row style={{ width: "100%" }}>
                  <Col
                    xs={12}
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      textAlign: "left",
                      fontFamily: "poppinsregular",
                      color: "#474747",
                      fontSize: "0.85rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      paddingLeft: "0.5rem",
                    }}
                  >
                    {address1}
                  </Col>
                  <Col
                    xs={12}
                    style={{
                      textAlign: "left",
                      fontFamily: "poppinsregular",
                      color: "#474747",
                      fontSize: "0.85rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      paddingLeft: "0.5rem",
                    }}
                  >
                    {address2}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Footer>
        </Card.Body>
      </Card>
    </div>
  );
}
