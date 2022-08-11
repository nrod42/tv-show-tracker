import React from "react";

const Home = (props) => {
  return (
    <div className={props.isHomeActive ? "home" : "hiddenPage"}>
      <h1>Top Shows</h1>
      {props.homeCards}
    </div>
  );
};
export default Home;
