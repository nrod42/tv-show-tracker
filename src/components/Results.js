import React from "react";

const Results = (props) => {
  return (
    <div className={"searchResults"}>
      <h1>Results:</h1>
      <div className="cardGrid">{props.resultCards}</div>
    </div>
  );
};
export default Results;
