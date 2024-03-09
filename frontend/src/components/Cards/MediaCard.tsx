import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../contexts/DarkModeContext";
import AddToListBtn from "../AddToListBtn";
import RemoveFromListBtn from "../RemoveFromListBtn";
import Card from "react-bootstrap/Card";
import defaultMediaIcon from "../../img/default_media_icon.svg";

interface MediaCard {
  mediaData: {
  id: string;
  poster: string | null;
  title: string;
  role: string;
  rating: string;
  year: string;
  type: string;
  }
}

const MediaCard: React.FC<MediaCard> = ({ mediaData, setReload }) => {
  // Access dark mode state from context
  const { darkMode } = useContext(DarkModeContext);

  // Destructure media data for easier access
  const { id, poster, title, rating, year, type } = mediaData;

  return (
    // Card container with background color based on dark mode
    <Card bg={darkMode ? "dark" : "light"} style={{ border: "none" }}>
      {/* Link to the individual media page */}
      <Card.Link as={Link} to={`/${type}/${id}`}>
        {/* Media poster image */}
        <Card.Img
          variant="top"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src={poster !== null ? poster : defaultMediaIcon}
        />
      </Card.Link>
      
      {/* Button to add media to user's list */}
      <AddToListBtn id={id} type={type} />
      
      {/* Button to remove media from user's list */}
      <RemoveFromListBtn id={id} type={type} setReload={setReload} />
      
      {/* Media details */}
      <Card.Body className="text-center" style={{ padding: "1rem" }}>
        {/* Media title */}
        <Card.Title
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          {title}
        </Card.Title>
        
        {/* Media year */}
        <Card.Subtitle style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
          ({year})
        </Card.Subtitle>
        
        {/* Media rating */}
        <Card.Text style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
          Rating: {rating}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MediaCard;
