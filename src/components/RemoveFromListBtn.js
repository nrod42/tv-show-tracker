const RemoveFromListBtn = (props) => {
  const {
    setWatchingList,
    setWantToWatchList,
    setCompletedList,
    setDroppedList,
    showData,
  } = props;

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
