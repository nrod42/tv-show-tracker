import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  getTopMedia,
  getPopularMedia,
  getMediaDetails,
} from "../components/API/getMedia";
import Strip from "../components/Strip";
import MediaCard from "../components/Cards/MediaCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import rightArrow from "../img/arrow-right.svg";
import defaultMediaIcon from "../img/default_media_icon.svg";
import { DarkModeContext } from "../DarkModeContext";
import styles from "./Home.module.css";

const Home = () => {
  const { darkMode } = useContext(DarkModeContext);
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
  }, [topTV]);

  const renderMediaCards = (array) => {
    return array.map((media) => <MediaCard key={media.id} mediaData={media} />);
  };

  return (
    <motion.div
      className={darkMode ? styles.homePageDark : styles.homePageLight}
      style={{ overflowX: "hidden" }}
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <Row className={styles.row}>
        <img
          className={styles.randomBackdrop}
          src={randomBackdrop.backdrop !== null ? randomBackdrop.backdrop : defaultMediaIcon}
          alt={`${randomBackdrop.title} poster`}
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
        <Link to={"/tv-show-tracker/movies/popular"}>
          {/* className='d-flex flex-row justify-content-center align-items-center'  */}
          <h2 className="ms-5 mt-5 mb-3">
            Popular Movies
            <img
              src={rightArrow}
              style={{ height: "25px", width: "auto", marginLeft: "10px" }}
            />
          </h2>
        </Link>
        <p className="ms-5">Popular Movies</p>
        <Strip array={renderMediaCards(popularMovies)} />
        <Link to={"/tv-show-tracker/movies/top-rated"}>
          <h2 className="ms-5 mt-5 mb-3">
            Top Rated Movies
            <img
              src={rightArrow}
              style={{ height: "25px", width: "auto", marginLeft: "10px" }}
            />
          </h2>
        </Link>
        <p className="ms-5">Top Movies</p>
        <Strip array={renderMediaCards(topMovies)} />
        <Link to={"/tv-show-tracker/tv/popular"}>
          <h2 className="ms-5 mt-5 mb-3">
            Popular TV
            <img
              src={rightArrow}
              style={{ height: "25px", width: "auto", marginLeft: "10px" }}
            />
          </h2>
        </Link>
        <p className="ms-5">Popular Shows</p>
        <Strip array={renderMediaCards(popularTV)} />
        <Link to={"/tv-show-tracker/tv/top-rated"}>
          <h2 className="ms-5 mt-5 mb-3">
            Top Rated TV
            <img
              src={rightArrow}
              style={{ height: "25px", width: "auto", marginLeft: "10px" }}
            />
          </h2>
        </Link>
        <p className="ms-5">Top TV</p>
        <Strip array={renderMediaCards(topTV)} />
      </Container>
    </motion.div>
  );
};
export default Home;
