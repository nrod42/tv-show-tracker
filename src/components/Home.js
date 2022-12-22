import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getTopMovies,
  getPopularMovies,
  getMovieDetails,
} from "./API/getMovies";
import { getTopTV, getPopularTV, getShowDetails } from "./API/getTV";
import MovieCard from "./Cards/MovieCard";
import TvCard from "./Cards/TvCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import uniqid from "uniqid";

const Home = () => {
  const [topTV, setTopTV] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [randomBackdrop, setRandomBackdrop] = useState("");

  // Fetches first two pages of each categories' shows and saves them to a state
  const fetchTopTV = async () => {
    setTopTV([...(await getTopTV()), ...(await getTopTV(2))]);
  };

  const fetchPopTV = async () => {
    setPopularTV([...(await getPopularTV()), ...(await getPopularTV(2))]);
  };

  const fetchTopMovies = async () => {
    setTopMovies([...(await getTopMovies()), ...(await getTopMovies(2))]);
  };

  const fetchPopMovies = async () => {
    setPopularMovies([
      ...(await getPopularMovies()),
      ...(await getPopularMovies(2)),
    ]);
  };

  const topMedia = [...topTV, ...topMovies];
  const randomIndex = Math.floor(Math.random() * 40);
  const randomTopMedia = topMedia[randomIndex];

  const fetchRandomMedia = async () => {
    const randomDetails =
      randomTopMedia.type === "tv"
        ? await getShowDetails(randomTopMedia.id)
        : await getMovieDetails(randomTopMedia.id);
    setRandomBackdrop(randomDetails);
  };

  useEffect(() => {
    fetchTopTV();
    fetchPopTV();
    fetchTopMovies();
    fetchPopMovies();
  }, []);

  useEffect(() => {
    fetchRandomMedia();
  }, [popularMovies]);

  return (
    <div style={{ overflowX: "hidden" }}>
      <Row style={{ height: "700px", position: "relative" }}>
        <img
          src={randomBackdrop.backdrop}
          alt=""
          style={{
            filter: "brightness(20%)",
            maxHeight: "100%",
            maxWidth: "100%",
            width: "100%",
            minHeight: "100%",
            objectFit: "cover",
          }}
        />
        <div style={{ position: "absolute", bottom: "50%" }}>
          <h1>Welcome to Track TV</h1>
          <h2>Keep track of your favorite Movies and TV Shows</h2>
        </div>
        <Link to={`/tv-show-tracker/shows/id:${randomBackdrop.id}`}>
          <div
            style={{
              position: "absolute",
              left: "20px",
              bottom: "20px",
              color: "white",
              textAlign: "center",
            }}
          >
            {randomBackdrop.title} ({randomBackdrop.year})
          </div>
        </Link>
      </Row>
      <Container style={{ marginTop: "40px" }}>
        <Row style={{ margin: "1.5rem 0", textAlign: "center" }}>
          <Link to={"/tv-show-tracker/series/popular"}>
            <h1>Popular TV</h1>
          </Link>
          <div className="strip">
            {popularTV.map((show) => (
              <TvCard key={uniqid()} showData={show} />
            ))}
          </div>
        </Row>
        <Row style={{ margin: "1.5rem 0", textAlign: "center" }}>
          <Link to={"/tv-show-tracker/series/top-rated"}>
            <h1>Top Rated TV</h1>
          </Link>
          <div className="strip">
            {topTV.map((show) => (
              <TvCard key={uniqid()} showData={show} />
            ))}
          </div>
        </Row>
        <Row style={{ margin: "1.5rem 0", textAlign: "center" }}>
          <Link to={"/tv-show-tracker/movies/popular"}>
            <h1>Popular Movies</h1>
          </Link>
          <div className="strip">
            {popularMovies.map((movie) => (
              <MovieCard key={uniqid()} movieData={movie} />
            ))}
          </div>
        </Row>
        <Row style={{ margin: "1.5rem 0", textAlign: "center" }}>
          <Link to={"/tv-show-tracker/movies/top-rated"}>
            <h1>Top Rated Movies</h1>
          </Link>
          <div className="strip">
            {topMovies.map((movie) => (
              <MovieCard key={uniqid()} movieData={movie} />
            ))}
          </div>
        </Row>
      </Container>
    </div>
  );
};
export default Home;
