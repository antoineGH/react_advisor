import React, { useState, useEffect } from "react";
import FavoriteContainer from "./advisor/favorite/FavoriteContainer";
import getLocalStorage from "./utils/getLocalStorage";
import backgroundSVG from "../../static/bg_3440.svg";
import heroSVG from "../../static/hero.svg";

export default function Home() {
  const [hasRecentSearch, setHasRecentSearch] = useState(false);
  const recentSearches = getLocalStorage("historyDestination");

  useEffect(() => {
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
        zIndex: 0,
      }}
    >
      <FavoriteContainer />
      <img id="hero" src={heroSVG} alt="hero" />
    </div>
  );
}
