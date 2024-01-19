import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import MapContainer from "../maps/MapContainer";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import ContainerInterestSimilar from "./ContainerInterestSimilar";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export default function InterestDetails() {
  let location = useLocation();
  const history = useHistory();

  const [isLoaded, setIsLoaded] = useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [interest, setInterest] = useState(null);
  const [formattedAddress, setFormattedAddress] = useState(null);
  const [name, setName] = useState(null);
  const [categoryIcon, setCategoryIcon] = useState(null);
  const [categoryName, setCategoryName] = useState(null);

  useEffect(() => {
    if (_.get(location, "state.interest")) {
      setInterest(location.state.interest);
      setName(location.state.interest.name);
      setLat(location.state.interest.location.lat);
      setLng(location.state.interest.location.lng);
      setFormattedAddress(
        location.state.interest.location.formattedAddress.join(", ")
      );
      const categoryIconPrefix =
        location.state.interest.categories[0].icon.prefix;
      const categoryIconSuffix =
        location.state.interest.categories[0].icon.suffix;
      setCategoryIcon(categoryIconPrefix + "32" + categoryIconSuffix);
      setCategoryName(location.state.interest.categories[0].name);
      setIsLoaded(true);
    } else {
      history.push("/");
    }
  }, [history, location]);

  if (!isLoaded) {
    return <p>loading</p>;
  } else {
    return (
      <>
        <Container fluid>
          <Row>
            <Col md={12} className="interest_list">
              <Container>
                <Card
                  border="light"
                  className="mt-4"
                  style={{ width: "100%", borderRadius: "4px" }}
                >
                  <Row>
                    <Card.Body>
                      <Col xs={12}>
                        <p
                          className="hotel_carousel_title"
                          style={{
                            justifyContent: "flex-start",
                            alignItems: "center",
                            lineHeight: "1",
                            marginBottom: "1rem",
                          }}
                        >
                          {name}
                        </p>
                      </Col>

                      <Card.Text
                        className="subtitles"
                        style={{ margin: 0, padding: 0 }}
                      >
                        <Row
                          style={{
                            marginLeft: "-0.2rem",
                            width: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-start",
                          }}
                        >
                          <Col
                            xs={1}
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "center",
                              marginBottom: "1rem",
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
                              fontWeight: "400",
                            }}
                          >
                            {categoryName}
                          </Col>
                        </Row>

                        <Row
                          style={{
                            marginLeft: "0rem",
                            width: "50%",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            marginBottom: ".5rem",
                          }}
                        >
                          <Col
                            xs={1}
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
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
                                  fontWeight: "400",
                                }}
                              >
                                {formattedAddress}
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card.Text>
                    </Card.Body>
                  </Row>
                </Card>
                <MapContainer interest={interest} lat={lat} lng={lng} />
                <ContainerInterestSimilar
                  interest={interest}
                  categoryName={categoryName}
                />
              </Container>
              <br />
              <br />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
