import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Collapsible from "react-collapsible"; uninstall
import defaultImg from "../img/defaultImg.webp";

const Card = (props) => {
  const [popupClass, setPopupClass] = useState(false);
  const { Poster, Title, imdbRating, imdbID } = props.showData;
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
  getTvShow(imdbID)
};

  return (
    <div className="card">
      <div className="mainCardContent" onClick={handleShowPage}>
        <Link to={`/shows/id:${imdbID}`}>
          <img
            className="cardImg"
            src={Poster !== null ? Poster : defaultImg}
            alt={`${Title} poster`}
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
        <h3 className="title">{Title}</h3>
        <p className="rating">Rating: {imdbRating}/10</p>
      </div>
    </div>
  );
};

export default Card;
