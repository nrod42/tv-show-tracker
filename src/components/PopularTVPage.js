import React, { useEffect, useState } from "react";
import TvCard from "./TvCard";
import { getPopularTV } from "./API/getTV";
import SeriesNav from "./SeriesNav";

const PopularTVPage = () => {
  const [popularTV, setPopularTV] = useState([]);
  const [page, setPage] = useState(1);

  const showMore = () => {
    setPage((prev) => prev + 1);
  };

  const handlePages = async () => {
    const newPage = await getPopularTV(page);
    const newState = [...popularTV, ...newPage];
    setPopularTV(newState);
  };

  useEffect(() => {
    handlePages();
  }, [page]);


  return (
    <div className={"categoryPage"}>
      <SeriesNav />
      <h1>Popular TV Shows</h1>
      <div className="cardGrid">{popularTV.map((show) => <TvCard key={show.id} showData={show} />)}</div>
      <button onClick={showMore}>Show more</button>
    </div>
  );
};
export default PopularTVPage;
