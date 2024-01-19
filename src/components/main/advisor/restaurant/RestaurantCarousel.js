import React from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Restaurant from "./Restaurant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
library.add(fas);

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const CustomRightArrow = ({ onClick, ...rest }) => {
  return (
    <Button
      className="carousel_button_prev"
      onClick={() => onClick()}
      size="xs"
      variant="outline"
    >
      <FontAwesomeIcon size="2x" style={{}} icon={["fas", "angle-right"]} />
    </Button>
  );
};

const CustomLeftArrow = ({ onClick, ...rest }) => {
  return (
    <Button
      className="carousel_button_next"
      onClick={() => onClick()}
      size="xs"
      variant="outline"
    >
      <FontAwesomeIcon size="2x" style={{}} icon={["fas", "angle-left"]} />
    </Button>
  );
};

export default function RestaurantCarousel({ restaurants }) {
  return (
    <div
      style={{
        padding: "0rem 0.8rem",
      }}
    >
      <Carousel
        swipeable={true}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px carousel-item-margin-10-px"
        customRightArrow={<CustomRightArrow />}
        customLeftArrow={<CustomLeftArrow />}
      >
        {restaurants.map((restaurant) => {
          return <Restaurant key={restaurant.id} restaurant={restaurant} />;
        })}
      </Carousel>
    </div>
  );
}
