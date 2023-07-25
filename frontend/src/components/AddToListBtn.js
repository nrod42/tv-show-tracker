import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { API_URL } from "../apiConfig";

const AddToListBtn = ({ id, type }) => {
  const { userInfo } = useContext(UserContext);

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

  const tooltip = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          height: "20px",
          width: "20px",
          background: "#6c757d",
          rotate: "45deg",
          translate: "14.14px",
        }}
      ></div>
      <ButtonGroup vertical>
        <Button variant="secondary" onClick={() => addToList("watching")}>
          Currently Watching
        </Button>
        <Button variant="secondary" onClick={() => addToList("wantToWatch")}>
          Want to Watch
        </Button>
        <Button variant="secondary" onClick={() => addToList("completed")}>
          Completed
        </Button>
        <Button variant="secondary" onClick={() => addToList("dropped")}>
          Dropped
        </Button>
      </ButtonGroup>
    </div>
  );

  return (
    <OverlayTrigger trigger="click" placement="right" overlay={tooltip}>
      <Button
        variant="success"
        style={{
          borderTopLeftRadius: "0",
          borderTopRightRadius: "5px",
          position: "absolute",
          right: "0",
          top: "0",
          // fontSize: "32px",
        }}
      >
        +
      </Button>
    </OverlayTrigger>
  );
};

export default AddToListBtn;
