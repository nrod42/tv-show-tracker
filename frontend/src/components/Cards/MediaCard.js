import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AddToListBtn from "../AddToListBtn";
import RemoveFromListBtn from "../RemoveFromListBtn";
import Card from "react-bootstrap/Card";
import defaultImg from "../../img/defaultImg.webp";
import { DarkModeContext } from "../../DarkModeContext";

const MediaCard = ({ mediaData, setReload }) => {
  const { darkMode } = useContext(DarkModeContext);
  const { id, poster, title, rating, year, type } = mediaData;

  return (
    <Card
      bg={darkMode ? 'dark' : 'light'}
      style={{ minWidth: "185px", width: "185px", border: "none" }}
    >
      <Card.Link
        as={Link}
        to={
          type === "tv"
            ? `/tv-show-tracker/shows/${id}`
            : `/tv-show-tracker/movies/${id}`
        }
      >
        <Card.Img
          variant="top"
          style={{ height: "278px" }}
          src={poster !== null ? poster : defaultImg}
        />
      </Card.Link>
      <AddToListBtn id={id} type={type} />
      <RemoveFromListBtn id={id} type={type} setReload={setReload} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>({year})</Card.Subtitle>
        <Card.Text>Rating: {rating}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MediaCard;
