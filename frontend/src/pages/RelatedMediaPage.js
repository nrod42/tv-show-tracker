import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { DarkModeContext } from "../Contexts/DarkModeContext";
import { getMediaDetails, getRecMedia, getSimilarMedia } from "../components/API/getMedia";
import MediaCard from "../components/Cards/MediaCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from './RelatedMediaPage.module.css';
import uniqid from 'uniqid';


const RelatedMediaPage = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { mediaType, relation, id } = useParams();

  const [media, setMedia] = useState([]); // State to store the fetched media
  const [page, setPage] = useState(1); // State to track the current page number
  const [title, setTitle] = useState("");
  const [hasMoreResults, setHadMoreResults] = useState(true);

  // Function to increment the page number
  const addPage = async () => {
    setPage((prev) => prev + 1);
  };

  const fetchMediaName = async () => {
    const mediaDetails = await getMediaDetails(id, mediaType);
    setTitle(mediaDetails.title);
  };

  const fetchRelatedMedia = async () => {
    const newPage = relation === 'similar' ? await getSimilarMedia(id, mediaType, page) : await getRecMedia(id, mediaType, page);

    // If there are no more new items, update the state to make button disabled. 
    // <=10 because each page contains 10 items, if there are less than 10 items then this is the last page.
    if (newPage.length <= 10) {
      setHadMoreResults(false);
      return
    }
      // Filter out duplicate media items and add only the new ones to the state
    setMedia((prevMedia) => {
        const uniqueMediaData = newPage.filter(
        (mediaItem) => !prevMedia.some((prevItem) => prevItem.id === mediaItem.id)
        );
        return [...prevMedia, ...uniqueMediaData];
    });
  };

  useEffect(() => {
    fetchMediaName();
    fetchRelatedMedia();
  }, [page])

  useEffect(() => {
    // Clear media state when the category changes
    setMedia([]);
  }, [relation]);


  return (
    <div
      className={darkMode ? styles.relatedMediaPageDark : styles.relatedMediaPageLight}
    >
      <Container className="text-center">
        <h2 className="mb-5">{`${relation.charAt(0).toUpperCase() + relation.slice(1)} to "${title}"`}</h2> {/* Title of the category page */}
        <Row>
          {/* Map through the media array and render MediaCard components */}
          {media.map((mediaItem) => (
            <Col key={uniqid()} lg={2} md={4} sm={6} xs={6}>
              <MediaCard mediaData={mediaItem} />
            </Col>
          ))}
        </Row>
        <Button className="mb-5" variant="success" onClick={addPage} disabled={!hasMoreResults}>
          Show More
        </Button>
      </Container>
    </div>
  );
};

export default RelatedMediaPage;
