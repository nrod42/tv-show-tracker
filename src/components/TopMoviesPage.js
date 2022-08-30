import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { getTopMovies } from "./API/getMovies";
import MoviesNav from "./MoviesNav";

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
          <MovieCard key={movie.id} movieData={movie} />
        ))}
      </div>
      <button className="showMoreBtn" onClick={showMore}>
        Show more
      </button>
    </div>
  );
};

export default TopMoviesPage;
