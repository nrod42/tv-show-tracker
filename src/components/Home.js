import React, { useEffect, useState } from "react";
import TvCard from "./TvCard";
import Carousel from "react-multi-carousel";
import { getTopTV, getPopularTV } from "./API/getTV";
import "react-multi-carousel/lib/styles.css";
import "./Styles/home.css";

const Home = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7,
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
  const [topRatedCards, setTopRatedCards] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [popularCards, setPopularCards] = useState([]);

  const handleTopTV = async () => {
    const top = [...(await getTopTV()), ...(await getTopTV(2))];
    const popular = [...(await getPopularTV()), ...(await getPopularTV(2))];
    setTopTV(top);
    setPopularTV(popular);
  };

  useEffect(() => {
    handleTopTV();
  }, []);

  useEffect(() => {
    setTopRatedCards(
      topTV.map((show) => <TvCard key={show.id} showData={show} />)
    );

    setPopularCards(
      popularTV.map((show) => <TvCard key={show.id} showData={show} />)
    );
  }, [topTV, popularTV]);

  return (
    <div className={"home"}>
      <div className="popularWrapper">
        <h1>Popular</h1>
        <Carousel
          containerClass="carousel-container"
          responsive={responsive}
          swipeable={true}
          draggable={true}
          // infinite={true}
          // autoPlay={true}
          // autoPlaySpeed={2000}
          // transitionDuration={500}
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
          // infinite={true}
          // autoPlay={true}
          // autoPlaySpeed={2000}
          // transitionDuration={500}
        >
          {topRatedCards}
        </Carousel>
      </div>
    </div>
  );
};
export default Home;
