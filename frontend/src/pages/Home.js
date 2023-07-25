import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { DarkModeContext } from "../DarkModeContext";
import {
  getTopMedia,
  getPopularMedia,
  getMediaDetails,
} from "../components/API/getMedia";
import MediaCard from "../components/Cards/MediaCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import rightArrowBlack from "../img/right_arrow_black.svg";
import rightArrowWhite from '../img/right_arrow_white.svg';
import defaultMediaIcon from "../img/default_media_icon.svg";
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
      popTVResult,
      topMoviesResult,
      popMoviesResult,
    ] = await Promise.all([
      getTopMedia("tv"),
      getPopularMedia("tv"),
      getTopMedia("movie"),
      getPopularMedia("movie"),
    ]);

    // Merge results of multiple API calls into respective state variables
    setTopTV([...topTVResult]);
    setPopularTV([...popTVResult]);
    setTopMovies([...topMoviesResult]);
    setPopularMovies([...popMoviesResult]);
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
    return array.map((media) => (
      <Col key={media.id} xs={6} sm={4} md={3} lg={2}>
        <MediaCard mediaData={media} />
      </Col>
    ));
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
        <div className="d-flex align-items-center mt-5 mb-5">
            <h2>Popular Movies</h2>
            <img
                src={darkMode ? rightArrowWhite : rightArrowBlack}
                style={{ height: "25px", width: "auto", marginLeft: "10px" }}
            />
          </div>
        </Link>
        <Row>{renderMediaCards(popularMovies).slice(0,6)} </Row>
        
        <Link to={"/tv-show-tracker/movies/top-rated"}>
        <div className="d-flex align-items-center mt-5 mb-5">
            <h2>Top Rated Movies</h2>
            <img
                src={darkMode ? rightArrowWhite : rightArrowBlack}
                style={{ height: "25px", width: "auto", marginLeft: "10px" }}
            />
          </div>
        </Link>
        <Row>{renderMediaCards(topMovies).slice(0,6)}</Row>
        
        <Link to={"/tv-show-tracker/tv/popular"}>
        <div className="d-flex align-items-center mt-5 mb-5">
            <h2>Popular TV</h2>
            <img
                src={darkMode ? rightArrowWhite : rightArrowBlack}
                style={{ height: "25px", width: "auto", marginLeft: "10px" }}
            />
          </div>
        </Link>
        <Row>{renderMediaCards(popularTV).slice(0,6)}</Row>
        
        <Link to={"/tv-show-tracker/tv/top-rated"}>
          <div className="d-flex align-items-center mt-5 mb-5">
            <h2>Top Rated TV</h2>
            <img
                src={darkMode ? rightArrowWhite : rightArrowBlack}
                style={{ height: "25px", width: "auto", marginLeft: "10px" }}
            />
          </div>
        </Link>
        <Row>{renderMediaCards(topTV).slice(0,6)}</Row>
      </Container>
    </motion.div>
  );
};
export default Home;
