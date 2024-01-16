import React from "react";
import { useHistory } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export default function Favorite({ favorite }) {
  const history = useHistory();

  // // --- Location Information ---
  const city = favorite.city;

  // --- getDetails function, triggered with Button onClick => routes to Interest Details ---
  function getDetails() {
    history.push({
      pathname: "/search/" + city.replaceAll(" ", "_").trim().toLowerCase(),
      state: {
        latLng: favorite,
        count: "",
        total_count: "",
        interestNameURLRating: "",
      },
    });
  }

  return (
    <div
      style={{
        display: "flex",
        width: "95%",
        justifyContent: "center",
        alignItems: "center",
        paddingRight: ".3rem",
        marginBottom: "3rem",
      }}
    >
      <Card
        className="favorite_card"
        style={{
          width: "100%",
          borderRadius: "5px",
          minHeight: "320px",
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",
        }}
      >
        <Card.Body style={{ padding: ".5rem", margin: "1rem" }}>
          <Card.Title
            className="text-center"
            style={{
              fontFamily: "poppinsregular",
              fontWeight: "700",
              lineHeight: "1.5em",
              height: "2em",
            }}
          >
            {favorite.city}
          </Card.Title>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              alignContent: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <div className="image_container_heart">
              <img
                as="a"
                onClick={getDetails}
                style={{
                  height: "160px",
                  width: "100%",
                  objectFit: "fill",
                  borderRadius: "5px",
                }}
                src={favorite.url}
                className="img_favorite"
                alt={favorite.city}
              />
              <div className="top-right">
                <span
                  as="a"
                  onClick={getDetails}
                  className="font-awesome-cirle"
                >
                  <FontAwesomeIcon
                    style={{ marginTop: "2px", fontSize: "1.3rem" }}
                    size="2x"
                    color="#ff5d5d"
                    icon={["fas", "heart"]}
                  />
                </span>
              </div>
            </div>
            <Card.Text>
              <Button
                block
                style={{
                  marginLeft: "10",
                  marginRight: "10",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  fontFamily: "poppinsregular",
                  fontWeight: "500",
                  lineHeight: "1.6em",
                  marginTop: "auto",
                }}
                onClick={getDetails}
                className="button_explore mt-2"
                variant="dark"
              >
                Explore
              </Button>
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
