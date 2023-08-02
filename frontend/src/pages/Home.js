import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { DarkModeContext } from "../Contexts/DarkModeContext";
import { MediaContext } from "../Contexts/MediaContext";
import CardStripSection from "../components/CardStripSection";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import defaultMediaIcon from "../img/default_media_icon.svg";
import styles from "./Home.module.css";

const Home = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { topTV, popularTV, topMovies, popularMovies, randomBackdrop } = useContext(MediaContext);

  return (
    <motion.div
      className={darkMode ? styles.homePageDark : styles.homePageLight}
      style={{ overflowX: "hidden"}}
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <Row className={styles.randomBackdropWrapper}>
        <img
          className={styles.randomBackdrop}
          src={randomBackdrop.backdrop !== null ? randomBackdrop.backdrop : defaultMediaIcon}
          alt={`${randomBackdrop.title} poster`}
        />
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>Welcome to Track TV</h1>
          <h2 className={styles.title}>
            Keep track of your favorite movies and shows
          </h2>
        </div>
        <Link
          to={`/${randomBackdrop.type}/${randomBackdrop.id}`}
        >
          <div className={styles.randomBackdropInfo}>
            {randomBackdrop.title} ({randomBackdrop.year})
          </div>
        </Link>
      </Row>

      <Container className={styles.container}>
        {/* Render Popular Movies */}
        <CardStripSection media={popularMovies} title={'Popular Movies'} linkTo={"/movie/category/popular"} />
        
        {/* Render Top Rated Movies */}
        <CardStripSection media={topMovies} title={'Top Rated Movies'} linkTo={"/movie/category/top-rated"} />
        
        {/* Render Popular Shows */}
        <CardStripSection media={popularTV} title={'Popular Shows'} linkTo={"/tv/category/popular"} />
        
        {/* Render Top Rated Shows */}
        <CardStripSection media={topTV} title={'Top Rated Shows'} linkTo={"/tv/category/top-rated"} />
      </Container>
    </motion.div>
  );
};
export default Home;
