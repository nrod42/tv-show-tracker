import React, { useState, useContext, useEffect } from "react";
import { API_URL } from "../apiConfig";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { UserContext } from "../contexts/UserContext";
import WatchListTab from "../components/WatchListTab";
import styles from "./WatchListTabsPage.module.css";

const WatchListTabsPage = () => {
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
  }, [userInfo.id]);

  return (
    <div
      className={darkMode ? styles.listSectionDark : styles.listSectionLight}
    >
      <h2>Lists</h2>

      {/* Render the Currently Watching watch list */}
      <WatchListTab
        title="Watching"
        link="/lists/watching"
        userData={userData?.watching}
      />

      {/* Render the Completed watch list */}
      <WatchListTab
        title="Completed"
        link="/lists/completed"
        userData={userData?.completed}
      />

      {/* Render the Want To Watch watch list */}
      <WatchListTab
        title="Planning"
        link="/lists/planning"
        userData={userData?.planning}
      />

      {/* Render the Dropped watch list */}
      <WatchListTab
        title="Dropped"
        link="/lists/dropped"
        userData={userData?.dropped}
      />
    </div>
  );
};

export default WatchListTabsPage;
