import React from "react";
import styles from "./MediaPageInfoSection.module.css"

const MediaPageInfoSection = ({ mediaInfo, mediaType }) => {
  const { title, year, genres, rating, plot, seasonNum, episodeNum } =
    mediaInfo;

  return (
    <>
      {/* Render the title and year */}
      <div className={styles.titleSection}>
        <p>{title}</p>
        <p>({year?.split("-")[0]})</p>
      </div>

      {/* Render season information for TV shows */}
      {mediaType === "tv" && (
        <div className={styles.seasonSection}>
          <p>
            <strong>Seasons:</strong> {seasonNum}
          </p>
          <p>
            <strong>Episodes:</strong> {episodeNum}
          </p>
        </div>
      )}

      {/* Render genres, rating, and plot */}
      <p>
        <strong>Genres:</strong> {genres}
      </p>
      <p>
        <strong>Rating:</strong> {rating}
      </p>
      <div className="plotSection">{plot}</div>
    </>
  );
};

export default MediaPageInfoSection;
