import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { SetListsContext } from "../../App";
import defaultImg from "../../img/defaultImg.webp";
import AddToListBtn from "../AddToListBtn";
import RemoveFromListBtn from "../RemoveFromListBtn";

const TvCard = (props) => {
  const { setShowPage } = useContext(SetListsContext);
  const { id, poster, title, rating, year } = props.showData;

  const handleShowPage = () => {
    setShowPage(props.showData);
  };

  return (
    <Card
      bg="light"
      onClick={handleShowPage}
      style={{ minWidth: "185px", width: "185px", border: "none" }}
    >
      <Card.Link as={Link} to={`/tv-show-tracker/shows/id:${id}`}>
        <Card.Img
          variant="top"
          style={{ height: "278px" }}
          src={poster !== null ? poster : defaultImg}
        />
      </Card.Link>
      <AddToListBtn data={props.showData} />
      <RemoveFromListBtn data={props.showData} />
      <Card.Body style={{ textAlign: "center" }}>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>({year})</Card.Subtitle>
        <Card.Text>Rating: {rating}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TvCard;
