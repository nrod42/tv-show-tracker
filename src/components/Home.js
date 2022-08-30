import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopMovies, getPopularMovies } from "./API/getMovies";
import { getTopTV, getPopularTV } from "./API/getTV";
import MovieCard from "./MovieCard";
import TvCard from "./TvCard";
import "./Styles/home.css";

const Home = () => {
  const [topTV, setTopTV] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  // Fetches first two pages of each categories' shows and saves them to a state
  useEffect(() => {
    (async () => {
      const topTV = [...(await getTopTV()), ...(await getTopTV(2))];
      const popularTV = [...(await getPopularTV()), ...(await getPopularTV(2))];
      const topMovies = [...(await getTopMovies()), ...(await getTopMovies(2))];
      const popularMovies = [
        ...(await getPopularMovies()),
        ...(await getPopularMovies(2)),
      ];
      setTopTV(topTV);
      setPopularTV(popularTV);
      setTopMovies(topMovies);
      setPopularMovies(popularMovies);
    })();
  });

  // window.setInterval(function() {
  //   var elem = document.getElementById('data');
  //   elem.scrollTop = elem.scrollHeight;
  // }, 5000);

  return (
    <div className={"home"}>
      <div className="popularWrapper">
        <Link to={"/tv-show-tracker/series/popular"}>
          <h1>Popular TV</h1>{" "}
        </Link>
        <div className="strip">
          {popularTV.map((show) => (
            <TvCard key={show.id} showData={show} />
          ))}
        </div>
      </div>
      <div className="topRatedWrapper">
        <Link to={"/tv-show-tracker/series/top-rated"}>
          <h1>Top Rated TV</h1>
        </Link>
        <div className="strip">
          {topTV.map((show) => (
            <TvCard key={show.id} showData={show} />
          ))}
        </div>
      </div>
      <div className="popularWrapper">
        <Link to={"/tv-show-tracker/movies/popular"}>
          <h1>Popular Movies</h1>
        </Link>
        <div className="strip">
          {popularMovies.map((movie) => (
            <MovieCard key={movie.id} movieData={movie} />
          ))}
        </div>
      </div>
      <div className="topRatedWrapper">
        <Link to={"/tv-show-tracker/movies/top-rated"}>
          <h1>Top Rated Movies</h1>
        </Link>
        <div className="strip">
          {topMovies.map((movie) => (
            <MovieCard key={movie.id} movieData={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
