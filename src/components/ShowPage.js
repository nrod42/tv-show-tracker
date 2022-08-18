// import React, { useState } from "react";

const ShowPage = (props) => {
  const { Title, imdbRating, Poster, Plot, Actors, year } = props.showInfo;
  console.log(props.showInfo)

  return (
    <div className="showPage">
      <div className="topHalf">{/* <img></img> */}</div>
      <div className="showPagePoster"><img src = {Poster}/></div>
      <h2>{Title}</h2>
      <p>{year}</p>
      <p>{imdbRating}</p>
      <p>{Actors}</p>
      <p>{Plot}</p>
    </div>
  );
};

export default ShowPage;
