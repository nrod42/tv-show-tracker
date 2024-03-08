import React from "react";
import { Link } from "react-router-dom";
import styles from "../pages/WatchListTabsPage.module.css";

/**
 * WatchList component represents a single watch list item.
 * It displays the title, total count, and separate counts for movies and series.
 */
const WatchList = ({ title, link, userData }) => {
  return (
    <div className={styles.list}>
      <Link to={link}>
        <div className={styles.listItem}>
          <h2>{title}</h2>
          <div className={styles.listDetails}>
            <p>Total: {userData?.movies.length + userData?.tvShows.length}</p>
            <p>Movies: {userData?.movies.length}</p>
            <p>Series: {userData?.tvShows.length}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default WatchList;
