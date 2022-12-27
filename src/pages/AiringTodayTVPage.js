import React, { useEffect, useState } from "react";
import { getAiringTodayTV } from "../components/API/getTV";
import SeriesNav from "../components/SeriesNav";
import TvCard from "../components/Cards/TvCard";
import uniqid from "uniqid";
import { Button } from "react-bootstrap";

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
      <div className="cardGrid">
        {airingTodayTV.map((show) => (
          <TvCard key={uniqid()} showData={show} />
        ))}
      </div>
      <Button className="showMoreBtn" onClick={showMore}>
        Show more
      </Button>
    </div>
  );
};
export default AiringTodayTVPage;
