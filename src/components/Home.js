import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Home = (props) => {
  const { topRatedCards, popularCards } = props;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className={"home"}>
      <h1>Popular</h1>
      <Carousel
        containerClass="carousel-container"
        responsive={responsive}
        swipeable={true}
        draggable={true}
        infinite={true}
        // autoPlay={true}
        // autoPlaySpeed={2000}
        // transitionDuration={500}
      >
        {popularCards}
      </Carousel>
      <h1>Top Rated</h1>
      <Carousel
        containerClass="carousel-container"
        responsive={responsive}
        swipeable={true}
        draggable={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        transitionDuration={500}
      >
        {topRatedCards}
      </Carousel>
    </div>
  );
};
export default Home;
