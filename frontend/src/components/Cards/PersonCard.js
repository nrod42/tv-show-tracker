import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../Contexts/DarkModeContext";
import { getActorPics } from "../API/getMedia";
import Card from "react-bootstrap/Card";
import defaultMediaIcon from "../../img/default_media_icon.svg";

const PersonCard = ({ person }) => {
  const { darkMode } = useContext(DarkModeContext);
  const { id, name, character } = person;

  const [actorPic, setActorPic] = useState("");

  useEffect(() => {
    (async () => {
      const actorPic = await getActorPics(id);
      setActorPic(actorPic);
    })();
  }, [id]);

  return (
    <Card bg={darkMode ? "dark" : "light"} style={{ border: "none" }}>
      <Card.Link as={Link} to={`/people/${id}`}>
        <Card.Img
          variant="top"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src={actorPic !== null ? actorPic : defaultMediaIcon}
        />
      </Card.Link>
      <Card.Body className="text-center" style={{ padding: "1rem" }}>
        <Card.Title
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          {name}
        </Card.Title>
        <Card.Subtitle style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
          {character}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default PersonCard;
