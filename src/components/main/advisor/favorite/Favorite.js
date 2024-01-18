import React from "react";
import { useHistory } from "react-router-dom";

import Card from "react-bootstrap/Card";

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
        width: "98%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "2rem",
      }}
    >
      <Card
        onClick={getDetails}
        id="favorite_card"
        className="favorite_card"
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
        <Card.Body style={{ padding: "1rem" }}>
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
                  objectFit: "cover",
                  borderRadius: "3px",
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
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
