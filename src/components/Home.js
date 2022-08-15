import React from "react";

const Home = (props) => {
  return (
    <div className={"home"}>
      <h1>Top Shows</h1>
      <div className="cardGrid">{props.homeCards}</div>
    </div>
  );
};
export default Home;
