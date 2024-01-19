import React, { useEffect, useState } from "react";
import InterestSimilar from "./InterestSimilar";
import fetchSimilar from "./utils/fetchSimilar";
import { Card, Row, Col, Container } from "react-bootstrap";
import ScaleLoader from "react-spinners/ScaleLoader";

export default function ContainerInterestSimilar(props) {
  const { interest, categoryName } = props;
  const [similarInterests, setSimilarInterests] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let mount = true;
    fetchSimilar(interest.id)
      .then((response) => {
        if (mount) {
          setSimilarInterests(response);
          setHasLoaded(true);
        }
      })
      .catch((error) => {
        if (mount) {
          setHasError(true);
        }
      });
    return () => {
      mount = false;
    };
  }, [interest.id]);

  if (hasError) return null;
  if (!hasLoaded)
    return (
      <Card
        border="light"
        className="mt-4"
        style={{ width: "100%", borderRadius: "4px" }}
      >
        <Row>
          <Col md={12}></Col>
          <Col style={{ minHeight: "21vh" }}>
            <ScaleLoader
              css="display: flex; justify-content: center; align-items: center; margin-top: 7rem;"
              color={"#2E3030"}
              size={15}
            />
          </Col>
        </Row>
      </Card>
    );
  if (hasLoaded)
    return (
      <Container>
        <Row
          className="weather_container"
          style={{
            opacity: false,
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            padding: "0rem 0.8rem",
            backgroundColor: "white",
          }}
        >
          <Col xs={12}>
            <p
              className="hotel_carousel_title"
              style={{
                justifyContent: "flex-start",
                alignItems: "center",
                lineHeight: "1",
                marginTop: "1.5rem",
                marginBottom: "1rem",
              }}
            >
              Similar {categoryName} around
            </p>
          </Col>
          {similarInterests.slice(0, 3).map((interest, count) => {
            count++;
            const interestNameURLRating = "";
            return (
              <Col key={interest.id} xs={11} lg={4}>
                <InterestSimilar
                  count={count}
                  total_count={similarInterests.length}
                  interest={interest}
                  interestNameURLRating={interestNameURLRating}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    );
}
