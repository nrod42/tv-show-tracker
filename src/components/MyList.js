import React from "react";

const MyList = (props) => {
  return (
    <div className={props.isMyListActive ? "myList" : "hiddenPage"}>
      <h1>My List</h1>
      {props.myListCards}
    </div>
  );
};
export default MyList;
