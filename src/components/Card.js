import React, { useState } from "react";
import { Link } from "react-router-dom";
import defaultImg from "../img/defaultImg.webp";

const Card = (props) => {
  const [popupClass, setPopupClass] = useState(false);
  const { id, poster, title, rating, year } = props.showData;
  const {
    setWatchingList,
    setWantToWatchList,
    setCompletedList,
    setDroppedList,
    getTvShow,

  } = props;

  const handleAddToWatching = () => {
    setWatchingList((prevState) => [...prevState, props.showData]);
  };

  const handleAddToWanted = () => {
    setWantToWatchList((prevState) => [...prevState, props.showData]);
  };

  const handleAddToCompleted = () => {
    setCompletedList((prevState) => [...prevState, props.showData]);
  };

  const handleAddToDropped = () => {
    setDroppedList((prevState) => [...prevState, props.showData]);
  };

  const toggleListPopup = () => {
    setPopupClass((prevState) => !prevState);
  };

  const handleShowPage = () => {
    getTvShow(id)
  };

  return (
    <div className="card">
      <div className="mainCardContent" onClick={handleShowPage}>
        <Link to={`/shows/id:${id}`}>
          <img
            className="cardImg"
            src={poster !== null ? poster : defaultImg}
            alt={`${title} poster`}
          ></img>
        </Link>
        <div onClick={toggleListPopup} className={"addToListBtn"}>
          Add
          <ul className={popupClass ? "listPopup show" : "listPopup"}>
            <li>
              <button onClick={handleAddToWatching}>Currently Watching</button>
            </li>
            <li>
              <button onClick={handleAddToWanted}>Want to Watch</button>
            </li>
            <li>
              <button onClick={handleAddToCompleted}>Completed</button>
            </li>
            <li>
              <button onClick={handleAddToDropped}>Dropped</button>
            </li>
          </ul>
        </div>
        <h3 className="title">{title}</h3>
        <p>({year})</p>
        <p className="rating">Rating: {rating}/10</p>
      </div>
    </div>
  );
};

export default Card;
