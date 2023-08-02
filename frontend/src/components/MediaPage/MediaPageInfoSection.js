import React from "react";
import styles from "./MediaPageInfoSection.module.css";

const MediaPageInfoSection = ({ mediaInfo, mediaType }) => {
  const { title, year, genres, rating, plot, seasonNum, episodeNum, createdBy, crew } =
    mediaInfo;

  return (
    <>
      {/* Render the title and year */}
      <div className={styles.titleSection}>
        <p>{title}</p>
        <p>({year?.split("-")[0]})</p>
      </div>

      <div>
        <strong>{mediaType === "tv" ? 'Creator: ' : 'Director: '}</strong>
        {mediaType === "tv" ? (
          <span>
            {createdBy
              ?.map((creator) => creator.name)
              .join(", ")}
          </span>
        ) : (
          <span>
            {crew
              ?.filter((member) => member.job === "Director")
              .map((director) => director.name)
              .join(", ")}
          </span>
        )}
      </div>

      <div>
        <strong>Writers: </strong>
        <span>
          {[...new Set(
            crew
            ?.filter((member) => ["Writer", "Screenplay", "Story"].includes(member.job))
            .map((writer) => writer.name)
          )].join(", ")}
        </span>
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
        <strong>Rating:</strong> {rating}
      </p>
      <p>
        <strong>Genres:</strong> {genres}
      </p>

      <div className="plotSection">{plot}</div>
    </>
  );
};

export default MediaPageInfoSection;
