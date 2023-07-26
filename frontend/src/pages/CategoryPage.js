import React, { useState, useEffect, useContext } from "react";
import MediaNav from "../components/MediaNav";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MediaCard from "../components/Cards/MediaCard";
import { motion } from "framer-motion";
import styles from "./CategoryPage.module.css";
import { DarkModeContext } from "../DarkModeContext";
import uniqid from "uniqid";

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
    >
      <MediaNav type={type} /> {/* Component for displaying media navigation */}
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
