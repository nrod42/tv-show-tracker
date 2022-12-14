import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SetListsContext } from "../../App";
import AddToListBtn from "../AddToListBtn";
import RemoveFromListBtn from "../RemoveFromListBtn";
import Card from "react-bootstrap/Card";
import defaultImg from "../../img/defaultImg.webp";

const MovieCard = (props) => {
  const { setMoviePage } = useContext(SetListsContext);
  const { id, poster, title, rating, year } = props.movieData;

  const handleMoviePage = () => {
    setMoviePage(props.movieData);
  };

  return (
    <Card
      bg="light"
      style={{ minWidth: "185px", width: "185px", border: "none" }}
    >
      <Card.Link as={Link} to={`/tv-show-tracker/movies/id:${id}`}>
        <Card.Img
          variant="top"
          style={{ height: "278px" }}
          src={poster !== null ? poster : defaultImg}
          onClick={handleMoviePage}
        />
      </Card.Link>
      <AddToListBtn data={props.movieData} />
      <Card.Body style={{ textAlign: "center" }}>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>({year})</Card.Subtitle>
        <Card.Text>Rating: {rating}</Card.Text>
        <RemoveFromListBtn data={props.movieData} />
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
