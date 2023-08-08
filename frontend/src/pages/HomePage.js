import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { getTopMedia, getPopularMedia } from "../components/API/getMedia";
import HomePageBackdrop from "../components/HomePage/HomePageBackdrop";
import HomePageMain from "../components/HomePage/HomePageMain";
import Container from "react-bootstrap/Container";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const { darkMode } = useContext(DarkModeContext)
  const [topTV, setTopTV] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  const fetchTopMedia = async (type) => {
    let topMedia = await getTopMedia(type);
    let page = 1;
    while (topMedia.length < 6) {
      page++;
      topMedia = [...topMedia, ...(await getTopMedia(type, page))];
    }
    return topMedia;
  };

  const fetchPopMedia = async (type) => {
    let popMedia = await getPopularMedia(type);
    let page = 1;
    while (popMedia.length < 6) {
      page++;
      popMedia = [...popMedia, ...(await getPopularMedia(type, page))];
    }
    return popMedia;
  };

  // Fetches data for top TV shows, popular TV shows, top movies, and popular movies
  const fetchData = async () => {
    const topTVResult = await fetchTopMedia("tv");
    const topMoviesResult = await fetchTopMedia("movie");
    const popTVResult = await fetchPopMedia("tv");
    const popMoviesResult = await fetchPopMedia("movie");

    // Merge results of multiple API calls into respective state variables
    setTopTV([...topTVResult]);
    setPopularTV([...popTVResult]);
    setTopMovies([...topMoviesResult]);
    setPopularMovies([...popMoviesResult]);
  };

  useEffect(() => {
    // Fetch data on component mount
    fetchData();
  }, []);

  return (
    <motion.div
      // Apply dynamic styling based on dark mode state
      className={darkMode ? styles.homePageDark : styles.homePageLight}
      
      // Animation configurations for page entry and exit
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      {/* Render homepage backdrop */}
      <HomePageBackdrop topTV={topTV} topMovies={topMovies} popularTV={popularTV} popularMovies={popularMovies}/>
      <Container className={styles.container}>
        {/* Render main homepage content */}
        <HomePageMain popularMovies={popularMovies} topMovies={topMovies} popularTV={popularTV} topTV={topTV} />
      </Container>
    </motion.div>
  );
};

export default HomePage;
