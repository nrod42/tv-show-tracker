import React, { useContext } from "react";
import { API_URL } from "../apiConfig";
import { UserContext } from "../UserContext";
import Button from "react-bootstrap/Button";

const RemoveFromListBtn = ({ id, type, setReload }) => {
  const page = window.location.pathname.split("/");
  const list = page[3];

  const listMappings = {
    "currently-watching": "watching",
    "want-to-watch": "wantToWatch",
  };

  const listToSend = listMappings[list] || list;

  const { userInfo } = useContext(UserContext);

  const removeFromList = async () => {
    try {
      const response = await fetch(
        `${API_URL}/users/${userInfo.id}/lists/${listToSend}/${type}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      setReload((prevState) => !prevState);
      if (!response.ok) {
        throw new Error(
          `Failed to delete item from the watch list.  Response status: ${response.status}`
        );
      }
    } catch (err) {
      console.error("Error deleting item from watch list:", err);
    }
  };

  return (
    <div
      onClick={removeFromList}
      className={"removeFromListBtn"}
      style={{ display: page.includes("lists") ? "block" : "none" }}
    >
      <Button variant="danger" style={{ width: "100%" }}>
        Remove
      </Button>
    </div>
  );
};

export default RemoveFromListBtn;
