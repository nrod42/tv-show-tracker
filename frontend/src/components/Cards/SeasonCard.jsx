import React, { useContext } from "react";
import { DarkModeContext } from "../../contexts/DarkModeContext";
import Card from "react-bootstrap/Card";
import defaultMediaIcon from "../../img/default_media_icon.svg";

const SeasonCard = ({ season }) => {
  // Access dark mode state from context
  const { darkMode } = useContext(DarkModeContext);

  // Destructure season data for easier access
  const { season_number, episode_count, poster_path } = season;

  return (
    // Card container with background color based on dark mode
    <Card bg={darkMode ? "dark" : "light"} style={{ border: "none" }}>
      {/* Season poster */}
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

      {/* Season details */}
      <Card.Body className="text-center" style={{ padding: "1rem" }}>
        {/* Season title */}
        <Card.Title
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          {/* Display season title, including "Specials" for season_number 0 */}
          {season_number === 0 ? "Specials" : `Season ${season_number}`}
        </Card.Title>
        
        {/* Number of episodes */}
        <Card.Subtitle style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
          {episode_count} Episodes
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default SeasonCard;
