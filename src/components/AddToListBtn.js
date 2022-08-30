import React, { useContext, useState } from "react";
import { SetListsContext } from "../App";
import "./Styles/addToListBtn.css";

const AddToListBtn = (props) => {
  const {
    setWatchingList,
    setWantToWatchList,
    setCompletedList,
    setDroppedList,
  } = useContext(SetListsContext);

  const [popupClass, setPopupClass] = useState(false);

  const { data } = props;

  const handleAddToWatching = () => {
    setWatchingList((prevState) =>
      prevState.some((media) => media.id === data.id)
        ? prevState
        : [...prevState, data]
    );
  };

  const handleAddToWanted = () => {
    setWantToWatchList((prevState) =>
      prevState.some((media) => media.id === data.id)
        ? prevState
        : [...prevState, data]
    );
  };

  const handleAddToCompleted = () => {
    setCompletedList((prevState) =>
      prevState.some((media) => media.id === data.id)
        ? prevState
        : [...prevState, data]
    );
  };

  const handleAddToDropped = () => {
    setDroppedList((prevState) =>
      prevState.some((media) => media.id === data.id)
        ? prevState
        : [...prevState, data]
    );
  };

  const toggleListPopup = () => {
    setPopupClass((prev) => !prev);
  };

  return (
    <div onClick={toggleListPopup} className={"addToListBtn"}>
      +
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
  );
};

export default AddToListBtn;
