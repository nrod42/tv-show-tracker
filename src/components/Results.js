import TvCard from "./Cards/TvCard";
import MovieCard from "./Cards/MovieCard";
import { useEffect, useState } from "react";
import { getResults } from "./API/getResults";

const Results = (props) => {
  const { searchQuery } = props;

  const [results, setResults] = useState([]);
  const [cards, setCards] = useState([]);

  const showAll = () => {
    setCards(
      results.map((result) =>
        result.type === "movie" ? (
          <MovieCard key={result.id} movieData={result} />
        ) : (
          <TvCard key={result.id} showData={result} />
        )
      )
    );
  };

  const showMovies = () => {
    setCards(
      results
        .filter((result) => result.type === "movie")
        .map((movie) => <MovieCard key={movie.id} movieData={movie} />)
    );
  };

  const showTV = () => {
    setCards(
      results
        .filter((result) => result.type === "tv")
        .map((show) => <TvCard key={show.id} showData={show} />)
    );
  };

  useEffect(() => {
    (async () => {
      const results = await getResults(searchQuery);
      setResults(results);
    })();
  }, [searchQuery]);

  useEffect(() => {
    showAll();
  }, [results]);

  return (
    <div className={"searchResults"}>
      <div>
        <button onClick={showAll}>All</button>
        <button onClick={showMovies}>Movies</button>
        <button onClick={showTV}>TV</button>
      </div>
      <h1>Results:</h1>
      <div className="cardGrid">{cards}</div>
    </div>
  );
};
export default Results;
