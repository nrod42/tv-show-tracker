import React, { useContext, useState } from "react";
import { SetListsContext } from "../App";
import './Styles/removeFromListBtn.css'

const RemoveFromListBtn = (props) => {
  const {
    setWatchingList,
    setWantToWatchList,
    setCompletedList,
    setDroppedList,
  } = useContext(SetListsContext);

  const { showData } = props;

  const handleRemove = () => {
    setWatchingList((prevState) =>
      prevState.filter((show) => show.id !== showData.id)
    );
    setWantToWatchList((prevState) =>
      prevState.filter((show) => show.id !== showData.id)
    );
    setCompletedList((prevState) =>
      prevState.filter((show) => show.id !== showData.id)
    );
    setDroppedList((prevState) =>
      prevState.filter((show) => show.id !== showData.id)
    );
  };

  return (
    <div onClick={handleRemove} className={"removeFromListBtn"}>
      Remove
    </div>
  );
};

export default RemoveFromListBtn;
