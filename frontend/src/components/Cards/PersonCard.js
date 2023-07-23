import React, { useState, useEffect, useContext } from "react";
import { getActorPics } from "../API/getMedia";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import defaultImg from "../../img/defaultImg.webp";
import { DarkModeContext } from "../../DarkModeContext";

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
    <Card
      bg={darkMode ? "dark" : "light"}
      style={{
        textAlign: "center",
        minWidth: "185px",
        width: "185px",
        border: "none",
      }}
    >
      <Card.Link as={Link} to={`/tv-show-tracker/people/${id}`}>
        <Card.Img
          variant="top"
          src={actorPic !== null ? actorPic : defaultImg}
        />
      </Card.Link>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>{character}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default PersonCard;
