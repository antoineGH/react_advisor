import React from "react";
// eslint-disable-next-line
import { useHistory } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

// Component to Display Interest
// Require props: interest, count, total_count,
export default function Interest({
  interest,
  count,
  total_count,
  interestNameURLRating,
}) {
  const history = useHistory();

  // --- Location Information ---
  const city = interest.location.city;
  const address1 = interest.location.formattedAddress[0];
  const address2 =
    interest.location.formattedAddress[1] ||
    "".concat(" ", interest.location.formattedAddress[2] || "");

  // --- Category Information ---
  const categoryName = interest.categories[0].name;
  const categoryIconPrefix = interest.categories[0].icon.prefix;
  const categoryIconSuffix = interest.categories[0].icon.suffix;
  const categoryIcon = categoryIconPrefix + "32" + categoryIconSuffix;

  // --- getDetails function, triggered with Button onClick => routes to Interest Details ---
  function getDetails() {
    history.push({
      pathname:
        "/search/" +
        city.replaceAll(" ", "_").trim().toLowerCase() +
        "/details/" +
        interest.id,
      state: {
        interest: interest,
        count: count,
        total_count: total_count,
        // interestNameURLRating: interestNameURLRating,
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
                  height: "100%",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  lineHeight: "2rem",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {interest.name}
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
