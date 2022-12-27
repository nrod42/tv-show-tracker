import { useEffect, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import TvCard from "../components/Cards/TvCard";
import MovieCard from "../components/Cards/MovieCard";
import { getResults } from "../components/API/getResults";
import uniqid from "uniqid";

const Results = (props) => {
  const { searchQuery } = props;

  const [results, setResults] = useState([]);
  const [cards, setCards] = useState([]);

  const showAll = () => {
    setCards(
      results.map((result) =>
        result.type === "movie" ? (
          <MovieCard key={uniqid()} movieData={result} />
        ) : (
          <TvCard key={uniqid()} showData={result} />
        )
      )
    );
  };

  const showMovies = () => {
    setCards(
      results
        .filter((result) => result.type === "movie")
        .map((movie) => <MovieCard key={uniqid()} movieData={movie} />)
    );
  };

  const showTV = () => {
    setCards(
      results
        .filter((result) => result.type === "tv")
        .map((show) => <TvCard key={uniqid()} showData={show} />)
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
    <div className="searchResults">
      <ButtonGroup aria-label="Filter buttons">
        <Button variant="success" onClick={showAll}>
          All
        </Button>
        <Button variant="success" onClick={showMovies}>
          Movies
        </Button>
        <Button variant="success" onClick={showTV}>
          Series
        </Button>
      </ButtonGroup>
      <h1>Results:</h1>
      <div className="cardGrid">{cards}</div>
    </div>
  );
};
export default Results;
