import React from "react";

const Results = (props) => {
  return (
    <div className={props.isResultsActive ? "searchResults" : "hiddenPage"}>
      <h1>Results:</h1>
      {props.resultCards}
    </div>
  );
};
export default Results;
