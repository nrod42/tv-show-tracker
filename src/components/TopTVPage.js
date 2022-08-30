import React, { useEffect, useState } from "react";
import { getTopTV } from "./API/getTV";
import SeriesNav from "./SeriesNav";
import TvCard from "./Cards/TvCard";
import uniqid from "uniqid";

const TopTVPage = () => {
  const [topTV, setTopTV] = useState([]);
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

  return (
    <div className={"categoryPage"}>
      <SeriesNav />
      <h1>Top TV Shows</h1>
      <div className="cardGrid">
        {topTV.map((show) => (
          <TvCard key={uniqid()} showData={show} />
        ))}
      </div>
      <button className="showMoreBtn" onClick={showMore}>
        Show more
      </button>
    </div>
  );
};
export default TopTVPage;
