import React from "react";
import styles from "./MediaPageInfoSection.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const MediaPageInfoSection = ({ mediaInfo, mediaType }) => {
  const {
    title,
    year,
    genres,
    rating,
    plot,
    seasonNum,
    episodeNum,
    createdBy,
    crew,
  } = mediaInfo;

  return (
    <>
      {/* Render the title and year */}
      <Row className={styles.titleSection}>
        <Col>
          <p>{`${title} (${year?.split("-")[0]})`}</p>
        </Col>
      </Row>

      {/* Render the creator or director depending on media type */}
      <Row className="mt-3 mb-3">
        {mediaType === "tv" ? (
          <Col>
            <strong>Creator: </strong>
            {createdBy?.map((creator) => creator.name).join(", ")}
          </Col>
        ) : (
          <Col>
            <strong>Director: </strong>
            {crew
              ?.filter((member) => member.job === "Director")
              .map((director) => director.name)
              .join(", ")}
          </Col>
        )}
      </Row>

      {/* Render the writers */}
      <Row className="mt-3 mb-3">
        <Col>
          <strong>Writers: </strong>
          <span>
            {[
              ...new Set(
                crew
                  ?.filter((member) =>
                    ["Writer", "Screenplay", "Story"].includes(member.job)
                  )
                  .map((writer) => writer.name)
              ),
            ].join(", ")}
          </span>
        </Col>
      </Row>

      {/* Render season information for TV shows */}
      {mediaType === "tv" && (
        <Row className="mt-3 mb-3">
            <Col><strong>Seasons:</strong> {seasonNum}</Col>
            <Col><strong>Episodes:</strong> {episodeNum}</Col>
        </Row>
      )}

      {/* Render genres, rating, and plot */}
      <Row className="mt-3 mb-3">
        <Col>
          <strong>Rating:</strong> {rating}
        </Col>
        <Col>
          <strong>Genres:</strong> {genres}
        </Col>
      </Row>

      {/* Render media plot */}
      <Row className="mt-3 mb-3"><Col>{plot}</Col></Row>
    </>
  );
};

export default MediaPageInfoSection;
