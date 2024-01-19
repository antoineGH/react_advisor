import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import LoadingSpinner from "./loading/LoadingSpinner";
import AdvisorContainer from "./AdvisorContainer";
import Error from "../../errors/Error";
import toTitle from "../utils/toTitle";
import fetchInterestGPS from "./utils/fetchInterestGPS";
import _ from "lodash";

export default function Advisor() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [latlng, setLatLng] = useState("");
  const [interests, setInterests] = useState(null);
  const [city, setCity] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const history = useHistory();
  let location = useLocation();

  // Get Interests from Foursquare API + Update State
  useEffect(() => {
    let mount = true;
    if (_.get(location, "state.latLng")) {
      setLatLng(location.state.latLng);
      setCity(toTitle(location.state.latLng.city));
      trackPromise(
        fetchInterestGPS(location.state.latLng, 9)
          .then((response) => {
            if (mount) {
              setInterests(response);
              setIsLoaded(true);
              setHasError(false);
            }
          })
          .catch((error) => {
            if (mount) {
              setHasError(true);
            }
          })
      );
    } else {
      history.push("/");
    }
    return () => {
      mount = false;
    };
  }, [location, history]);

  function filterCategories(latLng, category, categoryID) {
    history.push({
      pathname:
        city.replaceAll(" ", "_").trim().toLowerCase() +
        "/" +
        encodeURIComponent(category.toLowerCase().trim().replaceAll(" ", "_")),
      state: {
        interests: interests,
        latLng: latLng,
        category: category,
        categoryID: categoryID,
      },
    });
  }

  return (
    <>
      <LoadingSpinner />
      {hasError && (
        <Error errorMessage="Impossible to find this city, please try again." />
      )}
      {isLoaded && (
        <AdvisorContainer
          filterCategories={filterCategories}
          latLng={latlng}
          interests={interests}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      )}
    </>
  );
}
