import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SetListsContext } from "../../App";
import AddToListBtn from "../AddToListBtn";
import RemoveFromListBtn from "../RemoveFromListBtn";
import Card from "react-bootstrap/Card";
import defaultImg from "../../img/defaultImg.webp";

const MediaCard = (props) => {
  const { setMoviePage, setShowPage } = useContext(SetListsContext);
  const { id, poster, title, rating, year } = props.mediaData;

  const handleMediaPage = () => {
    if (props.mediaData.type === "movie") {
      setMoviePage(props.mediaData);
    } else if (props.mediaData.type === "tv") {
      setShowPage(props.mediaData);
    }
  };

  return (
    <Card
      bg="light"
      style={{ minWidth: "185px", width: "185px", border: "none" }}
    >
      <Card.Link
        as={Link}
        to={props.mediaData.type === 'tv' ? 
        `/tv-show-tracker/shows/id:${id}` 
        : `/tv-show-tracker/movies/id:${id}`}
      >
        <Card.Img
          variant="top"
          style={{ height: "278px" }}
          src={poster !== null ? poster : defaultImg}
          onClick={handleMediaPage}
        />
      </Card.Link>
      <AddToListBtn data={props.mediaData} />
      <RemoveFromListBtn data={props.mediaData} />
      <Card.Body style={{ textAlign: "center" }}>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>({year})</Card.Subtitle>
        <Card.Text>Rating: {rating}</Card.Text>
        
      </Card.Body>
    </Card>
  );
};

export default MediaCard;
