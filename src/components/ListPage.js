import React from "react";

const ListPage = (props) => {
  return (
    <div className={"myList"}>
      <h1>{props.title}</h1>
      <div className="cardGrid">{props.listCards}</div>
    </div>
  );
};
export default ListPage;
