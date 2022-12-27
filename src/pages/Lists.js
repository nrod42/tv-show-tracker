import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { SetListsContext } from "../App";

const Lists = () => {
  const { watchingList, wantToWatchList, completedList, droppedList } =
    useContext(SetListsContext);

  return (
    <div className="listSection">
      <h1>Lists</h1>

      <div className="list">
        <Link to="/tv-show-tracker/lists/currently-watching">
          <div className="listItem">
            <h2>Currently Watching</h2>
            <div className="listDetails">
              <p>Total: {watchingList.length}</p>
              <p>
                Movies:{" "}
                {watchingList.filter((item) => item.type === "movie").length}
              </p>
              <p>
                Series:{" "}
                {watchingList.filter((item) => item.type === "tv").length}
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="list">
        <Link to="/tv-show-tracker/lists/want-to-watch">
          <div className="listItem">
            <h2>Want To Watch</h2>
            <div className="listDetails">
              <p>Total: {wantToWatchList.length}</p>
              <p>
                Movies:{" "}
                {wantToWatchList.filter((item) => item.type === "movie").length}
              </p>
              <p>
                Series:{" "}
                {wantToWatchList.filter((item) => item.type === "tv").length}
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="list">
        <Link to="/tv-show-tracker/lists/completed">
          <div className="listItem">
            <h2>Completed</h2>
            <div className="listDetails">
              <p>Total: {completedList.length}</p>
              <p>
                Movies:{" "}
                {completedList.filter((item) => item.type === "movie").length}
              </p>
              <p>
                Series:{" "}
                {completedList.filter((item) => item.type === "tv").length}
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="list">
        <Link to="/tv-show-tracker/lists/dropped">
          <div className="listItem">
            <h2>Dropped</h2>
            <div className="listDetails">
              <p>Total: {droppedList.length}</p>
              <p>
                Movies:{" "}
                {droppedList.filter((item) => item.type === "movie").length}
              </p>
              <p>
                Series:{droppedList.filter((item) => item.type === "tv").length}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Lists;
