import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Collapsible from "react-collapsible";
import defaultImg from "../img/defaultImg.webp";

const Card = (props) => {
  const [popupClass, setPopupClass] = useState(false);
  //   const summary = "lorem wdinwfi wnfwifw fwfwf";
  const { image, title, imDbRating, id } = props.showData;
  const {
    setWatchingList,
    setWantToWatchList,
    setCompletedList,
    setDroppedList,
    setShowPageId,
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

  //   const showShowPage = () => {
  //     setShowPageId(id);

  //   }

  return (
    <div className="card">
      {/* <Collapsible */}
      {/* trigger={ */}
      {/* <Link to={`/shows/id:${id}`}> */}
      <div className="mainCardContent" onClick={() => setShowPageId(id)}>
        {/* <Link to={`/shows/id:${id}`} /> */}
        <Link to={`/shows/id:${id}`}>
          <img
            className="cardImg"
            src={image !== null ? image : defaultImg}
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
        <p className="rating">Rating: {imDbRating}/10</p>
      </div>
      {/* </Link> */}
      {/* } */}
      {/* > */}
      {/* <div
          className="summary"
          dangerouslySetInnerHTML={{ __html: summary }}
        ></div> */}
      {/* </Collapsible> */}
    </div>
  );
};

export default Card;
