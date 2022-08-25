import React, { useEffect, useState } from "react";
import TvCard from "./TvCard";
import { getTopTV } from "./API/getTV";
import SeriesNav from "./SeriesNav";

const TopTVPage = () => {
  const [topTV, setTopTV] = useState([]);
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);

  const showMore = () => {
    setPage((prev) => prev + 1);
  };

  const handlePages = async () => {
    const newPage = await getTopTV(page);
    const newState = [...topTV, ...newPage];
    setTopTV(newState);
  };

  useEffect(() => {
    handlePages();
  }, [page]);

  useEffect(() => {
    setCards(topTV.map((show) => <TvCard key={show.id} showData={show} />));
  }, [topTV]);

  return (
    <div className={"topTVPage"}>
      <SeriesNav />
      <h1>Top TV Shows</h1>
      <div className="cardGrid">{cards}</div>
      <button onClick={showMore}>Show more</button>
    </div>
  );
};
export default TopTVPage;
