import React, { useEffect, useState } from "react";
// import Card from "./TvCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const SeriesPage = (props) => {
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

  //   const [latestCards, setLatestCards] = useState([]);

  const getLatestTV = async () => {
    try {
      const response = await fetch(
        ` https://api.themoviedb.org/3/tv/airing_today?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=1`,
        {
          mode: "cors",
        }
      );
      const latest = await response.json();
      console.log(
        latest.results.filter((show) => show.original_language === "en")
      );
    } catch (error) {
      console.error("Error:API", error);
    }
  };

  useEffect(() => {
    getLatestTV();
  }, []);

  return (
    <div className={"series"}>
      {/* <h1>Popular</h1>
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
        // autoPlay={true}
        // autoPlaySpeed={2000}
        // transitionDuration={500}
      >
        {topRatedCards}
      </Carousel>
      <h1></h1> */}
      bruh
    </div>
  );
};
export default SeriesPage;
