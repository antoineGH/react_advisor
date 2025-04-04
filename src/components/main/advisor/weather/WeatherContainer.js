import React, { useState, useEffect } from "react";

import toTitle from "../../utils/toTitle";
import getDay from "./utils/getDay";
import getDatetime from "./utils/getDatetime";
import fetchWeather from "./utils/fetchWeather";

import ScaleLoader from "react-spinners/ScaleLoader";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export default function WeatherContainer({ country, state, latLng, details }) {
  // --- WeatherContainer State Management ---
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [current, setCurrent] = useState(null);
  const [daily, setDaily] = useState(null);

  let city = latLng.city;

  // Control for missing arguments
  country ? (country = <span>{country}</span>) : (country = "");
  state ? (state = <span>{state},</span>) : (state = "");
  city ? (city = <span>{toTitle(city)},</span>) : (city = "");

  useEffect(() => {
    if (latLng.lat && latLng.lng === undefined) return;
    const lat = latLng.lat;
    const lng = latLng.lng;

    fetchWeather(lat, lng)
      .then((response) => {
        console.log(response);
        // Adjusting to new API structure
        const currentWeather = {
          dt: response.list[0].dt,
          temp: response.list[0].main.temp,
          weather: response.list[0].weather,
          humidity: response.list[0].main.humidity,
          clouds: response.list[0].clouds.all,
          wind_speed: response.list[0].wind.speed,
        };
        const dailyForecast = response.list.filter((_, index) => index % 8 === 0).map((item) => ({
          dt: item.dt,
          temp: {
            min: item.main.temp_min,
            max: item.main.temp_max,
          },
          weather: item.weather,
        }));

        setCurrent(currentWeather);
        setDaily(dailyForecast);
        setIsLoaded(true);
        setHasError(false);
      })
      .catch((error) => {
        setHasError(true);
      });
  }, [latLng]);

  // --- HandleClick Retry fetchWeather ---
  function handleClick() {
    const lat = latLng.lat;
    const lng = latLng.lng;

    setIsLoaded(false);
    setHasError(false);

    setTimeout(() => {
      fetchWeather(lat, lng)
        .then((response) => {
          // Adjusting to new API structure
          const currentWeather = {
            dt: response.list[0].dt,
            temp: response.list[0].main.temp,
            weather: response.list[0].weather,
            humidity: response.list[0].main.humidity,
            clouds: response.list[0].clouds.all,
            wind_speed: response.list[0].wind.speed,
          };
          const dailyForecast = response.list.filter((_, index) => index % 8 === 0).map((item) => ({
            dt: item.dt,
            temp: {
              min: item.main.temp_min,
              max: item.main.temp_max,
            },
            weather: item.weather,
          }));

          setCurrent(currentWeather);
          setDaily(dailyForecast);
          setIsLoaded(true);
          setHasError(false);
        })
        .catch((error) => {
          setHasError(true);
        });
    }, 1500);
  }

  if (hasError) {
    return (
      <>
        <Row className="text-center">
          <Col>
            <p>
              Impossible to get the Weather. Please try again later{" "}
              <FontAwesomeIcon size="2x" icon={["fas", "cloud-sun"]} />
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
      <>
        <Row>
          <Col md={12}>
            <div
              className="weather_container_empty"
              style={{ height: "178px" }}
            >
              <ScaleLoader
                css="display: flex; justify-content: center; align-items: center; margin-top: 3rem;"
                color="white"
                size={15}
              />
            </div>
          </Col>
        </Row>
      </>
    );
  } else {
    return (
      <>
        <Row
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Col sm={12} lg={4}>
            <Row
              style={{
                display: "flex",
                direction: "column",
                justifyContent: "space-between",
              }}
            >
              <Col
                sm={12}
                md={12}
                lg={12}
                className="justify-content-center mt-1"
                style={{ marginLeft: "1.5rem" }}
              >
                <div
                  className="weather_breadcrumb"
                  style={{
                    color: "white",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                  }}
                >
                  {city} {state} {country}
                </div>
                <div
                  className="weather_today"
                  style={{
                    color: "white",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                  }}
                >
                  {getDay(0)}, {getDatetime(current.dt)}
                </div>
                <div
                  className="weather_description"
                  style={{
                    color: "white",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                  }}
                >
                  {current.weather[0].main}, {current.weather[0].description}
                </div>
                <div>
                  <span style={{ fontSize: "1rem", color: "white" }}>
                    {current.temp.toFixed(1)}
                  </span>
                  <span style={{ fontSize: "1rem", color: "white" }}>°C</span>
                  <Image
                    loading="lazy"
                    width="30"
                    height="30"
                    src={
                      "https://openweathermap.org/img/w/" +
                      current.weather[0].icon +
                      ".png"
                    }
                  />
                </div>
                <div
                  className="weather_today"
                  style={{
                    marginTop: "0rem",
                    textAlign: "left",
                    color: "white",
                    lineHeight: "1.5rem",
                    fontSize: ".8rem",
                    fontWeight: 500,
                  }}
                >
                  Humidity: {current.humidity} %
                </div>
                <div
                  className="weather_today"
                  style={{
                    textAlign: "left",
                    color: "white",
                    lineHeight: "1.5rem",
                    fontSize: ".8rem",
                    fontWeight: 500,
                  }}
                >
                  Clouds: {current.clouds} %
                </div>
                <div
                  className="weather_today"
                  style={{
                    textAlign: "left",
                    color: "white",
                    lineHeight: "1.5rem",
                    fontSize: ".8rem",
                    fontWeight: 500,
                  }}
                >
                  Wind: {current.wind_speed} km/h
                </div>
              </Col>
            </Row>
          </Col>

          <Col sm={12} lg={8}>
            <Row
              className="text-center justify-content-sm-center justify-content-lg-end mr-lg-3 mr-xl-4 mb-0 mb-lg-3"
              style={{ display: "flex", margin: "1rem" }}
            >
              {daily.slice(0, 4).map((daycast, count) => {
                count++;
                return (
                  <Col
                    key={count}
                    xs={6}
                    sm={6}
                    md={6}
                    lg={3}
                    xl={3}
                    className="p-0 p-lg-2"
                  >
                    <Card
                      className="special-card ml-2 mr-2 ml-lg-0 mr-lg-0"
                      style={{
                        borderRadius: "5px",
                        minHeight: "170px",
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      }}
                    >
                      <Card.Body
                        className="justify-content-center text-center"
                        style={{
                          backgroundColor: "white",
                          borderRadius: "6px",
                          padding: "0.15rem",
                        }}
                      >
                        <Card.Title
                          className="play_description mt-1"
                          style={{ lineHeight: "1.4rem", marginBottom: "0rem" }}
                        >
                          {getDay(count)}
                        </Card.Title>
                        <Card.Text className="mt-md-1 mb-0">
                          <Image
                            src={
                              "https://openweathermap.org/img/w/" +
                              daycast.weather[0].icon +
                              ".png"
                            }
                            weather_today
                          />
                        </Card.Text>
                        <Card.Text style={{ marginBottom: "-5px" }}>
                          {daycast.weather[0].main}
                        </Card.Text>
                        <Card.Text
                          style={{ marginBottom: "-5px" }}
                          className="mt-md-1"
                        >
                          {daycast.temp.min.toFixed(1)}°C /{" "}
                          {daycast.temp.max.toFixed(1)}°C
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </>
    );
  }
}
