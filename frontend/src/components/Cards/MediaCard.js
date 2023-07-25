import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AddToListBtn from "../AddToListBtn";
import RemoveFromListBtn from "../RemoveFromListBtn";
import Card from "react-bootstrap/Card";
import { DarkModeContext } from "../../DarkModeContext";
import defaultMediaIcon from '../../img/default_media_icon.svg';

const MediaCard = ({ mediaData, setReload }) => {
  const { darkMode } = useContext(DarkModeContext);
  const { id, poster, title, rating, year, type } = mediaData;

  return (
    <Card bg={darkMode ? "dark" : "light"} style={{ border: "none" }}>
      <Card.Link
        as={Link}
        to={type === "tv" ? `/tv-show-tracker/shows/${id}` : `/tv-show-tracker/movies/${id}`}
      >
        <Card.Img
          variant="top"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          src={poster !== null ? poster : defaultMediaIcon}
        />
      </Card.Link>
      <AddToListBtn id={id} type={type} />
      <RemoveFromListBtn id={id} type={type} setReload={setReload} />
      <Card.Body className="text-center" style={{ padding: '1rem' }}>
        <Card.Title style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          {title}
        </Card.Title>
        <Card.Subtitle style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
          ({year})
        </Card.Subtitle>
        <Card.Text style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
          Rating: {rating}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MediaCard;
