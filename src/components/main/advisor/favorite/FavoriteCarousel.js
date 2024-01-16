import React from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Favorite from "./Favorite";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export default function FavoriteCarousel({ favorites }) {
  return (
    <div
      style={{
        marginLeft: "1rem",
        marginRight: "1em",
        width: "100%",
        maxWidth: "1095px",
      }}
    >
      <Carousel
        swipeable={true}
        draggable={false}
        showDots={true}
        arrows={false}
        responsive={responsive}
        ssr={true}
        infinite={true}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        partialVisible={false}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {favorites.map((favorite) => {
          return <Favorite key={favorite.city} favorite={favorite} />;
        })}
      </Carousel>
    </div>
  );
}
