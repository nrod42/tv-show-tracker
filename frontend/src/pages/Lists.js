import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { SetListsContext } from "../App";
import { UserContext } from "../UserContext";
import { API_URL } from "../apiConfig";

const Lists = () => {
  const { watchingList, wantToWatchList, completedList, droppedList } =
    useContext(SetListsContext);

  const { userInfo } = useContext(UserContext);

  const [userData, setUserData] = useState("");

  useEffect(() => {
    //get the lists from mongodb
    const fetchLists = async () => {
      try {
        // const response = await fetch(`/lists/${userInfo.id}`);
        const response = await fetch(`${API_URL}/lists/${userInfo.id}`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          // Handle error response
        }
      } catch (error) {
        // Handle any network or other errors
      }
    };

    fetchLists();
  }, [userInfo]);

  return (
    <div className="listSection">
      <h1>Lists</h1>
      {/* <button onClick={() => console.log(userData)}>Test</button> */}
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
              <p>Total: {userData.completed?.length}</p>
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
