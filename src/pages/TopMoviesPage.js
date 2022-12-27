import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { getTopMovies } from "../components/API/getMovies";
import MovieCard from "../components/Cards/MovieCard";
import MoviesNav from "../components/MoviesNav";
import uniqid from "uniqid";

const TopMoviesPage = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [page, setPage] = useState(1);

  const showMore = () => {
    setPage((prev) => prev + 1);
  };

  const handlePages = async () => {
    const newPage = await getTopMovies(page);
    setTopMovies([...topMovies, ...newPage]);
  };

  useEffect(() => {
    handlePages();
  }, [page]);

  return (
    <div className={"categoryPage"}>
      <MoviesNav />
      <h1>Top Movies</h1>
      <div className="cardGrid">
        {topMovies.map((movie) => (
          <MovieCard key={uniqid()} movieData={movie} />
        ))}
      </div>
      <Button className="showMoreBtn" onClick={showMore}>
        Show more
      </Button>
    </div>
  );
};

export default TopMoviesPage;
