import { useState, useEffect, useContext } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import MediaCard from "../components/Cards/MediaCard";
import { getResults } from "../components/API/getMedia";
import { DarkModeContext } from "../DarkModeContext";
import styles from "./ResultsPage.module.css";

const Results = ({ searchQuery }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [filterType, setFilterType] = useState("all");

  const filterResults = () => {
    let filteredResults = results;
    if (filterType === "movie") {
      filteredResults = results.filter((result) => result.type === "movie");
    } else if (filterType === "tv") {
      filteredResults = results.filter((result) => result.type === "tv");
    }
    // Render filtered results as MediaCards
    return filteredResults.map((result) => (
      <MediaCard key={result.id} mediaData={result} />
    ));
  };

  const loadResults = async () => {
    // Load more results from the API
    const newResults = await getResults(searchQuery, page);
    // Append new results to existing results
    setResults((prevResults) => [...prevResults, ...newResults]);
    setPage((prevPage) => prevPage + 1);
  };

  const handleFilter = (type) => {
    // Update the filter type
    setFilterType(type);
  };

  useEffect(() => {
    // Load initial results when searchQuery or page changes
    (async () => {
      const initialResults = await getResults(searchQuery, page);
      setResults(initialResults);
      setPage((prevPage) => prevPage + 1);
    })();
  }, [searchQuery, page]);

  useEffect(() => {
    // Reset filter type when results change
    setFilterType("all");
  }, [results]);

  return (
    <div
      className={darkMode ? styles.resultsPageDark : styles.resultsPageLight}
    >
      <ButtonGroup aria-label="filter buttons">
        <Button
          variant="success"
          onClick={() => handleFilter("")}
          active={filterType === "all"}
        >
          All
        </Button>
        <Button
          variant="success"
          onClick={() => handleFilter("movie")}
          active={filterType === "movie"}
        >
          Movies
        </Button>
        <Button
          variant="success"
          onClick={() => handleFilter("tv")}
          active={filterType === "tv"}
        >
          Series
        </Button>
      </ButtonGroup>
      <h1>Results:</h1>
      <div className={styles.cardGrid}>{filterResults()}</div>
      <Button variant="secondary" onClick={loadResults}>
        Show more
      </Button>
    </div>
  );
};

export default Results;
