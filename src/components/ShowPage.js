import React, { useState } from "react";

const ShowPage = (props) => {
  const { title, ratings, image, plot, cast, year } = props;

  return (
    <div className="showPage">
      <div className="topHalf">{/* <img></img> */}</div>
      <div className="showPagePoster">{image}</div>
      <h2>{title}</h2>
      <p>{year}</p>
      <p>{ratings}</p>
      <p>{cast}</p>
      <p>{plot}</p>
    </div>
  );
};

export default ShowPage;
