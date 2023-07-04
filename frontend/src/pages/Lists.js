import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { API_URL } from "../apiConfig";

const Lists = () => {
  const { userInfo } = useContext(UserContext);

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    //get the lists from mongodb
    const fetchLists = async () => {
      try {
        const response = await fetch(`${API_URL}/lists/${userInfo.id}`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.log('problem getting user info')
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
      <div className="list">
        <Link to="/tv-show-tracker/lists/currently-watching">
          <div className="listItem">
            <h2>Currently Watching</h2>
            <div className="listDetails">
            <p>Total: {userData?.watching?.movies.length + userData?.watching?.tvShows.length}</p>
              <p>
                Movies:{" "}
                {userData?.watching?.movies.length}
              </p>
              <p>
                Series:{" "}
                {userData?.watching?.tvShows.length}
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
              <p>Total: {userData?.wantToWatch?.movies.length + userData?.wantToWatch?.tvShows.length}</p>
              <p>
                Movies:{" "}
                {userData?.wantToWatch?.movies.length}
              </p>
              <p>
                Series:{" "}
                {userData?.wantToWatch?.tvShows.length}
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
              <p>Total: {userData?.completed?.movies.length + userData?.completed?.tvShows.length}</p>
              <p>
                Movies:{" "}
                {userData?.completed?.movies.length}
              </p>
              <p>
                Series:{" "}
                {userData?.completed?.tvShows.length}
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
            <p>Total: {userData?.dropped?.movies.length + userData?.dropped?.tvShows.length}</p>
              <p>
                Movies:{" "}
                {userData?.dropped?.movies.length}
              </p>
              <p>
                Series:{" "}
                {userData?.dropped?.tvShows.length}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Lists;
