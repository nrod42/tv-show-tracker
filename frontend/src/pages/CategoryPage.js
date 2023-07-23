import React, { useState, useEffect, useContext } from "react";
import MediaNav from "../components/MediaNav";
import Button from "react-bootstrap/Button";
import MediaCard from "../components/Cards/MediaCard";
import { motion } from "framer-motion";
import styles from "./CategoryPage.module.css";
import { DarkModeContext } from "../DarkModeContext";

const CategoryPage = ({ type, title, getMedia }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [media, setMedia] = useState([]); // State to store the fetched media
  const [page, setPage] = useState(1); // State to track the current page number

  // Function to increment the page number
  const addPage = async () => {
    setPage((prev) => prev + 1);
  };

  // Function to fetch a page of media based on the current page and type
  const fetchPage = async () => {
    const newPage = await getMedia(type, page);
    setMedia([...media, ...newPage]);
  };

  useEffect(() => {
    fetchPage(); // Fetch the initial page of media
  }, [page]);

  return (
    <motion.div
      className={darkMode ? styles.categoryPageDark : styles.categoryPageLight}
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <MediaNav type={type} /> {/* Component for displaying media navigation */}
      <h2>{title}</h2> {/* Title of the category page */}
      <div className={styles.cardGrid}>
        {/* Map through the media array and render MediaCard components */}
        {media.map((mediaItem) => (
          <MediaCard key={mediaItem.id} mediaData={mediaItem} />
        ))}
      </div>
      <Button variant="success" onClick={addPage}>
        Show more
      </Button>
    </motion.div>
  );
};

export default CategoryPage;
