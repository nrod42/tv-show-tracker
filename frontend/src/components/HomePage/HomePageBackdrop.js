import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import defaultMediaIcon from "../../img/default_media_icon.svg";
import Row from "react-bootstrap/Row";
import styles from "./HomePageBackdrop.module.css";
import { RandomBackdropContext } from "../../contexts/RandomBackdropContext";

const HomePageBackdrop = ({ topTV, topMovies, popularTV, popularMovies }) => {
  const { randomBackdrop, setMedia } = useContext(RandomBackdropContext);

  useEffect(() => {
    setMedia([...topTV, ...topMovies, ...popularTV, ...popularMovies]);
  }, [topTV, topMovies, popularTV, popularMovies, setMedia]);

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
  );
};

export default HomePageBackdrop;
