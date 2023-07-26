import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import defaultMediaIcon from "../../img/default_media_icon.svg";
import { DarkModeContext } from "../../DarkModeContext";

const SeasonCard = ({ season }) => {
  const { darkMode } = useContext(DarkModeContext);
  const { season_number, episode_count, poster_path } = season;

  return (
    <Card bg={darkMode ? "dark" : "light"} style={{ border: "none" }}>
      <Card.Img
        variant="top"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        src={
          poster_path !== null
            ? `https://image.tmdb.org/t/p/w342/${poster_path}`
            : defaultMediaIcon
        }
        alt={`${season_number} poster`}
      />
      <Card.Body className="text-center" style={{ padding: "1rem" }}>
        <Card.Title
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          {season_number === 0 ? "Specials" : `Season ${season_number}`}
        </Card.Title>
        <Card.Subtitle style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
          {episode_count} Episodes
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default SeasonCard;
