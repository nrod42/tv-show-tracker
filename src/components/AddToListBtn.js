import React, { useContext, useState } from "react";
import { SetListsContext } from "../App";
import './Styles/addToListBtn.css'

const AddToListBtn = (props) => {
  const {
    setWatchingList,
    setWantToWatchList,
    setCompletedList,
    setDroppedList,
  } = useContext(SetListsContext);

  const [popupClass, setPopupClass] = useState(false);

  const { showData } = props;

  const handleAddToWatching = () => {
    setWatchingList((prevState) =>
      prevState.some((show) => show.id === showData.id)
        ? prevState
        : [...prevState, showData]
    );
  };

  const handleAddToWanted = () => {
    setWantToWatchList((prevState) =>
      prevState.some((show) => show.id === showData.id)
        ? prevState
        : [...prevState, showData]
    );
  };

  const handleAddToCompleted = () => {
    setCompletedList((prevState) =>
      prevState.some((show) => show.id === showData.id)
        ? prevState
        : [...prevState, showData]
    );
  };

  const handleAddToDropped = () => {
    setDroppedList((prevState) =>
      prevState.some((show) => show.id === showData.id)
        ? prevState
        : [...prevState, showData]
    );
  };

  const toggleListPopup = () => {
    setPopupClass((prev) => !prev);
  };

  return (
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
  );
};

export default AddToListBtn;
