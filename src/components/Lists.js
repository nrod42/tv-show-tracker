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


  {/* <div>{wantToWatchPreview}</div> */}

  return (
    <div className="listSection">
      <h1>Lists</h1>

      <div className="list">
        <Link to="/lists/currently-watching">
          <div className="listItem">
            <h2>Currently Watching</h2>
            <div className="listDetails">
              <p>Total: {watchingList.length}</p>
              <p>Movies: {watchingList.filter((item) => (item.type === 'movie')).length}</p>
              <p>Series: {watchingList.filter((item) => (item.type === 'tv')).length}</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="list">
        <Link to="/lists/want-to-watch">
          <div className="listItem">
            <h2>Want To Watch</h2>
            <div className="listDetails">
              <p>Total: {wantToWatchList.length}</p>
              <p>Movies: {wantToWatchList.filter((item) => (item.type === 'movie')).length}</p>
              <p>Series: {wantToWatchList.filter((item) => (item.type === 'tv')).length}</p>
            </div>
          </div>
        </Link>
      </div>
    
      <div className="list">
        <Link to="/lists/completed">
          <div className="listItem">
            <h2>Completed</h2>
            <div className="listDetails">
              <p>Total: {completedList.length}</p>
              <p>Movies: {completedList.filter((item) => (item.type === 'movie')).length}</p>
              <p>Series: {completedList.filter((item) => (item.type === 'tv')).length}</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="list">
        <Link to="/lists/dropped">
          <div className="listItem">
            <h2>Dropped</h2>
            <div className="listDetails">
              <p>Total: {droppedList.length}</p>
              <p>Movies: {droppedList.filter((item) => (item.type === 'movie')).length}</p>
              <p>Series: {droppedList.filter((item) => (item.type === 'tv')).length}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Lists;
