import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import TvCard from "./TvCard";
import { getTopTV, getPopularTV, getLatestTV } from "./API/getTV";
// import "./Styles/seriesPage.css";
import "./Styles/seriesPage.css";

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

  const [topTV, setTopTV] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [latestTV, setLatestTV] = useState([]);

  const [topRatedCards, setTopRatedCards] = useState([]);
  const [popularCards, setPopularCards] = useState([]);
  const [latestCards, setLatestCards] = useState([]);

  useEffect(() => {
    setTopRatedCards(
      topTV.map((show) => <TvCard key={show.id} showData={show} />)
    );

    setPopularCards(
      popularTV.map((show) => <TvCard key={show.id} showData={show} />)
    );

    setLatestCards(
      latestTV.map((show) => <TvCard key={show.id} showData={show} />)
    );
  }, [topTV, popularTV, latestTV]);

  useEffect(() => {
    getTopTV(setTopTV);
    getPopularTV(setPopularTV);
    getLatestTV(setLatestTV);
  }, []);

  return (
    <div className={"series"}>
      <div className="seriesTabs">
        <ul>
          <li>Top Rated</li>
          <li>Popular</li>
          <li>Latest</li>
        </ul>
      </div>
      <div className="popularWrapper">
        <h1>Popular</h1>
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
          {popularCards}
        </Carousel>
      </div>
      <div className="topRatedWrapper">
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
      <div className="latestTVWrapper">
        <h1>Latest</h1>
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
          {latestCards}
        </Carousel>
      </div>
    </div>
  );
};
export default SeriesPage;
