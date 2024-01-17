import React, { useState, useEffect } from "react";
import Titles from "./design/Titles";
import FavoriteContainer from "./advisor/favorite/FavoriteContainer";
import Planning from "./design/Planning";
import RecentSearches from "./design/RecentSearches";
import getLocalStorage from "./utils/getLocalStorage";
import removeValueLocalStorage from "./../main/utils/removeValueLocalStorage";
import Container from "react-bootstrap/Container";

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

  const clearRecentDestination = () => {
    removeValueLocalStorage("historyDestination");
    setHasRecentSearch(false);
  };

  return (
    <div>
      <Container>
        <FavoriteContainer />
        {hasRecentSearch && (
          <RecentSearches
            recentSearches={recentSearches}
            clearRecentDestination={clearRecentDestination}
          />
        )}
      </Container>
    </div>
  );
}
