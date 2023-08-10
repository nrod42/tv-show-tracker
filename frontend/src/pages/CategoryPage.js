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
  const [leftovers, setLeftovers] = useState([])

  const targetResults = 18;
  const addPage = () => {
    // const addPage = () => {
      const nextPage = page + 1;
      fetchPage(nextPage);
    // };
  };


  // Function to fetch a page of media based on the current page and type
  const fetchPage = async (newPage) => {
    let mediaData = [...leftovers]; // Include any leftover items from previous fetches
    let newMedia = [];
    let currentPage = newPage; // Use a separate variable to track the page

    while (mediaData.length < targetResults) {
      
      switch (category) {
        case "popular":
          newMedia = await getPopularMedia(mediaType, currentPage);
          setTitle("Popular");
          break;
        case "now-playing":
          newMedia = await getNowPlayingMovies(currentPage);
          setTitle("Now Playing");
          break;
        case "upcoming":
          newMedia = await getUpcomingMovies(currentPage);
          setTitle("Upcoming");
          break;
        case "airing-today":
          newMedia = await getAiringTodayTV(currentPage);
          setTitle("Airing Today");
          break;
        default:
          newMedia = await getTopMedia(mediaType, currentPage);
          setTitle("Top Rated");
      }

        // Add fetched media to mediaData and increment page
      mediaData.push(...newMedia);

      // Break the loop if no more data can be fetched
      if (newMedia.length === 0) {
        break;
      }

      currentPage++;
    }

    // Set leftovers if mediaData exceeds 20 items
    if (mediaData.length > targetResults) {
      setLeftovers(mediaData.slice(targetResults));
      mediaData = mediaData.slice(0, targetResults);
    }

    setPage(currentPage);

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
    fetchPage(page);
  }, []);

  useEffect(() => {
    // Clear media state when the category changes
    setMedia([]);
  }, [category]);

  const renderMediaCards = () => {
    return media.map((mediaItem) => (
      <Col key={uniqid()} lg={2} md={4} sm={6} xs={6}>
        <MediaCard mediaData={mediaItem} />
      </Col>
    ));
  };

  return (
    <motion.div
      className={darkMode ? styles.categoryPageDark : styles.categoryPageLight}
    >
      <MediaNav />
      <Container className="text-center">
        <h2 className="mb-5">{title}</h2>
        <Row>{renderMediaCards()}</Row>
        <Button className="mt-5 mb-5" variant="success" onClick={addPage}>
          Show More
        </Button>
      </Container>
    </motion.div>
  );
};

export default CategoryPage;
