import React, { useState, useEffect } from "react";
import FavoriteContainer from "./advisor/favorite/FavoriteContainer";
import getLocalStorage from "./utils/getLocalStorage";

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
    <div>
      <FavoriteContainer />
    </div>
  );
}
