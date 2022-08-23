import React, { useEffect, useState } from "react";
import TvCard from "./TvCard";
import './Styles/results.css'

const Results = (props) => {
  const { results } = props;

  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(results.map((show) => <TvCard key={show.id} showData={show} />));
  }, [results]);

  return (
    <div className={"searchResults"}>
      <h1>Results:</h1>
      <div className="cardGrid">{cards}</div>
    </div>
  );
};
export default Results;
