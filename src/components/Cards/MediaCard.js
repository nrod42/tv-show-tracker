import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { SetListsContext } from "../../App";
import AddToListBtn from "../AddToListBtn";
import RemoveFromListBtn from "../RemoveFromListBtn";
import Card from "react-bootstrap/Card";
import defaultImg from "../../img/defaultImg.webp";

const MediaCard = ({mediaData}) => {
  const { setMoviePage, setShowPage } = useContext(SetListsContext);
  const { id, poster, title, rating, year, type } = mediaData;

  const handleMediaPage = () => {
    if (type === "movie") {
      setMoviePage(mediaData);
    } else if (type === "tv") {
      setShowPage(mediaData);
    }
  };

  // useEffect(() => {
  //   console.log(id)
  // })

  return (
    <Card
      bg="light"
      style={{ minWidth: "185px", width: "185px", border: "none" }}
    >
      <Card.Link
        as={Link}
        to={type === 'tv' ? 
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
      <AddToListBtn data={mediaData} />
      <RemoveFromListBtn data={mediaData} />
      <Card.Body style={{ textAlign: "center" }}>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>({year})</Card.Subtitle>
        <Card.Text>Rating: {rating}</Card.Text>
        
      </Card.Body>
    </Card>
  );
};

export default MediaCard;
