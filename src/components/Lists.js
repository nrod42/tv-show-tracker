import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { SetListsContext } from "../App";
import "./Styles/lists.css";

const Lists = () => {
  const { watchingList, wantToWatchList, completedList, droppedList } =
    useContext(SetListsContext);

  return (
    <div className="listSection">
      <h1>Lists</h1>
      <div className="listItem">
        <Link to="/lists/currently-watching">Currently Watching</Link>
        <div className="listDetails">
          <p>Movies: </p>
          <p>Series: {watchingList.length}</p>
        </div>
      </div>
      <div className="listItem">
        <Link to="/lists/want-to-watch">Want To Watch</Link>
        <div className="listDetails">
          <p>Movies:</p>
          <p>Series: {wantToWatchList.length}</p>
        </div>
      </div>
      <div className="listItem">
        <Link to="/lists/completed">Completed</Link>
        <div className="listDetails">
          <p>Movies:</p>
          <p>Series: {completedList.length}</p>
        </div>
      </div>
      <div className="listItem">
        <Link to="/lists/dropped">Dropped</Link>
        <div className="listDetails">
          <p>Movies:</p>
          <p>Series: {droppedList.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Lists;
