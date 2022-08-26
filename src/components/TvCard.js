import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SetListsContext } from "../App";
import defaultImg from "../img/defaultImg.webp";
import AddToListBtn from "./AddToListBtn";
import RemoveFromListBtn from "./RemoveFromListBtn";
import "./Styles/card.css";

const TvCard = (props) => {
  const { setShowPage } = useContext(SetListsContext);
  const { id, poster, title, rating, year } = props.showData;

  const handleShowPage = () => {
    setShowPage(props.showData);
  };

  return (
    <div className="card" onClick={handleShowPage}>
      <div className="posterWrapper">
        <Link to={`/shows/id:${id}`}>
          <img
            className="cardImg"
            src={poster !== null ? poster : defaultImg}
            alt={`${title} poster`}
          ></img>
        </Link>
        <AddToListBtn showData={props.showData} />
        <RemoveFromListBtn showData={props.showData} />
      </div>
      <h3 className="cardTitle">{title}</h3>
      <p>({year})</p>
      <p className="rating">Rating: {rating}/10</p>
    </div>
  );
};

export default TvCard;
