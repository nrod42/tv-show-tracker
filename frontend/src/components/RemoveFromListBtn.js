import React, { useContext } from "react";
import { API_URL } from "../apiConfig";
import { UserContext } from "../contexts/UserContext";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";

const RemoveFromListBtn = ({ id, type, setReload }) => {
  const { listType } = useParams();
  const { userInfo } = useContext(UserContext);

  const removeFromList = async () => {
    try {
      const response = await fetch(
        `${API_URL}/users/${userInfo.id}/lists/${listType}/${type}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      // Forces re render to show updated list
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
      style={{ display: listType ? "block" : "none" }}
    >
      <Button variant="danger" style={{ width: "100%" }}>
        Remove
      </Button>
    </div>
  );
};

export default RemoveFromListBtn;
