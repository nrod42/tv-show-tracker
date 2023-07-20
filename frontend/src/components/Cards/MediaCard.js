import React from "react";
import { Link } from "react-router-dom";
import AddToListBtn from "../AddToListBtn";
import RemoveFromListBtn from "../RemoveFromListBtn";
import Card from "react-bootstrap/Card";
import defaultImg from "../../img/defaultImg.webp";

const MediaCard = ({ mediaData, setReload }) => {
  const { id, poster, title, rating, year, type } = mediaData;

  return (
    <Card
      bg="light"
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
      <Card.Body style={{ textAlign: "center" }}>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>({year})</Card.Subtitle>
        <Card.Text>Rating: {rating}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MediaCard;
