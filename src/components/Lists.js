import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { SetListsContext } from "../App";
import "./Styles/lists.css";

const Lists = () => {
  const { watchingList, wantToWatchList, completedList, droppedList } =
    useContext(SetListsContext);

  // const [watchingPreview, setWatchingPreview] = useState([]);
  // const [wantToWatchPreview, setWantToWatchPreview] = useState([]);
  // const [completedPreview, setCompletedPreview] = useState([]);
  // const [droppedPreview, setDroppedPreview] = useState([]);

  // const handlechange = () => {
  //   if (watchingList.length > 0) {
  //     const newState = [
  //       ...watchingList,
  //       <img
  //         src={watchingList.slice().reverse()[0].poster}
  //         alt={"poster"}
  //       ></img>,
  //     ];
  //     setWatchingPreview(newState);
  //   }
  // };
  // useEffect(() => {
  //   handlechange();
  // if (watchingList.length > 0) {
  //   const newState = [
  //     ...watchingList,
  //     <img
  //       src={watchingList.slice().reverse()[0].poster}
  //       alt={"poster"}
  //     ></img>,
  //   ];
  //   setWatchingPreview(newState);
  // }
  // setWantToWatchPreview((prev) => [
  //   ...prev,
  //   wantToWatchList.length > 0 ? (
  //     <img src={wantToWatchList.reverse()[0].poster} alt={"poster"}></img>
  //   ) : (
  //     ""
  //   ),
  // ]);
  // setCompletedPreview((prev) => [
  //   ...prev,
  //   completedList.length > 0 ? (
  //     <img src={completedList.reverse()[0].poster} alt={"poster"}></img>
  //   ) : (
  //     ""
  //   ),
  // ]);
  // setDroppedPreview((prev) => [
  //   ...prev,
  //   droppedList.length > 0 ? (
  //     <img src={droppedList.reverse()[0].poster} alt={"poster"}></img>
  //   ) : (
  //     ""
  //   ),
  // ]);
  // });

  return (
    <div className="listSection">
      <h1>Lists</h1>
      <div className="listItem">
        <Link to="/lists/currently-watching">Currently Watching</Link>
        <div>
          <div className="listDetails">
            {/* <p>Movies: </p> */}
            <p>Series: {watchingList.length}</p>
          </div>
          {/* <div>{watchingPreview}</div> */}
        </div>
      </div>
      <div className="listItem">
        <Link to="/lists/want-to-watch">Want To Watch</Link>
        <div>
          <div className="listDetails">
            {/* <p>Movies:</p> */}
            <p>Series: {wantToWatchList.length}</p>
          </div>
          {/* <div>{wantToWatchPreview}</div> */}
        </div>
      </div>
      <div className="listItem">
        <Link to="/lists/completed">Completed</Link>
        <div className="listDetails">
          {/* <p>Movies:</p> */}
          <p>Series: {completedList.length}</p>
        </div>
        {/* <div>{completedPreview}</div> */}
      </div>
      <div className="listItem">
        <Link to="/lists/dropped">Dropped</Link>
        <div>
          <div className="listDetails">
            {/* <p>Movies:</p> */}
            <p>Series: {droppedList.length}</p>
          </div>
          {/* <div>{droppedPreview}</div> */}
        </div>
      </div>
    </div>
  );
};

export default Lists;
