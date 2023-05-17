import { useEffect, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import MediaCard from "../components/Cards/MediaCard";
import { getResults } from "../components/API/getResults";
import uniqid from "uniqid";


const Results = ({ searchQuery }) => {
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [cards, setCards] = useState([]);

  const showAll = () => {
    setCards(
      results.map((result) =>
        <MediaCard key={uniqid()} mediaData={result} />
      )
    );
  };

  const showMovies = () => {
    setCards(
      results
        .filter((result) => result.type === "movie")
        .map((movie) => <MediaCard key={uniqid()} mediaData={movie} />)
    );
  };

  const showTV = () => {
    setCards(
      results
        .filter((result) => result.type === "tv")
        .map((show) => <MediaCard key={uniqid()} mediaData={show} />)
    );
  };

  const showMore = async () => {
    const newResults = await getResults(searchQuery, page);
    setResults([...results, ...newResults]);
    setPage((prevPage) => prevPage + 1)
  }

  useEffect(() => {
    (async () => {
      const results = await getResults(searchQuery, page);
      setResults(results);
      setPage((prevPage) => prevPage +  1)
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
      <Button className="showMoreBtn" onClick={showMore}>
        Show more
      </Button>
    </div>
  );
};
export default Results;
