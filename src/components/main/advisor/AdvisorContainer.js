import React from "react";
import BreadCrumb from "../design/BreadCrumb";
import ExploreCity from "../design/ExploreCity";
import Titles from "../design/Titles";
import Planning from "../design/Planning";
import CategoryList from "./category/CategoryList";
import WeatherContainer from "./weather/WeatherContainer";
import InterestList from "./interest/InterestList";
import HotelContainer from "./hotel/HotelContainer";
import RestaurantContainer from "./restaurant/RestaurantContainer";
import uniqueCategories from "./utils/uniqueCategories";
import toTitle from "../utils/toTitle";
import { Container, Row, Col } from "react-bootstrap";

export default function InterestContainer({
  interests,
  filterCategories,
  latLng,
  nameURLRating,
  setActiveCategory,
}) {
  const state = interests[0].location.state;
  const country = interests[0].location.country;
  const categories = uniqueCategories(interests);

  return (
    <>
      <Container>
        <ExploreCity latLng={latLng} />
        <BreadCrumb country={country} state={state} latLng={latLng} />
        <Row>
          <Col md={12}>
            <div className="weather_container">
              <WeatherContainer
                country={country}
                state={state}
                latLng={latLng}
                details={false}
              />
            </div>
          </Col>
        </Row>
      </Container>
      <HotelContainer latLng={latLng} city={toTitle(latLng.city)} />
      <RestaurantContainer latLng={latLng} city={toTitle(latLng.city)} />
      <Container>
        <Titles title={"Essential " + toTitle(latLng.city)} />
        <Planning
          latLng={latLng}
          interests={interests}
          nameURLRating={nameURLRating}
        />
        <br />
      </Container>

      {/* <Container fluid> */}
      <Container>
        <Row>
          <Col md={12}>
            <div
              className="weather_container"
              style={{ background: "#f2f2f2", opacity: false }}
            >
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
                        Interests
                      </p>
                    </Col>
                  </Row>
                  <CategoryList
                    latLng={latLng}
                    categories={categories}
                    filterCategories={filterCategories}
                    setActiveCategory={setActiveCategory}
                  />
                  <InterestList
                    interests={interests}
                    nameURLRating={nameURLRating}
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
