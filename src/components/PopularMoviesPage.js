import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { getPopularMovies } from "./API/getMovies";
import MoviesNav from "./MoviesNav";

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
      <div className="cardGrid">{popularMovies.map((movie) => <MovieCard key={movie.id} movieData={movie} />)}</div>
      <button onClick={showMore}>Show more</button>
    </div>
  );
};
export default PopularMoviesPage;
