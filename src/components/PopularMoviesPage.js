import React, { useEffect, useState } from "react";
import { getPopularMovies } from "./API/getMovies";
import MoviesNav from "./MoviesNav";
import MovieCard from "./Cards/MovieCard";
import uniqid from "uniqid";
import { Button } from "react-bootstrap";

const PopularMoviesPage = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [page, setPage] = useState(1);

  const showMore = () => {
    setPage((prev) => prev + 1);
  };

  const handlePages = async () => {
    const newPage = await getPopularMovies(page);
    const newState = [...popularMovies, ...newPage];
    setPopularMovies(newState);
  };

  useEffect(() => {
    handlePages();
  }, [page]);

  return (
    <div className={"categoryPage"}>
      <MoviesNav />
      <h1>Popular Movies</h1>
      <div className="cardGrid">
        {popularMovies.map((movie) => (
          <MovieCard key={uniqid()} movieData={movie} />
        ))}
      </div>
      <Button className="showMoreBtn" onClick={showMore}>
        Show more
      </Button>
    </div>
  );
};
export default PopularMoviesPage;
