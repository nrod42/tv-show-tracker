import React, { useState } from "react";
import Collapsible from "react-collapsible";
import defaultImg from "../img/defaultImg.webp";

const Card = (props) => {
  const [popupClass, setPopupClass] = useState(false);

  const { image, name, rating, summary } = props.showData;
  const {
    setWatchingList,
    setWantToWatchList,
    setCompletedList,
    setDroppedList,
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

  return (
    <div className="card">
      {/* <div className="listBtns"> */}
      {/* <div onClick={toggleListPopup} className={"addToListBtn"}>
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
      </div> */}
      {/* <button className={"removeFromListBtn"}>Remove</button> */}
      {/* </div> */}

      <Collapsible
        trigger={
          <div className="mainCardContent">
            <img
              className="cardImg"
              src={image !== null ? image.medium : defaultImg}
              alt={`${name} poster`}
            ></img>
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
            <h3 className="title">{name}</h3>
            <p className="rating">Rating: {rating.average}/10</p>
          </div>
        }
      >
        <div
          className="summary"
          dangerouslySetInnerHTML={{ __html: summary }}
        ></div>
      </Collapsible>
    </div>
  );
};

export default Card;
