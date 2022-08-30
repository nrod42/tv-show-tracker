import React, { useContext } from "react";
import { SetListsContext } from "../App";
import "./Styles/removeFromListBtn.css";

const RemoveFromListBtn = (props) => {
  const {
    setWatchingList,
    setWantToWatchList,
    setCompletedList,
    setDroppedList,
  } = useContext(SetListsContext);

  const { data } = props;

  const handleRemove = () => {
    setWatchingList((prevState) =>
      prevState.filter((media) => media.id !== data.id)
    );
    setWantToWatchList((prevState) =>
      prevState.filter((media) => media.id !== data.id)
    );
    setCompletedList((prevState) =>
      prevState.filter((media) => media.id !== data.id)
    );
    setDroppedList((prevState) =>
      prevState.filter((media) => media.id !== data.id)
    );
  };

  return (
    <div onClick={handleRemove} className={"removeFromListBtn"}>
      -
    </div>
  );
};

export default RemoveFromListBtn;
