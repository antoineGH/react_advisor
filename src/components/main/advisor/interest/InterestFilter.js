import React, { useState, useEffect } from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";
import fetchInterestCategory from "../utils/fetchInterestCategory";
import CategoryList from "../category/CategoryList";
import InterestList from "./InterestList";
import uniqueCategories from "../utils/uniqueCategories";
import toTitle from "../../utils/toTitle";
import ScaleLoader from "react-spinners/ScaleLoader";
import _ from "lodash";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export default function InterestsFilter() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  const [moreInterests, setMoreInterests] = useState(null);
  const [latLng, setLatLng] = useState(null);
  const [interests, setInterests] = useState(null);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState([]);

  let myCategory = useParams().category;
  const history = useHistory();
  let location = useLocation();

  useEffect(() => {
    console.log("InterestsFilter useEffect 1");
    if (!location) return;
    let mount = true;
    if (_.get(location, "state.latLng")) {
      setLatLng(location.state.latLng);
      setInterests(location.state.interests);
      setCategory(location.state.category);
      setActiveCategory(location.state.category);
      setCategories(uniqueCategories(location.state.interests));

      setCategoryFilter((prevCategoryFilter) => {
        return [
          ...prevCategoryFilter,
          ...location.state.interests.filter(
            (interest) =>
              interest.categories[0].name === location.state.category
          ),
        ];
      });

      fetchInterestCategory(location.state.latLng, location.state.categoryID, 5)
        .then((response) => {
          if (mount) {
            setMoreInterests(response);
            setIsLoaded(true);
            setHasError(false);
          }
        })
        .catch((error) => {
          if (mount) {
            setHasError(true);
          }
        });
    } else {
      history.push("/");
    }
    return () => {
      mount = false;
    };
  }, [latLng, location, history]);

  useEffect(() => {
    console.log("InterestsFilter useEffect 2");
    if (categories === null || !location) return;
    categories.forEach((category) => {
      if (category.categoryName === myCategory) {
        setActiveCategory(myCategory);
      }
    });
    return () => {};
  }, [categories, location, myCategory]);

  function filterCategories(latLng, category, categoryID) {
    setCategory(category);
    setHasError(false);
    setIsLoaded(false);
    history.push({
      pathname: category.toLowerCase().trim().replaceAll(" ", "_"),
      state: {
        interests: interests,
        latLng: latLng,
        category: category,
        categoryID: categoryID,
      },
    });
  }

  function handleClick() {
    setIsLoaded(false);
    setHasError(false);
    let mount = true;

    if (_.get(location, "state.latLng")) {
      setLatLng(location.state.latLng);
      setInterests(location.state.interests);
      setCategory(location.state.category);
      setCategories(uniqueCategories(interests));

      location.state.interests.forEach((interest) => {
        if (interest.categories[0].name === location.state.category) {
          categoryFilter.push(interest);
        }
      });

      fetchInterestCategory(location.state.latLng, location.state.categoryID, 5)
        .then((response) => {
          if (mount) {
            console.log(response);
            console.log(typeof response);
            setMoreInterests(response);
            setIsLoaded(true);
            setHasError(false);
          }
        })
        .catch((error) => {
          if (mount) {
            setHasError(true);
          }
        });
    } else {
      history.push("/");
    }
  }

  if (hasError || !location) {
    return (
      <>
        <Row className="text-center">
          <Col>
            <p>
              <FontAwesomeIcon size="1x" icon={["fas", "info-circle"]} /> {"  "}
              Impossible to get the Category Details. Please try again later
            </p>
            <Button onClick={handleClick} variant="dark">
              Try Again&nbsp;&nbsp;
              <FontAwesomeIcon size="1x" icon={["fas", "sync"]} />
            </Button>
          </Col>
        </Row>
      </>
    );
  }

  if (!isLoaded) {
    return (
      <Row>
        <Col md={12}>
          <div className="weather_container_empty">
            <ScaleLoader
              css="display: flex; justify-content: center;"
              color={"#2E3030"}
              size={15}
            />
          </div>
        </Col>
      </Row>
    );
  } else {
    return (
      <>
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
                          {toTitle(category)}
                        </p>
                      </Col>
                    </Row>

                    <InterestList interests={moreInterests} />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
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
                            marginBottom: "1rem",
                          }}
                        >
                          Or maybe something else?
                        </p>
                      </Col>
                    </Row>

                    <CategoryList
                      latLng={latLng}
                      categories={categories}
                      filterCategories={filterCategories}
                      activeCategory={activeCategory}
                      setActiveCategory={setActiveCategory}
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
}
