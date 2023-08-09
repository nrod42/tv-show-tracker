import React, { useContext } from "react";
import { motion } from "framer-motion";
import { DarkModeContext } from "../contexts/DarkModeContext";
import HomePageBackdrop from "../components/HomePage/HomePageBackdrop";
import HomePageMain from "../components/HomePage/HomePageMain";
import Container from "react-bootstrap/Container";
import styles from "./HomePage.module.css";
import { RandomBackdropContext } from "../contexts/RandomBackdropContext";

const HomePage = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { topTV, topMovies, popularTV, popularMovies } = useContext(RandomBackdropContext)

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
      <HomePageBackdrop
        topTV={topTV}
        topMovies={topMovies}
        popularTV={popularTV}
        popularMovies={popularMovies}
      />
      <Container className={`mb-5 ${styles.container}`}>
        {/* Render main homepage content */}
        <HomePageMain
          popularMovies={popularMovies}
          topMovies={topMovies}
          popularTV={popularTV}
          topTV={topTV}
        />
      </Container>
    </motion.div>
  );
};

export default HomePage;
