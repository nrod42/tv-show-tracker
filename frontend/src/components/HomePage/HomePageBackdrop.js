import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import defaultMediaIcon from "../../img/default_media_icon.svg";
import Row from "react-bootstrap/Row";
import styles from './HomePageBackdrop.module.css';
import { getMediaDetails } from "../API/getMedia";

const HomePageBackdrop = ({topTV, topMovies}) => {

  const [randomBackdrop, setRandomBackdrop] = useState("");
  
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
    // Fetch random media when topTV state updates
    fetchRandomMedia();
  }, [topTV]);

  return (
    <Row className={styles.randomBackdropWrapper}>
        <img
          className={styles.randomBackdrop}
          src={
            randomBackdrop.backdrop !== null
              ? randomBackdrop.backdrop
              : defaultMediaIcon
          }
          alt={`${randomBackdrop.title} poster`}
        />
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>Welcome to Track TV</h1>
          <h2 className={styles.title}>
            Keep track of your favorite movies and shows
          </h2>
        </div>
        <Link to={`/${randomBackdrop.type}/${randomBackdrop.id}`}>
          <div className={styles.randomBackdropInfo}>
            {randomBackdrop.title} ({randomBackdrop.year})
          </div>
        </Link>
      </Row>
  )
}

export default HomePageBackdrop;