import React, { useContext } from "react";
import { SetListsContext } from "../App";
import { Button } from "react-bootstrap";


const RemoveFromListBtn = (props) => {
  const {
    setWatchingList,
    setWantToWatchList,
    setCompletedList,
    setDroppedList,
  } = useContext(SetListsContext);

  const page = window.location.pathname.split(":")[0].split('/');

  const { data } = props;

  const handleRemove = () => {
    page.includes('currently-watching') ?
    setWatchingList((prevState) =>
      prevState.filter((media) => media.id !== data.id)
    ) :
    page.includes('want-to-watch') ?
    setWantToWatchList((prevState) =>
      prevState.filter((media) => media.id !== data.id)
    ) :
    page.includes('completed') ?
    setCompletedList((prevState) =>
      prevState.filter((media) => media.id !== data.id)
    ) :
    page.includes('dropped')
    setDroppedList((prevState) =>
      prevState.filter((media) => media.id !== data.id)
    );
  };

  return (
    <div onClick={handleRemove} className={"removeFromListBtn"} style={{display: page.includes('lists') ? 'block' : 'none'}}>
      <Button variant="danger" style={{width: '100%'}}>Remove From list</Button>
    </div>
  );
};

export default RemoveFromListBtn;
