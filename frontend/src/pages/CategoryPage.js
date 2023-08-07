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
import { MediaContext } from "../contexts/MediaContext";

const CategoryPage = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { mediaType, category } = useParams();
  const { media, updateMediaData } = useContext(MediaContext);

  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");
  const [fetchedMedia, setFetchedMedia] = useState([]);
  // const isFirstRender = useRef(true); // Track initial render
  
  const addPage = () => {
    setPage((prev) => prev + 1);
  };

  const fetchMediaData = async (category, mediaType, page) => {
    console.log('hi')
    switch (category) {
      case "popular":
        setTitle('Popular')
        return await getPopularMedia(mediaType, page);
      case "now-playing":
        setTitle('Now Playing')
        return await getNowPlayingMovies(page);
      case "upcoming":
        setTitle('Upcoming')
        return await getUpcomingMovies(page);
      case "airing-today":
        setTitle('Airing Today')
        return await getAiringTodayTV(page);
      default:
        setTitle('Top Rated')
        return await getTopMedia(mediaType, page);
    }
  };

  const fetchPage = async () => {
    let mediaData = [];
  
    const contextCategory =
      category === "popular"
        ? mediaType === "tv"
          ? "popTV"
          : "popMovies"
        : category === "top-rated"
        ? mediaType === "tv"
          ? "topTV"
          : "topMovies"
        : category;
  
    if (!media[contextCategory][page]) {
      mediaData = await fetchMediaData(category, mediaType, page);
      await updateMediaData(contextCategory, page, mediaData);
    } else {
      console.log('success')
      mediaData = media[contextCategory][page].mediaData;
    }
  
    setFetchedMedia((prevMedia) => {
      const newMedia = mediaData.filter(
        (item) => !prevMedia.some((prevItem) => prevItem.id === item.id)
      );
      return [...prevMedia, ...newMedia];
    });
  };
  
  

  useEffect(() => {
    fetchPage();  
  }, [page]);


  const renderMediaCards = () => {
    return fetchedMedia.map((mediaItem) => (
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
        <Row>
          {renderMediaCards()}
        </Row>
        <Button className="mt-5 mb-5" variant="success" onClick={addPage}>
          Show More
        </Button>
      </Container>
    </motion.div>
  );
};

export default CategoryPage;
