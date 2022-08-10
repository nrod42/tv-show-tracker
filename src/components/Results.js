import React from "react";

const Results = (props) => {
  return (
    <div className={props.isResultsActive ? "searchResults" : "hiddenPage"}>
      {props.resultCards}
    </div>
  );
};
export default Results;
