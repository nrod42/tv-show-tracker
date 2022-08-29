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
    <Link to={`/shows/id:${id}`}>
    <div className="card" onClick={handleShowPage}>
      <div className="posterWrapper">
        {/* <Link to={`/shows/id:${id}`}> */}
          <img
            className="cardImg"
            src={poster !== null ? poster : defaultImg}
            alt={`${title} poster`}
          ></img>
        {/* </Link> */}
        <AddToListBtn data={props.showData} />
        <RemoveFromListBtn data={props.showData} />
      </div>
      <p className="cardTitle">{title}</p>
      <p>({year})</p>
      <p className="rating">Rating: {rating}/10</p>
    </div>
    </Link>
  );
};

export default TvCard;
