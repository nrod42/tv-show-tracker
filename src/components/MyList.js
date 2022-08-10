import React from "react";

const MyList = (props) => {
  return (
    <div className={props.isMyListActive ? "myList" : "hiddenPage"}>
      {props.myListCards}
    </div>
  );
};
export default MyList;
