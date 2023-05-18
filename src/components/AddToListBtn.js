import React, { useContext } from "react";
import { SetListsContext } from "../App";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const AddToListBtn = ({data}) => {
  const {
    setWatchingList,
    setWantToWatchList,
    setCompletedList,
    setDroppedList,
  } = useContext(SetListsContext);

  

  const handleAddToWatching = () => {
    setWatchingList((prevState) =>
      prevState.some((media) => media.id === data.id)
        ? prevState
        : [...prevState, data]
    );
  };

  const handleAddToWanted = () => {
    setWantToWatchList((prevState) =>
      prevState.some((media) => media.id === data.id)
        ? prevState
        : [...prevState, data]
    );
  };

  const handleAddToCompleted = () => {
    setCompletedList((prevState) =>
      prevState.some((media) => media.id === data.id)
        ? prevState
        : [...prevState, data]
    );
  };

  const handleAddToDropped = () => {
    setDroppedList((prevState) =>
      prevState.some((media) => media.id === data.id)
        ? prevState
        : [...prevState, data]
    );
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
        <Button variant="secondary" onClick={handleAddToWatching}>
          Currently Watching
        </Button>
        <Button variant="secondary" onClick={handleAddToWanted}>
          Want to Watch
        </Button>
        <Button variant="secondary" onClick={handleAddToCompleted}>
          Completed
        </Button>
        <Button variant="secondary" onClick={handleAddToDropped}>
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
          borderTopRightRadius: "0",
        }}
      >
        Add To Watch List
      </Button>
    </OverlayTrigger>
  );
};

export default AddToListBtn;
