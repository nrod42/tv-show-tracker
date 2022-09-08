import React, { useEffect, useState } from "react";
import MovieCard from "./Cards/MovieCard";
import { getTopMovies } from "./API/getMovies";
import MoviesNav from "./MoviesNav";
import uniqid from "uniqid";
import { Button } from "react-bootstrap";

const TopMoviesPage = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [page, setPage] = useState(1);

  const showMore = () => {
    setPage((prev) => prev + 1);
  };

  const handlePages = async () => {
    const newPage = await getTopMovies(page);
    const newState = [...topMovies, ...newPage];
    setTopMovies(newState);
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
