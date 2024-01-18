import React, { useState, useEffect } from "react";
import FavoriteContainer from "./advisor/favorite/FavoriteContainer";
import getLocalStorage from "./utils/getLocalStorage";
import backgroundSVG from "../../static/bg_3440.svg";
import heroSVG from "../../static/hero.svg";

export default function Home() {
  const [hasRecentSearch, setHasRecentSearch] = useState(false);
  const recentSearches = getLocalStorage("historyDestination");

  useEffect(() => {
    console.log("Home useEffect");
    let mount = true;
    if (recentSearches) {
      if (mount) {
        setHasRecentSearch(true);
      }
    }
    return () => {
      mount = false;
    };
  }, [recentSearches, hasRecentSearch]);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "87vh",
        backgroundImage: `url(${backgroundSVG})`,
      }}
    >
      <FavoriteContainer />
      <img
        id="hero"
        src={heroSVG}
        alt="hero"
        style={{
          position: "absolute",
          zIndex: "0",
          height: "50%",
          width: "100%",
          objectFit: "contain",
          bottom: 0,
          left: 0,
        }}
      />
    </div>
  );
}
