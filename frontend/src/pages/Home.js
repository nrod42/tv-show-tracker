import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getTopMedia,
  getPopularMedia,
  getMediaDetails,
} from "../components/API/getMedia";
import Strip from "../components/Strip";
import MediaCard from "../components/Cards/MediaCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { motion } from "framer-motion";
import styles from "./Home.module.css";

const Home = () => {
  const [topTV, setTopTV] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [randomBackdrop, setRandomBackdrop] = useState("");

  // Fetches data for top TV shows, popular TV shows, top movies, and popular movies
  const fetchData = async () => {
    const [
      topTVResult,
      topTVPage2Result,
      popTVResult,
      popTVPage2Result,
      topMoviesResult,
      topMoviesPage2Result,
      popMoviesResult,
      popMoviesPage2Result,
    ] = await Promise.all([
      getTopMedia("tv"),
      getTopMedia("tv", 2),
      getPopularMedia("tv"),
      getPopularMedia("tv", 2),
      getTopMedia("movie"),
      getTopMedia("movie", 2),
      getPopularMedia("movie"),
      getPopularMedia("movie", 2),
    ]);

    // Merge results of multiple API calls into respective state variables
    setTopTV([...topTVResult, ...topTVPage2Result]);
    setPopularTV([...popTVResult, ...popTVPage2Result]);
    setTopMovies([...topMoviesResult, ...topMoviesPage2Result]);
    setPopularMovies([...popMoviesResult, ...popMoviesPage2Result]);
  };

  // Fetches random media item from the combined list of top TV shows and top movies
  const fetchRandomMedia = async () => {
    const topMedia = [...topTV, ...topMovies];
    const randomIndex = Math.floor(Math.random() * topMedia.length);
    const randomTopMedia = topMedia[randomIndex] || [];

    // Fetch details of the random media item
    const randomDetails =
      randomTopMedia.type === "tv"
        ? await getMediaDetails(randomTopMedia.id, "tv")
        : await getMediaDetails(randomTopMedia.id, "movie");
    setRandomBackdrop(randomDetails);
  };

  useEffect(() => {
    // Fetch data on component mount
    fetchData();
  }, []);

  useEffect(() => {
    // Fetch random media when topTV state updates
    fetchRandomMedia();
  }, []);

  const renderMediaCards = (array) => {
    return array.map((media) => <MediaCard key={media.id} mediaData={media} />);
  };

  return (
    <motion.div
      style={{ overflowX: "hidden" }}
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <Row className={styles.row}>
        <img
          className={styles.randomBackdrop}
          src={randomBackdrop.backdrop}
          alt=""
        />
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>Welcome to Track TV</h1>
          <h2 className={styles.title}>
            Keep track of your favorite Movies and TV Shows
          </h2>
        </div>
        <Link
          to={`/tv-show-tracker/${
            randomBackdrop.type === "tv" ? "shows" : "movies"
          }/${randomBackdrop.id}`}
        >
          <div className={styles.randomBackdropInfo}>
            {randomBackdrop.title} ({randomBackdrop.year})
          </div>
        </Link>
      </Row>
      <Container className={styles.container}>
        <Strip
          title={
            <Link to={"/tv-show-tracker/movies/top-rated"}>
              <h1>Top Rated Movies</h1>
            </Link>
          }
          array={renderMediaCards(topMovies)}
        />
        <Strip
          title={
            <Link to={"/tv-show-tracker/movies/popular"}>
              <h1>Popular Movies</h1>
            </Link>
          }
          array={renderMediaCards(popularMovies)}
        />
        <Strip
          title={
            <Link to={"/tv-show-tracker/tv/top-rated"}>
              <h1>Top Rated TV</h1>
            </Link>
          }
          array={renderMediaCards(topTV)}
        />
        <Strip
          title={
            <Link to={"/tv-show-tracker/tv/popular"}>
              <h1>Popular TV</h1>
            </Link>
          }
          array={renderMediaCards(popularTV)}
        />
      </Container>
    </motion.div>
  );
};
export default Home;
