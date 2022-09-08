import React, { useEffect, useState } from "react";
import { getUpcomingMovies } from "./API/getMovies";
import MoviesNav from "./MoviesNav";
import MovieCard from "./Cards/MovieCard";
import uniqid from "uniqid";
import { Button } from "react-bootstrap";

const UpcomingMoviesPage = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [page, setPage] = useState(1);

  const showMore = () => {
    setPage((prev) => prev + 1);
  };

  const handlePages = async () => {
    const newPage = await getUpcomingMovies(page);
    const newState = [...upcomingMovies, ...newPage];
    setUpcomingMovies(newState);
  };

  useEffect(() => {
    handlePages();
  }, [page]);

  return (
    <div className={"categoryPage"}>
      <MoviesNav />
      <h1>Upcoming Movies</h1>
      <div className="cardGrid">
        {upcomingMovies.map((movie) => (
          <MovieCard key={uniqid()} movieData={movie} />
        ))}
      </div>
      <Button className="showMoreBtn" onClick={showMore}>
        Show more
      </Button>
    </div>
  );
};

export default UpcomingMoviesPage;
