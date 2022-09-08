import React, { useEffect, useState } from "react";
import { getPopularTV } from "./API/getTV";
import SeriesNav from "./SeriesNav";
import TvCard from "./Cards/TvCard";
import uniqid from "uniqid";
import { Button } from "react-bootstrap";

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
      <div className="cardGrid">
        {popularTV.map((show) => (
          <TvCard key={uniqid()} showData={show} />
        ))}
      </div>
      <Button className="showMoreBtn" onClick={showMore}>
        Show more
      </Button>
    </div>
  );
};
export default PopularTVPage;
