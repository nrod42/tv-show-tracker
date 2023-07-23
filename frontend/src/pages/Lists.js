import React, { useState, useContext, useEffect } from "react";
import WatchList from "../components/WatchList";
import { UserContext } from "../UserContext";
import { API_URL } from "../apiConfig";
import { DarkModeContext } from "../DarkModeContext";
import styles from "./Lists.module.css";

/**
 * Lists component displays the user's watch lists.
 * It fetches the user's data from the API and renders the watch lists using the WatchList component.
 */
const Lists = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { userInfo } = useContext(UserContext);

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch the user's watch lists from the API
    const fetchLists = async () => {
      try {
        const response = await fetch(`${API_URL}/lists/${userInfo.id}`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.log("Problem getting user info");
        }
      } catch (error) {
        console.error("Error fetching user lists:", error);
      }
    };

    fetchLists();
  }, [userInfo]);

  return (
    <div
      className={darkMode ? styles.listSectionDark : styles.listSectionLight}
    >
      <h2>Lists</h2>

      {/* Render the Currently Watching watch list */}
      <WatchList
        title="Currently Watching"
        link="/tv-show-tracker/lists/currently-watching"
        userData={userData?.watching}
      />

      {/* Render the Want To Watch watch list */}
      <WatchList
        title="Want To Watch"
        link="/tv-show-tracker/lists/want-to-watch"
        userData={userData?.wantToWatch}
      />

      {/* Render the Completed watch list */}
      <WatchList
        title="Completed"
        link="/tv-show-tracker/lists/completed"
        userData={userData?.completed}
      />

      {/* Render the Dropped watch list */}
      <WatchList
        title="Dropped"
        link="/tv-show-tracker/lists/dropped"
        userData={userData?.dropped}
      />
    </div>
  );
};

export default Lists;
