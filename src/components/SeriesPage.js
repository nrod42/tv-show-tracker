import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import TvCard from "./TvCard";
// import { getLatestTVData } from "./API/getLatestTVData";
import { getLatestTV } from "./API/getLatestTV";

const SeriesPage = (props) => {
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
  const [latestTV, setLatestTV] = useState([]);
  const [latestCards, setLatestCards] = useState([]);
  
  
  // const latest = async () => {
  //   let latest = await getLatestTVData()
  //   setLatestTV(latest.results.filter((show) => show.original_language === "en")
  //   .map((show) => ({
  //     id: show.id,
  //     poster: `https://image.tmdb.org/t/p/original/${show.poster_path}`,
  //     backdrop: `https://image.tmdb.org/t/p/original/${show.backdrop_path}`,
  //     title: show.name,
  //     rating: show.vote_average,
  //     year: show.first_air_date.split("-")[0],
  //     plot: show.overview,
  //     genre: show.genre_ids,
  //   })))
  // }

  useEffect(() => {
    setTopRatedCards(
      topRatedTV.map((show) => <TvCard key={show.id} showData={show} />)
    );

    setPopularCards(
      popularTV.map((show) => <TvCard key={show.id} showData={show} />)
    );
    
    setLatestCards(
      latestTV.map((show) => <TvCard key={show.id} showData={show} />)
    )
  }, [topRatedTV, popularTV, latestTV]);

  useEffect(() => {
    getLatestTV(setLatestTV);
  }, []);


  return (
    <div className={"series"}>
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
