import React, { useContext } from "react";
import { SetListsContext } from "../App";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const AddToListBtn = (props) => {
  const {
    setWatchingList,
    setWantToWatchList,
    setCompletedList,
    setDroppedList,
  } = useContext(SetListsContext);

  const { data } = props;

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

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
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
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
      <Button
        variant="success"
        style={{
          width: "100%",
          borderTopLeftRadius: "0",
          borderTopRightRadius: "0",
        }}
      >
        Add To Watchlist
      </Button>
    </OverlayTrigger>
  );
};

export default AddToListBtn;
