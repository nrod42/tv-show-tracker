import React, { useEffect, useState } from "react";
import TvCard from "./TvCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './Styles/home.css'

const Home = (props) => {
  const { topRatedTV, popularTV } = props;

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

  const [topRatedCards, setTopRatedCards] = useState([]);
  const [popularCards, setPopularCards] = useState([]);

  useEffect(() => {
    setTopRatedCards(
      topRatedTV.map((show) => <TvCard key={show.id} showData={show} />)
    );

    setPopularCards(
      popularTV.map((show) => <TvCard key={show.id} showData={show} />)
    );
  }, [topRatedTV, popularTV]);

  return (
    <div className={"home"}>
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
    </div>
  );
};
export default Home;
