import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { DarkModeContext } from "../contexts/DarkModeContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import MediaCard from "../components/Cards/MediaCard";
import { getResults } from "../components/API/getMedia";
import styles from "./ResultsPage.module.css";
import uniqid from "uniqid";

const Results = () => {
  const { query } = useParams();
  const { darkMode } = useContext(DarkModeContext);
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [filterType, setFilterType] = useState("all");

  const filterResults = () => {
    let filteredResults = results.filter((result) => result.title !== "-");

    if (filterType === "movie") {
      filteredResults = results.filter((result) => result.type === "movie");
    } else if (filterType === "tv") {
      filteredResults = results.filter((result) => result.type === "tv");
    }
    // Render filtered results as MediaCards
    return filteredResults.map((result) => (
      <Col key={uniqid()} lg={2} md={4} sm={6} xs={6}>
        <MediaCard mediaData={result} />
      </Col>
    ));
  };

  const loadMoreResults = async () => {
    // Load more results from the API
    const newResults = await getResults(query, page);
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
      const initialResults = await getResults(query, page);
      setResults(initialResults);
      setPage((prevPage) => prevPage + 1);
    })();
  }, []);

  useEffect(() => {
    // Reset filter type when results change
    setFilterType("all");
  }, [results]);

  return (
    <div
      className={darkMode ? styles.resultsPageDark : styles.resultsPageLight}
    >
      <ButtonGroup className="mt-3 mb-2" aria-label="filter buttons">
        <Button
          variant="outline-success"
          onClick={() => handleFilter("all")}
          active={filterType === "all"}
        >
          All
        </Button>
        <Button
          variant="outline-success"
          onClick={() => handleFilter("movie")}
          active={filterType === "movie"}
        >
          Movies
        </Button>
        <Button
          variant="outline-success"
          onClick={() => handleFilter("tv")}
          active={filterType === "tv"}
        >
          TV
        </Button>
      </ButtonGroup>
      <Container className="text-center">
        <h2 className="mb-5">Results:</h2>
        <Row>{filterResults()}</Row>
        <Button className="mb-5" variant="success" onClick={loadMoreResults}>
          Show More
        </Button>
      </Container>
    </div>
  );
};

export default Results;
