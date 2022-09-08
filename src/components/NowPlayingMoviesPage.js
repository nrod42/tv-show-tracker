import React, { useEffect, useState } from "react";
import { getNowPlayingMovies } from "./API/getMovies";
import MoviesNav from "./MoviesNav";
import MovieCard from "./Cards/MovieCard";
import uniqid from "uniqid";
import { Button } from "react-bootstrap";

const NowPlayingMoviesPage = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [page, setPage] = useState(1);

  const showMore = () => {
    setPage((prev) => prev + 1);
  };

  const handlePages = async () => {
    const newPage = await getNowPlayingMovies(page);
    const newState = [...nowPlayingMovies, ...newPage];
    setNowPlayingMovies(newState);
  };

  useEffect(() => {
    handlePages();
  }, [page]);

  return (
    <div className={"categoryPage"}>
      <MoviesNav />
      <h1>Now Playing Movies</h1>
      <div className="cardGrid">
        {nowPlayingMovies.map((movie) => (
          <MovieCard key={uniqid()} movieData={movie} />
        ))}
      </div>
      <Button onClick={showMore}>Show more</Button>
    </div>
  );
};

export default NowPlayingMoviesPage;
