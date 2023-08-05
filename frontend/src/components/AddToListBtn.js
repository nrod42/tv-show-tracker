import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../apiConfig";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { UserContext } from "../contexts/UserContext";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "./AddToListBtn.module.css";
import Button from "react-bootstrap/Button";

const AddToListBtn = ({ id, type }) => {
  const { darkMode } = useContext(DarkModeContext);
  const { userInfo } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const addToList = async (list) => {
    try {
      const response = await fetch(
        `${API_URL}/users/${userInfo.id}/lists/${list}/${type}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to add item to the watch list.  Response status: ${response.status}`
        );
      }

      await response.json();
    } catch (err) {
      console.error("Error adding item to watch list:", err);
    }
  };

  const handleListSelect = (list) => {
    // setSelectedList(list);
    addToList(list);
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <div className={styles.addToListBtnWrapper}>
      {userInfo ? (
        <Dropdown show={isDropdownOpen} onToggle={setIsDropdownOpen}>
          <Dropdown.Toggle
            variant="success"
            id="list-dropdown"
            className={styles.toggleButton}
          >
            +
          </Dropdown.Toggle>
          <Dropdown.Menu className={darkMode ? styles.dropdownMenuDark : styles.dropdownMenuLight}>
            <Dropdown.Item className={styles.dropdownItem} onClick={() => handleListSelect("watching")}>
              Watching
            </Dropdown.Item>
            <Dropdown.Item className={styles.dropdownItem} onClick={() => handleListSelect("completed")}>
              Completed
            </Dropdown.Item>
            <Dropdown.Item className={styles.dropdownItem} onClick={() => handleListSelect("planning")}>
              Planning
            </Dropdown.Item>
            <Dropdown.Item className={styles.dropdownItem} onClick={() => handleListSelect("dropped")}>
              Dropped
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Link to={"/register"}>
          <Button variant="success" className={styles.registerBtn}>
            +
          </Button>
        </Link>
      )}
    </div>
  );
};

export default AddToListBtn;
