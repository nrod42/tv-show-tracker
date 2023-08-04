import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { motion } from "framer-motion";
import MediaNav from "../components/MediaNav";
import MediaCard from "../components/Cards/MediaCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./CategoryPage.module.css";
import {
  getTopMedia,
  getPopularMedia,
  getAiringTodayTV,
  getUpcomingMovies,
  getNowPlayingMovies,
} from "../components/API/getMedia";
import uniqid from "uniqid";

const CategoryPage = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { mediaType, category } = useParams();

  const [media, setMedia] = useState([]); // State to store the fetched media
  const [page, setPage] = useState(1); // State to track the current page number
  const [title, setTitle] = useState("");

  // Function to increment the page number
  const addPage = async () => {
    setPage((prev) => prev + 1);
  };

  // Function to fetch a page of media based on the current page and type
  const fetchPage = async () => {
    let mediaData = [];

    switch (category) {
      case "popular":
        mediaData = await getPopularMedia(mediaType, page);
        setTitle("Popular");
        break;
      case "now-playing":
        mediaData = await getNowPlayingMovies(page);
        setTitle("Now Playing");
        break;
      case "upcoming":
        mediaData = await getUpcomingMovies(page);
        setTitle("Upcoming");
        break;
      case "airing-today":
        mediaData = await getAiringTodayTV(page);
        setTitle("Airing Today");
        break;
      default:
        mediaData = await getTopMedia(mediaType, page);
        setTitle("Top Rated");
    }

    // Filter out duplicate media items and add only the new ones to the state
    setMedia((prevMedia) => {
      const uniqueMediaData = mediaData.filter(
        (mediaItem) =>
          !prevMedia.some((prevItem) => prevItem.id === mediaItem.id)
      );
      return [...prevMedia, ...uniqueMediaData];
    });
  };

  useEffect(() => {
    fetchPage();
  }, [page]);

  useEffect(() => {
    // Clear media state when the category changes
    setMedia([]);
  }, [category]);

  return (
    <motion.div
      className={darkMode ? styles.categoryPageDark : styles.categoryPageLight}
    >
      <MediaNav /> {/* Component for displaying media navigation */}
      <Container className="text-center">
        <h2 className="mb-5">{title}</h2> {/* Title of the category page */}
        <Row>
          {/* Map through the media array and render MediaCard components */}
          {media.map((mediaItem) => (
            <Col key={uniqid()} lg={2} md={4} sm={6} xs={6}>
              <MediaCard mediaData={mediaItem} />
            </Col>
          ))}
        </Row>
        <Button className="mb-5" variant="success" onClick={addPage}>
          Show More
        </Button>
      </Container>
    </motion.div>
  );
};

export default CategoryPage;
