import React from "react";

const MyList = (props) => {
  return (
    <div className={props.isMyListActive ? "myList" : "hidden"}>
      <h1>My List</h1>
      <div className="cardGrid">{props.myListCards}</div>
    </div>
  );
};
export default MyList;
