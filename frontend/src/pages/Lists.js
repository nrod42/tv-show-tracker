import React, { useState, useContext, useEffect } from "react";
import { API_URL } from "../apiConfig";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { UserContext } from "../contexts/UserContext";
import WatchList from "../components/WatchList";
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
          console.error("Problem getting user info");
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
        title="Watching"
        link="/lists/watching"
        userData={userData?.watching}
      />

      {/* Render the Completed watch list */}
      <WatchList
        title="Completed"
        link="/lists/completed"
        userData={userData?.completed}
      />

      {/* Render the Want To Watch watch list */}
      <WatchList
        title="Planning"
        link="/lists/planning"
        userData={userData?.planning}
      />

      {/* Render the Dropped watch list */}
      <WatchList
        title="Dropped"
        link="/lists/dropped"
        userData={userData?.dropped}
      />
    </div>
  );
};

export default Lists;
