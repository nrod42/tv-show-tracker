import React, { useEffect, useState } from "react";
import TvCard from "./TvCard";
import { getTopTV, getPopularTV } from "./API/getTV";
import "./Styles/home.css";

const Home = () => {
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
        <div className="popularTVStrip">
          {popularCards}
        </div >
      </div>
      <div className="topRatedWrapper">
        <h1>Top Rated</h1>
        <div className="topTVStrip">
          {topRatedCards}
        </div>
      </div>
    </div>
  );
};
export default Home;
