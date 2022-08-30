import React, { useEffect, useState } from "react";
import TvCard from "./TvCard";
import { getAiringTodayTV } from "./API/getTV";
import SeriesNav from "./SeriesNav";

const AiringTodayTVPage = () => {
  const [airingTodayTV, setAiringTodayTV] = useState([]);
  const [page, setPage] = useState(1);

  const showMore = () => {
    setPage((prev) => prev + 1);
  };

  const handlePages = async () => {
    const newPage = await getAiringTodayTV(page);
    const newState = [...airingTodayTV, ...newPage];
    setAiringTodayTV(newState);
  };

  useEffect(() => {
    handlePages();
  }, [page]);

  return (
    <div className={"categoryPage"}>
      <SeriesNav />
      <h1>Airing Today</h1>
      <div className="cardGrid">{airingTodayTV.map((show) => <TvCard key={show.id} showData={show} />)}</div>
      <button className="showMoreBtn" onClick={showMore}>Show more</button>
    </div>
  );
};
export default AiringTodayTVPage;
