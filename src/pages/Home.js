import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTopMedia, getPopularMedia, getMediaDetails } from "../components/API/getMedia";
import Strip from "../components/Strip";
import MediaCard from "../components/Cards/MediaCard";
import uniqid from "uniqid";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";


const Home = () => {
  const [topTV, setTopTV] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [randomBackdrop, setRandomBackdrop] = useState("");

  // Fetches first two pages of each categories' shows and saves them to a state
  const fetchTopTV = async () => {
    setTopTV([...(await getTopMedia("tv")), ...(await getTopMedia("tv", 2))]);
  };

  const fetchPopTV = async () => {
    setPopularTV([...(await getPopularMedia("tv")), ...(await getPopularMedia("tv", 2))]);
  };

  const fetchTopMovies = async () => {
    setTopMovies([...(await getTopMedia("movie")), ...(await getTopMedia("movie", 2))]);
  };

  const fetchPopMovies = async () => {
    setPopularMovies([
      ...(await getPopularMedia("movie")),
      ...(await getPopularMedia("movie", 2)),
    ]);
  };

  const topMedia = [...topTV, ...topMovies];
  const randomIndex = Math.floor(Math.random() * 40);
  const randomTopMedia = topMedia[randomIndex] ? topMedia[randomIndex] : [];

  const fetchRandomMedia = async () => {
    const randomDetails =
      randomTopMedia.type === "tv"
        ? await getMediaDetails(randomTopMedia.id, "tv")
        : await getMediaDetails(randomTopMedia.id, "movie");
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
        <div style={{ position: "absolute", left: "20px", bottom: "350px" }}>
          <h1 style={{ color: "white" }}>Welcome to Track TV</h1>
          <h2 style={{ color: "white" }}>
            Keep track of your favorite Movies and TV Shows
          </h2>
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
      <Strip
          title={
            <Link to={"/tv-show-tracker/movies/popular"}>
              <h1>Popular Movies</h1>
            </Link>
          }
          array={popularMovies.map((movie) => (
            <MediaCard key={uniqid()} mediaData={movie} />
          ))}
        />
        <Strip
          title={
            <Link to={"/tv-show-tracker/movies/top-rated"}>
              <h1>Top Rated Movies</h1>
            </Link>
          }
          array={topMovies.map((movie) => (
            <MediaCard key={uniqid()} mediaData={movie} />
          ))}
        />
        <Strip
          title={
            <Link to={"/tv-show-tracker/tv/popular"}>
              <h1>Popular TV</h1>
            </Link>
          }
          array={popularTV.map((show) => (
            <MediaCard key={uniqid()} mediaData={show} />
          ))}
        />
        <Strip
          title={
            <Link to={"/tv-show-tracker/tv/top-rated"}>
              <h1>Top Rated TV</h1>
            </Link>
          }
          array={topTV.map((show) => (
            <MediaCard key={uniqid()} mediaData={show} />
          ))}
        />
      </Container>
    </div>
  );
};
export default Home;
