import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RandomBackdropContext } from "../../contexts/RandomBackdropContext";
import defaultMediaIcon from "../../img/default_media_icon.svg";
import styles from "./HomePageBackdrop.module.css";

const HomePageBackdrop = () => {
  const { randomBackdrop } = useContext(RandomBackdropContext);

  return (
    <div className={styles.randomBackdropWrapper}>
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
        <h1 className={styles.title}>Welcome to Trackr</h1>
        <h2 className={styles.title}>
          Keep track of your favorite movies and shows
        </h2>
      </div>
      <Link to={`/${randomBackdrop.type}/${randomBackdrop.id}`}>
        <div className={styles.randomBackdropInfo}>
          {randomBackdrop.title} ({randomBackdrop.year})
        </div>
      </Link>
    </div>
  );
};

export default HomePageBackdrop;
