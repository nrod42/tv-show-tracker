import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../contexts/DarkModeContext";
import getActorPics from "../API/getActorPics.tsx";
import Card from "react-bootstrap/Card";
import defaultMediaIcon from "../../img/default_media_icon.svg";

const PersonCard = ({ person }) => {
  // Access dark mode state from context
  const { darkMode } = useContext(DarkModeContext);

  // Destructure person data for easier access
  const { id, name, character } = person;

  // State to store actor's profile picture
  const [actorPic, setActorPic] = useState("");

  // Fetch actor's profile picture on component mount or when ID changes
  useEffect(() => {
    (async () => {
      const actorPic = await getActorPics(id);
      setActorPic(actorPic);
    })();
  }, [id]);

  return (
    // Card container with background color based on dark mode
    <Card bg={darkMode ? "dark" : "light"} style={{ border: "none" }}>
      {/* Link to the individual person's page */}
      <Card.Link as={Link} to={`/people/${id}`}>
        {/* Actor's profile picture */}
        <Card.Img
          variant="top"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src={actorPic !== null ? actorPic : defaultMediaIcon}
        />
      </Card.Link>
      
      {/* Actor's details */}
      <Card.Body className="text-center" style={{ padding: "1rem" }}>
        {/* Actor's name */}
        <Card.Title
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          {name}
        </Card.Title>
        
        {/* Character played by the actor */}
        <Card.Subtitle style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
          {character}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default PersonCard;
